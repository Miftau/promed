// pages/AdminDashboardPage.jsx
import React, { useEffect, useState } from 'react';
import useAppointments from '../hooks/useAppointments';

export default function AdminDashboardPage() {
  const { getAdminDashboard } = useAppointments();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await getAdminDashboard();
      setDashboard(data);
      setLoading(false);
    };

    load();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard label="Total Appointments" value={dashboard.total_appointments} color="blue" />
        <StatCard label="Completed" value={dashboard.completed} color="green" />
        <StatCard label="Pending" value={dashboard.pending} color="yellow" />
        <StatCard label="Today" value={dashboard.today_appointments} color="purple" />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Top Doctors</h2>
        <ul className="space-y-3">
          {dashboard.top_doctors.map((doc, i) => (
            <li key={i} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
              <span className="font-medium">{doc.name}</span>
              <span className="text-gray-600">{doc.appointments} appointments</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}