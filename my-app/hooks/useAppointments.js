// hooks/useAppointments.js
import { useAuth } from '../hooks/useAuth';

export const useAppointments = () => {
  const { token } = useAuth();

  const createAppointment = async (data) => {
    const response = await fetch('/api/appointments/create/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();
    return { success: response.ok, data: json };
  };

  const getPatientAppointments = async () => {
    const response = await fetch('/api/appointments/patient/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();
    return { success: response.ok, data: json };
  };

  const getDoctorAppointments = async () => {
    const response = await fetch('/api/appointments/doctor/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();
    return { success: response.ok, data: json };
  };

  const getPatientDashboard = async () => {
    const response = await fetch('/api/appointments/dashboard/patient/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();
    return { success: response.ok, data: json };
  };

  const getDoctorDashboard = async () => {
    const response = await fetch('/api/appointments/dashboard/doctor/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();
    return { success: response.ok, data: json };
  };

  const getAdminDashboard = async () => {
    const response = await fetch('/api/appointments/dashboard/admin/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();
    return { success: response.ok, data: json };
  };

  return {
    createAppointment,
    getPatientAppointments,
    getDoctorAppointments,
    getPatientDashboard,
    getDoctorDashboard,
    getAdminDashboard,
  };
};