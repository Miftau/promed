// components/CalendarView.jsx
import React, { useState } from 'react';

export default function CalendarView({ appointments = [] }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const goToPrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const today = new Date();
    const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;

    const days = [];
    let date = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          week.push(<div key={`empty-${j}`} className="h-20 p-1"></div>);
        } else if (date > daysInMonth) {
          week.push(<div key={`empty-${j}`} className="h-20 p-1"></div>);
        } else {
          const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
          const dayAppointments = appointments.filter(a => a.date === dateString);

          week.push(
            <div key={date} className="h-20 p-1 border-r border-b">
              <div className={`text-sm ${isCurrentMonth && date === today.getDate() ? 'bg-blue-100 w-6 h-6 rounded-full flex items-center justify-center' : ''}`}>
                {date}
              </div>
              <div className="mt-1 space-y-1">
                {dayAppointments.slice(0, 2).map((appt, idx) => (
                  <div key={idx} className="text-xs bg-blue-100 text-blue-800 px-1 rounded truncate">
                    {appt.time} - {appt.doctor || appt.patient}
                  </div>
                ))}
                {dayAppointments.length > 2 && (
                  <div className="text-xs text-gray-500">+{dayAppointments.length - 2} more</div>
                )}
              </div>
            </div>
          );
          date++;
        }
      }
      days.push(<div key={`week-${i}`} className="grid grid-cols-7">{week}</div>);
    }

    return days;
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
        <div className="flex space-x-2">
          <button onClick={goToPrevMonth} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
            Prev
          </button>
          <button onClick={goToNextMonth} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
            Next
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-600 border-b">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="py-2">{day}</div>
        ))}
      </div>
      {renderCalendar()}
    </div>
  );
}