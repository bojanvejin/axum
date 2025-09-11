"use client";

import React, { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { CurriculumSession } from '@/data/curriculum';
import { showError } from '@/utils/toast';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

interface CourseCalendarProps {
  startDate: Date; // The actual start date of the course (e.g., the first class Monday)
}

const CourseCalendar: React.FC<CourseCalendarProps> = ({ startDate }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [month, setMonth] = useState<Date>(startDate);
  const [sessionsForSelectedDate, setSessionsForSelectedDate] = useState<CurriculumSession[]>([]);
  const [classDaysSessionIdsMap, setClassDaysSessionIdsMap] = useState<Map<string, Set<string>>>(new Map());
  const [classDaysSessionsDataMap, setClassDaysSessionsDataMap] = useState<Map<string, CurriculumSession[]>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndGenerateCourseDates = async () => {
      setLoading(true);
      try {
        // Fetch all sessions
        const { data: sessionsData, error } = await supabase
          .from('sessions')
          .select('*')
          .order('session_number', { ascending: true });

        if (error) throw error;

        const newClassDaysSessionIdsMap = new Map<string, Set<string>>();
        const newClassDaysSessionsDataMap = new Map<string, CurriculumSession[]>();

        sessionsData?.forEach(session => {
          if (session.covers_days && session.covers_days.length > 0) {
            // Assuming 'covers_days' refers to the day number from the start of the course
            // And that the session is "scheduled" on the first day it covers.
            const firstCoveredDay = Math.min(...session.covers_days);
            // Calculate the actual calendar date for this session
            const classDay = addDays(startDate, firstCoveredDay - 1); // -1 because day 1 is 0 days after startDate
            const dateString = format(classDay, 'yyyy-MM-dd');

            // For highlighting
            if (!newClassDaysSessionIdsMap.has(dateString)) {
              newClassDaysSessionIdsMap.set(dateString, new Set());
            }
            newClassDaysSessionIdsMap.get(dateString)?.add(session.id);

            // For displaying session details
            if (!newClassDaysSessionsDataMap.has(dateString)) {
              newClassDaysSessionsDataMap.set(dateString, []);
            }
            const sessionsForThisDay = newClassDaysSessionsDataMap.get(dateString);
            if (sessionsForThisDay && !sessionsForThisDay.some(s => s.id === session.id)) {
              sessionsForThisDay.push(session);
            }
          }
        });

        // Sort sessions within each day by session_number
        newClassDaysSessionsDataMap.forEach(sessions => {
          sessions.sort((a, b) => a.session_number - b.session_number);
        });

        setClassDaysSessionIdsMap(newClassDaysSessionIdsMap);
        setClassDaysSessionsDataMap(newClassDaysSessionsDataMap);

        // If no date is selected, default to showing sessions for the first scheduled day if available
        if (!selectedDate) {
          const firstScheduledDateString = Array.from(newClassDaysSessionIdsMap.keys()).sort()[0];
          if (firstScheduledDateString) {
            const firstScheduledDate = new Date(firstScheduledDateString);
            setSelectedDate(firstScheduledDate);
            setMonth(firstScheduledDate);
            setSessionsForSelectedDate(newClassDaysSessionsDataMap.get(firstScheduledDateString) || []);
          }
        }

      } catch (err: any) {
        showError(`Failed to load course schedule: ${err.message}`);
        console.error('Error fetching sessions for calendar:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndGenerateCourseDates();
  }, [startDate]);

  useEffect(() => {
    if (selectedDate) {
      const dateString = format(selectedDate, 'yyyy-MM-dd');
      setSessionsForSelectedDate(classDaysSessionsDataMap.get(dateString) || []);
      setMonth(selectedDate);
    } else {
      setSessionsForSelectedDate([]);
    }
  }, [selectedDate, classDaysSessionsDataMap]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const modifiers = {
    classDays: (date: Date) => {
      const dateString = format(date, 'yyyy-MM-dd');
      return classDaysSessionIdsMap.has(dateString);
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
          <CardDescription>Click on a highlighted day to see the sessions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            month={month}
            onMonthChange={setMonth}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            className="rounded-md border shadow w-full"
          />
        </CardContent>
      </Card>

      <Card className="flex-grow lg:w-1/2">
        <CardHeader>
          <CardTitle>
            {selectedDate ? `Sessions for ${format(selectedDate, 'PPP')}` : 'Select a Date'}
          </CardTitle>
          <CardDescription>
            {selectedDate && sessionsForSelectedDate.length === 0 && 'No sessions scheduled for this day.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] pr-4">
            {sessionsForSelectedDate.length > 0 ? (
              <div className="space-y-4">
                {sessionsForSelectedDate.map((session, index) => (
                  <Link to={`/sessions/${session.id}`} key={session.id} className="block">
                        <div className="border-b pb-4 last:border-b-0 last:pb-0 hover:bg-accent p-2 rounded-md transition-colors">
                          <h3 className="text-lg font-semibold">Session {session.session_number}: {session.title}</h3>
                          <p className="text-muted-foreground text-sm">{session.description}</p>
                          {session.covers_days && <p className="text-xs text-muted-foreground mt-1">Covers Days: {session.covers_days.join(', ')}</p>}
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