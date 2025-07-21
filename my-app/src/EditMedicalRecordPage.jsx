// pages/ViewMedicalRecordPage.jsx
import React, { useEffect, useState } from 'react';
import useMedicalRecords from '../hooks/useMedicalRecords';
import { useParams } from 'react-router-dom';

export default function ViewMedicalRecordPage() {
  const { id } = useParams();
  const { getRecordById } = useMedicalRecords();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecord = async () => {
      const { success, data } = await getRecordById(id);
      if (success) setRecord(data);
      setLoading(false);
    };

    loadRecord();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading record...</p>
      </div>
    );
  }

  if (!record) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Record not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Medical Record</h1>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">Patient</label>
          <p className="text-lg text-gray-800">{record.patient}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">Doctor</label>
          <p className="text-lg text-gray-800">{record.doctor}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">Diagnosis</label>
          <p className="text-lg text-gray-800">{record.diagnosis}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">Notes</label>
          <p className="text-gray-800">{record.notes}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">Prescriptions</label>
          {record.prescriptions.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1">
              {record.prescriptions.map((p, idx) => (
                <li key={idx} className="text-gray-800">
                  <strong>{p.drug_name}</strong> — {p.dosage}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No prescriptions.</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">Date</label>
          <p className="text-gray-800">{new Date(record.created_at).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}