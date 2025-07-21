// pages/PatientDashboardPage.jsx
import React, { useEffect, useState } from 'react';
import useAppointments from '../hooks/useAppointments';
import { Link } from 'react-router-dom';

export default function PatientDashboardPage() {
  const { getPatientDashboard, getPatientAppointments } = useAppointments();
  const [dashboard, setDashboard] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: dash } = await getPatientDashboard();
      const { data: apps } = await getPatientAppointments();
      setDashboard(dash);
      setAppointments(apps.slice(0, 3));
      setLoading(false);
    };

    load();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Patient Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard label="Total Appointments" value={dashboard.total_appointments} color="blue" />
        <StatCard label="Upcoming" value={dashboard.upcoming_appointments} color="green" />
        <StatCard label="Last Visit" value={dashboard.last_appointment?.doctor || 'None'} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Appointments</h2>
        {appointments.length === 0 ? (
          <p className="text-gray-500">No appointments found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">Doctor</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Time</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt.id} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4">{appt.doctor}</td>
                    <td className="py-3 px-4">{appt.date}</td>
                    <td className="py-3 px-4">{appt.time}</td>
                    <td className="py-3 px-4 capitalize">{appt.status}</td>
                    <td className="py-3 px-4">
                      {appt.mode === 'virtual' && appt.status === 'confirmed' && (
                        <a
                          href={appt.jitsi_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Join Call
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, color = 'gray' }) {
  const colors = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    gray: 'bg-gray-100 text-gray-800',
  };
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${colors[color]}`}>{value}</p>
    </div>
  );
}

function Loading() {
  return (
    <div className="flex items-center justify-center h-64">
      <p>Loading dashboard...</p>
    </div>
  );
}