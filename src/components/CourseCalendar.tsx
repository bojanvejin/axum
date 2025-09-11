"use client";

import React, { useState, useEffect } from 'react';
import { format, addDays, isSameDay, parseISO } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { CurriculumModule } from '@/data/curriculum';
import { showError } from '@/utils/toast';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

interface CourseCalendarProps {
  startDate: Date; // The actual start date of the course (e.g., the first class Monday)
}

const CourseCalendar: React.FC<CourseCalendarProps> = ({ startDate }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [modulesForSelectedDate, setModulesForSelectedDate] = useState<CurriculumModule[]>([]);
  const [classDaysMap, setClassDaysMap] = useState<Map<string, CurriculumModule[]>>(new Map()); // Map date string to modules
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndGenerateCourseDates = async () => {
      setLoading(true);
      try {
        const { data: modulesData, error } = await supabase
          .from('modules')
          .select('id, phase_id, title, description, course_week') // Select course_week
          .order('order_index', { ascending: true });

        if (error) throw error;

        const daysMap = new Map<string, CurriculumModule[]>();
        
        modulesData?.forEach(module => {
          if (module.course_week !== undefined && module.course_week !== null) {
            // Calculate the class day: every other Monday, starting from startDate
            // Week 1 module is on startDate (Monday)
            // Week 2 module is on startDate + 7 days (next Monday)
            // Week 3 module is on startDate + 14 days (Monday after next)
            // ... and so on.
            // The user mentioned "every other monday", but the courseOutline has 6 weeks.
            // Let's assume "every other Monday" means the *start* of each course week is a Monday.
            // If the course is taught every other Monday, then week 1 is Monday, week 2 is 2 weeks after, etc.
            // Given the courseOutline has 6 consecutive weeks, I'll assume each week's module starts on a Monday.
            // If the actual class schedule is "every other Monday" for the *entire course*,
            // then the `course_week` would need to map to a different `addDays` calculation.
            // For now, I'll map `course_week` 1 to `startDate`, `course_week` 2 to `startDate + 7 days`, etc.
            const classDay = addDays(startDate, (module.course_week - 1) * 7);
            const dateString = format(classDay, 'yyyy-MM-dd');
            if (!daysMap.has(dateString)) {
              daysMap.set(dateString, []);
            }
            daysMap.get(dateString)?.push(module);
          }
        });
        setClassDaysMap(daysMap);

        // If a date was already selected, update its modules
        if (selectedDate) {
          const dateString = format(selectedDate, 'yyyy-MM-dd');
          setModulesForSelectedDate(daysMap.get(dateString) || []);
        }

      } catch (err: any) {
        showError(`Failed to load course modules: ${err.message}`);
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
      setModulesForSelectedDate(classDaysMap.get(dateString) || []);
    } else {
      setModulesForSelectedDate([]);
    }
  };

  const modifiers = {
    classDays: (date: Date) => {
      const dateString = format(date, 'yyyy-MM-dd');
      return classDaysMap.has(dateString);
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