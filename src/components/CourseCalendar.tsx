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

interface CourseCalendarProps {
  startDate: Date; // The actual start date of the course (e.g., the first class Monday)
}

const CourseCalendar: React.FC<CourseCalendarProps> = ({ startDate }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [modulesForSelectedDate, setModulesForSelectedDate] = useState<CurriculumModule[]>([]);
  const [courseDatesMap, setCourseDatesMap] = useState<Map<string, CurriculumModule[]>>(new Map()); // Map date string to modules
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndGenerateCourseDates = async () => {
      setLoading(true);
      try {
        const { data: modulesData, error } = await supabase
          .from('modules')
          .select('*')
          .order('order_index', { ascending: true });

        if (error) throw error;

        const datesMap = new Map<string, CurriculumModule[]>();
        
        // Assuming the course has a fixed schedule where each 'day_number' corresponds to a sequential day from startDate
        // And 'week_number' helps in calculating the offset.
        // For this specific request, each 'daily lesson' is a module, and they are scheduled sequentially.
        // The user's `courseOutline` implies a weekly structure, but the request says "each lesson being taught"
        // and "connect each lesson to the respective module though the calendar or vice versa".
        // Given the previous `CourseCalendar` logic, it seems like the course has specific "class days" (e.g., every other Monday).
        // Let's stick to the previous `CourseCalendar` logic where `currentClassDate` advances by 14 days.
        // This means all modules for a given week in `courseOutline` are taught on a single "class day".

        // Re-evaluating the user's request: "all of these modules cannot be accessed, please connect them: ... inside the module lesson, oince in the lesson module, you have a way of seeing what day its being taught in the calendar."
        // This implies a 1:1 mapping between a module and a specific day it's taught.
        // The `courseOutline` has `DailyLesson`s with `day` numbers.
        // Let's assume `day_number` in the module corresponds to the `day` in `courseOutline`.
        // And `week_number` in the module corresponds to the `week` in `courseOutline`.

        // The `courseOutline` has 6 weeks, with varying numbers of days.
        // Day 1, Day 2, Day 3, Day 4, Day 5 (Week 1)
        // Day 6, Day 7, Day 8, Day 9, Day 10 (Week 2)
        // ... up to Day 26 (Week 6)

        // If each `DailyLesson` is now a module, and we want to see what day it's taught,
        // we need to map each module to its *actual* calendar date.
        // Let's assume `startDate` is the first day of the course (Day 1).
        // Then a module with `day_number = N` would be `startDate + (N-1) days`.

        modulesData?.forEach(module => {
          if (module.day_number !== undefined && module.day_number !== null) {
            const moduleDate = addDays(startDate, module.day_number - 1); // Day 1 is startDate, Day 2 is startDate + 1, etc.
            const dateString = format(moduleDate, 'yyyy-MM-dd');
            if (!datesMap.has(dateString)) {
              datesMap.set(dateString, []);
            }
            datesMap.get(dateString)?.push(module);
          }
        });
        setCourseDatesMap(datesMap);

        // If a date was already selected, update its modules
        if (selectedDate) {
          const dateString = format(selectedDate, 'yyyy-MM-dd');
          setModulesForSelectedDate(datesMap.get(dateString) || []);
        }

      } catch (err: any) {
        showError(`Failed to load course modules: ${err.message}`);
        console.error('Error fetching modules for calendar:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndGenerateCourseDates();
  }, [startDate]); // Re-run if startDate changes

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const dateString = format(date, 'yyyy-MM-dd');
      setModulesForSelectedDate(courseDatesMap.get(dateString) || []);
    } else {
      setModulesForSelectedDate([]);
    }
  };

  const modifiers = {
    courseDays: (date: Date) => {
      const dateString = format(date, 'yyyy-MM-dd');
      return courseDatesMap.has(dateString);
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
                          <p className="text-xs text-muted-foreground mt-1">Week {module.week_number}, Day {module.day_number}</p>
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