import React from 'react';

const OHschedule = ({ dates, start, end }) => {
  const daysOfWeek = ['M', 'T', 'W', 'Th', 'F', 'S', 'Su'];

  const timeSlots = Array.from({ length: (22 - 8) * 2 }, (_, index) => {
    const hour = 8 + Math.floor(index / 2);
    const minute = index % 2 === 0 ? '00' : '30';
    return `${hour}:${minute}`;
  });

  const to12HourFormat = (time24) => {
    const [hours, minutes] = time24.split(':');
    const hours12 = hours % 12 || 12;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    return `${hours12}:${minutes} ${ampm}`;
  };

  const isScheduled = (day, time) => {
    const scheduledDays = dates.map(day => daysOfWeek.indexOf(day));
    const dayIndex = daysOfWeek.indexOf(day);

    if (!scheduledDays.includes(dayIndex)) return false;

    const scheduleStart = new Date(`1970-01-01T${start}:00`);
    const scheduleEnd = new Date(`1970-01-01T${end}:00`);
    const timeCheck = new Date(`1970-01-01T${time}:00`);

    return timeCheck >= scheduleStart && timeCheck < scheduleEnd;
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-lg font-bold mb-2 text-center">Office Hours Schedule</h2>
      <div className="grid grid-cols-8 text-center bg-white shadow rounded-lg">
        <div className="py-3 font-bold bg-indigo-200">Time / Day</div>
        {daysOfWeek.map((day) => (
          <div key={day} className="py-3 font-bold bg-indigo-200">{day}</div>
        ))}
        {timeSlots.map((time) => (
          <React.Fragment key={time}>
            <div className="py-2 border-b border-r">{to12HourFormat(time)}</div>
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className={`py-2 border-b ${isScheduled(day, time) ? 'bg-indigo-500 text-white' : 'hover:bg-indigo-100 cursor-pointer'}`}
                onClick={() => {}}
              >
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default OHschedule;
