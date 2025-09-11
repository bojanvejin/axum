"use client";

import React, { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { CurriculumModule, CurriculumPhase } from '@/data/curriculum';
import { showError } from '@/utils/toast';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

// Extend CurriculumModule to include phase title for display
interface ModuleWithPhaseTitle extends CurriculumModule {
  phases: Pick<CurriculumPhase, 'title'>;
}

interface CourseCalendarProps {
  startDate: Date; // The actual start date of the course (e.g., the first class Monday)
}

const CourseCalendar: React.FC<CourseCalendarProps> = ({ startDate }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [modulesForSelectedDate, setModulesForSelectedDate] = useState<ModuleWithPhaseTitle[]>([]);
  // Map to store unique module IDs for each class day (for highlighting)
  const [classDaysModuleIdsMap, setClassDaysModuleIdsMap] = useState<Map<string, Set<string>>>(new Map());
  // Map to store actual module data for each class day (for display)
  const [classDaysModulesDataMap, setClassDaysModulesDataMap] = useState<Map<string, ModuleWithPhaseTitle[]>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndGenerateCourseDates = async () => {
      setLoading(true);
      try {
        // Fetch all modules along with their phase details
        const { data: modulesData, error } = await supabase
          .from('modules')
          .select('*, phases(title)') // Select module details including phase title
          .order('course_week', { ascending: true }); // Order by course_week

        if (error) throw error;

        const newClassDaysModuleIdsMap = new Map<string, Set<string>>();
        const newClassDaysModulesDataMap = new Map<string, ModuleWithPhaseTitle[]>();

        modulesData?.forEach(module => {
          if (module.course_week !== undefined && module.course_week !== null) {
            // Calculate the actual calendar date for this module (always a Monday for its course_week)
            // If startDate is the first Monday of Week 1, then Week N's module is (N-1)*7 days after startDate.
            const daysToAdd = (module.course_week - 1) * 7;
            const classDay = addDays(startDate, daysToAdd);
            const dateString = format(classDay, 'yyyy-MM-dd');

            // For highlighting
            if (!newClassDaysModuleIdsMap.has(dateString)) {
              newClassDaysModuleIdsMap.set(dateString, new Set());
            }
            newClassDaysModuleIdsMap.get(dateString)?.add(module.id);

            // For displaying module details
            if (!newClassDaysModulesDataMap.has(dateString)) {
              newClassDaysModulesDataMap.set(dateString, []);
            }
            const modulesForThisDay = newClassDaysModulesDataMap.get(dateString);
            // Add module only if it's not already added for this day
            if (modulesForThisDay && !modulesForThisDay.some(m => m.id === module.id)) {
              modulesForThisDay.push(module as ModuleWithPhaseTitle); // Cast to extended type
            }
          }
        });

        // Sort modules within each day by order_index (though for this setup, each day should only have one module)
        newClassDaysModulesDataMap.forEach(modules => {
          modules.sort((a, b) => a.order_index - b.order_index);
        });

        setClassDaysModuleIdsMap(newClassDaysModuleIdsMap);
        setClassDaysModulesDataMap(newClassDaysModulesDataMap);

        // If a date was already selected, update its modules based on the new data
        if (selectedDate) {
          const dateString = format(selectedDate, 'yyyy-MM-dd');
          setModulesForSelectedDate(newClassDaysModulesDataMap.get(dateString) || []);
        }

      } catch (err: any) {
        showError(`Failed to load course schedule: ${err.message}`);
        console.error('Error fetching modules for calendar:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndGenerateCourseDates();
  }, [startDate, selectedDate]); // Re-run if startDate or selectedDate changes

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const dateString = format(date, 'yyyy-MM-dd');
      setModulesForSelectedDate(classDaysModulesDataMap.get(dateString) || []);
    } else {
      setModulesForSelectedDate([]);
    }
  };

  const modifiers = {
    classDays: (date: Date) => {
      const dateString = format(date, 'yyyy-MM-dd');
      return classDaysModuleIdsMap.has(dateString);
    },
  };

  const modifiersStyles = {
    classDays: {
      backgroundColor: 'hsl(var(--primary))',
      color: 'hsl(var(--primary-foreground))',
      borderRadius: '0.375rem', // rounded-md
    },
  };

  if (loading) {
    return (
      <div className="flex flex-col lg:flex-row gap-8 p-4 w-full max-w-6xl mx-auto">
        <Skeleton className="flex-shrink-0 lg:w-1/2 h-[400px]" />
        <Skeleton className="flex-grow lg:w-1/2 h-[400px]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-4 w-full max-w-6xl mx-auto">
      <Card className="flex-shrink-0 lg:w-1/2">
        <CardHeader>
          <CardTitle>Course Schedule</CardTitle>
          <CardDescription>Click on a highlighted day to see the modules.</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            initialFocus
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            className="rounded-md border shadow w-full"
          />
        </CardContent>
      </Card>

      <Card className="flex-grow lg:w-1/2">
        <CardHeader>
          <CardTitle>
            {selectedDate ? `Modules for ${format(selectedDate, 'PPP')}` : 'Select a Date'}
          </CardTitle>
          <CardDescription>
            {selectedDate && modulesForSelectedDate.length === 0 && 'No modules scheduled for this day.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] pr-4">
            {modulesForSelectedDate.length > 0 ? (
              <div className="space-y-4">
                {modulesForSelectedDate.map((module, index) => (
                  <Link to={`/phases/${module.phase_id}/modules/${module.id}`} key={module.id} className="block">
                        <div className="border-b pb-4 last:border-b-0 last:pb-0 hover:bg-accent p-2 rounded-md transition-colors">
                          <h3 className="text-lg font-semibold">{module.title}</h3>
                          <p className="text-muted-foreground text-sm">{module.description}</p>
                          {module.course_week && <p className="text-xs text-muted-foreground mt-1">Course Week {module.course_week}</p>}
                        </div>
                      </Link>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Please select a date on the calendar to view its schedule.</p>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseCalendar;