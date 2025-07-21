// pages/MedicalRecordsPage.jsx
import React, { useEffect, useState } from 'react';
import useMedicalRecords from '../hooks/useMedicalRecords';
import useAuth from '../hooks/useAuth';

export default function MedicalRecordsPage() {
  const {getRecords, exportRecord, deleteRecord} = useMedicalRecords();

  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecords = async () => {
      const { success, data } = await getRecords();
      if (success) {
        setRecords(data);
      if (success) {
        setRecords(data);
      }
        setRecords(data);
      }
      setLoading(false);
    };

    loadRecords();
  }, [getRecords]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading medical records...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Medical Records</h1>

      {user.user_type === 'doctor' && (
        <div className="mb-6 text-right">
          <a
            href="/records/create"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200"
          >
            Add New Record
          </a>
        </div>
      )}

      {records.length === 0 ? (
        <div className="bg-gray-100 text-gray-700 p-6 rounded-lg text-center">
          No medical records found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Patient</th>
                <th className="py-3 px-4 text-left">Diagnosis</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">{record.patient}</td>
                  <td className="py-3 px-4">{record.diagnosis}</td>
                  <td className="py-3 px-4">{new Date(record.created_at).toLocaleDateString()}</td>
                  <td className="py-3 px-4 space-x-2">
                    <a href={`/records/${record.id}`} className="text-blue-600 hover:underline">
                      View
                    </a>
                    {user.user_type === 'doctor' && (
                      <>
                        <span className="text-gray-400">|</span>
                        <a href={`/records/edit/${record.id}`} className="text-blue-600 hover:underline">
                          Edit
                        </a>
                        <span className="text-gray-400">|</span>
                        <button
                          onClick={async () => {
                            if (window.confirm('Are you sure you want to delete this record?')) {
                              const { success } = await deleteRecord(record.id);
                              if (success) window.location.reload();
                            }
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                        <span className="text-gray-400">|</span>
                        <button
                          onClick={() => exportRecord(record.id)}
                          className="text-green-600 hover:text-green-800"
                        >
                          Export PDF
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}