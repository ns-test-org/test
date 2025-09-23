'use client';

import { useState } from 'react';
import Calendar from './components/Calendar';
import BookingForm from './components/BookingForm';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const handleDateTimeSelect = (date: Date, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setShowBookingForm(true);
  };

  const handleBackToCalendar = () => {
    setShowBookingForm(false);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Schedule a Meeting</h1>
          <p className="text-gray-600 mt-1">Select a date and time that works for you</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {!showBookingForm ? (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <Calendar onDateTimeSelect={handleDateTimeSelect} />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <BookingForm 
              selectedDate={selectedDate!}
              selectedTime={selectedTime!}
              onBack={handleBackToCalendar}
            />
          </div>
        )}
      </main>
    </div>
  );
}

