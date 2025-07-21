// hooks/useMedicalRecords.js
import { useAuth } from '../hooks/useAuth';

export const useMedicalRecords = () => {
  const { token } = useAuth();

  const getRecords = async () => {
    const response = await fetch('/api/records/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return { success: response.ok, data };
  };

  const getRecordById = async (id) => {
    const response = await fetch(`/api/records/${id}/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return { success: response.ok, data };
  };

  const createRecord = async (recordData) => {
    const response = await fetch('/api/records/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recordData),
    });

    const data = await response.json();
    return { success: response.ok, data };
  };

  const updateRecord = async (id, updateData) => {
    const response = await fetch(`/api/records/${id}/`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    const data = await response.json();
    return { success: response.ok, data };
  };

  const deleteRecord = async (id) => {
    const response = await fetch(`/api/records/${id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return { success: response.ok, data };
  };

  const exportRecord = async (id) => {
    const response = await fetch(`/api/records/${id}/export/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) return { success: false };

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', `medical-record-${id}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();

    return { success: true };
  };

  return {
    getRecords,
    getRecordById,
    createRecord,
    updateRecord,
    deleteRecord,
    exportRecord,
  };
};