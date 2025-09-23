'use client';

import { useState } from 'react';

interface CalendarProps {
  onDateTimeSelect: (date: Date, time: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onDateTimeSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Available time slots
  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM'
  ];

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
    setSelectedDate(null);
  };

  const handleDateClick = (date: Date) => {
    if (isPastDate(date)) return;
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    if (selectedDate) {
      onDateTimeSelect(selectedDate, time);
    }
  };

  const days = getDaysInMonth(currentDate);
  const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Calendar */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">{monthYear}</h2>
          <div className="flex gap-2">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => (
            <div key={index} className="aspect-square">
              {date && (
                <button
                  onClick={() => handleDateClick(date)}
                  disabled={isPastDate(date)}
                  className={`
                    w-full h-full flex items-center justify-center text-sm rounded-md transition-colors
                    ${isPastDate(date) 
                      ? 'text-gray-300 cursor-not-allowed' 
                      : 'hover:bg-blue-50 cursor-pointer'
                    }
                    ${isToday(date) ? 'bg-blue-100 text-blue-700 font-semibold' : ''}
                    ${selectedDate?.toDateString() === date.toDateString() 
                      ? 'bg-blue-600 text-white font-semibold' 
                      : ''
                    }
                  `}
                >
                  {date.getDate()}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Time slots */}
      <div className="flex-1">
        {selectedDate ? (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Available times for {formatDate(selectedDate)}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {timeSlots.map(time => (
                <button
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  className="p-3 text-center border border-gray-200 rounded-md hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p>Select a date to see available times</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
