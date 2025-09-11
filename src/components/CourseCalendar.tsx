"use client";

import React, { useState, useEffect } from 'react';
import { format, addDays, isSameDay } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { courseOutline, DailyLesson } from '@/data/courseSchedule';

interface CourseCalendarProps {
  startDate: Date; // The actual start date of the course (e.g., the first class Monday)
}

const CourseCalendar: React.FC<CourseCalendarProps> = ({ startDate }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [lessonsForSelectedDate, setLessonsForSelectedDate] = useState<DailyLesson[]>([]);
  const [courseDates, setCourseDates] = useState<Map<string, DailyLesson[]>>(new Map()); // Map date string to lessons

  useEffect(() => {
    const generateCourseDates = () => {
      const datesMap = new Map<string, DailyLesson[]>();
      let currentClassDate = startDate; // Start with the first class Monday

      courseOutline.forEach(week => {
        const dateString = format(currentClassDate, 'yyyy-MM-dd');
        if (!datesMap.has(dateString)) {
          datesMap.set(dateString, []);
        }
        // Assign all daily lessons for the current week to this single class day
        datesMap.get(dateString)?.push(...week.days);

        // Advance to the next class Monday (two weeks later)
        currentClassDate = addDays(currentClassDate, 14);
      });
      setCourseDates(datesMap);
    };

    generateCourseDates();
  }, [startDate]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const dateString = format(date, 'yyyy-MM-dd');
      setLessonsForSelectedDate(courseDates.get(dateString) || []);
    } else {
      setLessonsForSelectedDate([]);
    }
  };

  const modifiers = {
    courseDays: (date: Date) => {
      const dateString = format(date, 'yyyy-MM-dd');
      return courseDates.has(dateString);
    },
  };

  const modifiersStyles = {
    courseDays: {
      backgroundColor: 'hsl(var(--primary))',
      color: 'hsl(var(--primary-foreground))',
      borderRadius: '0.375rem', // rounded-md
    },
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-4 w-full max-w-6xl mx-auto">
      <Card className="flex-shrink-0 lg:w-1/2">
        <CardHeader>
          <CardTitle>Course Schedule</CardTitle>
          <CardDescription>Click on a highlighted day to see the lessons.</CardDescription>
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
            {selectedDate ? `Lessons for ${format(selectedDate, 'PPP')}` : 'Select a Date'}
          </CardTitle>
          <CardDescription>
            {selectedDate && lessonsForSelectedDate.length === 0 && 'No lessons scheduled for this day.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] pr-4">
            {lessonsForSelectedDate.length > 0 ? (
              <div className="space-y-4">
                {lessonsForSelectedDate.map((lesson, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <h3 className="text-lg font-semibold">{lesson.title}</h3>
                    <p className="text-muted-foreground text-sm">{lesson.description}</p>
                  </div>
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