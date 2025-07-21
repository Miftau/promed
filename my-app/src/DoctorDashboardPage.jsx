// pages/DoctorDashboardPage.jsx
import React, { useEffect, useState } from 'react';
import useAppointments from '../hooks/useAppointments';

export default function DoctorDashboardPage() {
  const { getDoctorDashboard, getDoctorAppointments } = useAppointments();
  const [dashboard, setDashboard] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: dash } = await getDoctorDashboard();
      const { data: apps } = await getDoctorAppointments();
      setDashboard(dash);
      setAppointments(apps.filter(a => a.status === 'confirmed').slice(0, 3));
      setLoading(false);
    };

    load();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Doctor Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard label="Total Appointments" value={dashboard.total_appointments} color="blue" />
        <StatCard label="Today" value={dashboard.today_appointments} color="green" />
        <StatCard label="Pending Follow-ups" value={dashboard.upcoming?.length || 0} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Today's Appointments</h2>
        {dashboard.upcoming?.length === 0 ? (
          <p className="text-gray-500">No appointments scheduled today.</p>
        ) : (
          <ul className="space-y-3">
            {dashboard.upcoming.map((appt, i) => (
              <li key={i} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                <div>
                  <p className="font-medium">{appt.patient}</p>
                  <p className="text-sm text-gray-600">{appt.reason}</p>
                </div>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{appt.time}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}