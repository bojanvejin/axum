"use client";

import React, { useState, useEffect } from 'react';
import { format, addDays, isSameDay } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { showError } from '@/utils/toast';
import { Link } from 'react-router-dom';
import { CurriculumPhase, CurriculumModule } from '@/data/curriculum';
import { Skeleton } from '@/components/ui/skeleton'; // Added import for Skeleton

interface CourseCalendarProps {
  startDate: Date; // The actual start date of the course (e.g., the first class Monday)
}

const CourseCalendar: React.FC<CourseCalendarProps> = ({ startDate }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [modulesForSelectedDate, setModulesForSelectedDate] = useState<CurriculumModule[]>([]);
  const [courseScheduleMap, setCourseScheduleMap] = useState<Map<string, CurriculumModule[]>>(new Map()); // Map date string to modules
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurriculumAndGenerateSchedule = async () => {
      setLoading(true);
      try {
        const { data: phasesData, error: phasesError } = await supabase
          .from('phases')
          .select('*')
          .order('order_index', { ascending: true });
        if (phasesError) throw phasesError;

        const { data: modulesData, error: modulesError } = await supabase
          .from('modules')
          .select('*')
          .order('order_index', { ascending: true });
        if (modulesError) throw modulesError;

        const phases: CurriculumPhase[] = phasesData || [];
        const modules: CurriculumModule[] = modulesData || [];

        const scheduleMap = new Map<string, CurriculumModule[]>();
        let currentClassDate = startDate; // Start with the first class Monday

        phases.forEach(phase => {
          const modulesInPhase = modules.filter(module => module.phase_id === phase.id);
          
          // Ensure currentClassDate is a Monday
          while (currentClassDate.getDay() !== 1) { // 1 = Monday
            currentClassDate = addDays(currentClassDate, 1);
          }

          const dateString = format(currentClassDate, 'yyyy-MM-dd');
          if (!scheduleMap.has(dateString)) {
            scheduleMap.set(dateString, []);
          }
          // Assign all modules for the current phase to this single class day
          scheduleMap.get(dateString)?.push(...modulesInPhase);

          // Advance to the next class Monday (two weeks later)
          currentClassDate = addDays(currentClassDate, 14);
        });
        setCourseScheduleMap(scheduleMap);

      } catch (error: any) {
        showError(`Failed to load course schedule: ${error.message}`);
        console.error('Error fetching curriculum for calendar:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurriculumAndGenerateSchedule();
  }, [startDate]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const dateString = format(date, 'yyyy-MM-dd');
      setModulesForSelectedDate(courseScheduleMap.get(dateString) || []);
    } else {
      setModulesForSelectedDate([]);
    }
  };

  const modifiers = {
    courseDays: (date: Date) => {
      const dateString = format(date, 'yyyy-MM-dd');
      return courseScheduleMap.has(dateString);
    },
  };

  const modifiersStyles = {
    courseDays: {
      backgroundColor: 'hsl(var(--primary))',
      color: 'hsl(var(--primary-foreground))',
      borderRadius: '0.375rem', // rounded-md
    },
  };

  if (loading) {
    return (
      <div className="flex flex-col lg:flex-row gap-8 p-4 w-full max-w-6xl mx-auto">
        <Card className="flex-shrink-0 lg:w-1/2">
          <CardHeader><Skeleton className="h-6 w-3/4" /></CardHeader>
          <CardContent><Skeleton className="h-64 w-full" /></CardContent>
        </Card>
        <Card className="flex-grow lg:w-1/2">
          <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
          <CardContent><Skeleton className="h-64 w-full" /></CardContent>
        </Card>
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
                {modulesForSelectedDate.map((module) => (
                  <Link to={`/phases/${module.phase_id}/modules/${module.id}`} key={module.id} className="block">
                    <div className="border-b pb-4 last:border-b-0 last:pb-0 hover:bg-accent p-2 rounded-md transition-colors">
                      <h3 className="text-lg font-semibold">{module.title}</h3>
                      <p className="text-muted-foreground text-sm">{module.description}</p>
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