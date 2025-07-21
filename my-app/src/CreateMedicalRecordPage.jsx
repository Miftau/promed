// pages/CreateMedicalRecordPage.jsx
import React, { useState } from 'react';
import useMedicalRecords from '../hooks/useMedicalRecords';
import { useNavigate } from 'react-router-dom';

export default function CreateMedicalRecordPage() {
  const [patient, setPatient] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [notes, setNotes] = useState('');
  const [drugName, setDrugName] = useState('');
  const [dosage, setDosage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { createRecord } = useMedicalRecords();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const recordData = {
      patient,
      diagnosis,
      notes,
      prescriptions: [{ drug_name: drugName, dosage }],
    };

    const { success, data } = await createRecord(recordData);

    if (success) {
      setSuccess('Record created successfully!');
      setTimeout(() => navigate('/records'), 1500);
    } else {
      setError(data.error || 'Failed to create record');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Medical Record</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
        <div className="mb-4">
          <label htmlFor="patient" className="block text-sm font-medium text-gray-700 mb-1">
            Patient ID
          </label>
          <input
            id="patient"
            type="number"
            value={patient}
            onChange={(e) => setPatient(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700 mb-1">
            Diagnosis
          </label>
          <input
            id="diagnosis"
            type="text"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            id="notes"
            rows="4"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="drugName" className="block text-sm font-medium text-gray-700 mb-1">
            Prescription Drug
          </label>
          <input
            id="drugName"
            type="text"
            value={drugName}
            onChange={(e) => setDrugName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="dosage" className="block text-sm font-medium text-gray-700 mb-1">
            Dosage
          </label>
          <input
            id="dosage"
            type="text"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200 ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Saving...' : 'Save Record'}
          </button>
        </div>
      </form>
    </div>
  );
}