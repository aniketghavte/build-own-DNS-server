'use client';

import React, { useState, useEffect } from 'react';

interface DomainRecord {
  id: number;
  domain: string;
  recordType: string;
  value: string;
}

const DomainRecordManager: React.FC = () => {
  const [records, setRecords] = useState<DomainRecord[]>([]);
  const [domain, setDomain] = useState('');
  const [recordType, setRecordType] = useState('A');
  const [value, setValue] = useState('');

  useEffect(() => {
    // Fetch existing records from your backend
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await fetch('http://your-ec2-backend-url/api/records');
      if (response.ok) {
        const data = await response.json();
        setRecords(data);
      } else {
        console.error('Failed to fetch records');
      }
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://your-ec2-backend-url/api/records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domain, recordType, value }),
      });
      if (response.ok) {
        fetchRecords();
        setDomain('');
        setRecordType('A');
        setValue('');
      } else {
        console.error('Failed to add record');
      }
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Domain"
            className="p-2 border rounded"
            required
          />
          <select
            value={recordType}
            onChange={(e) => setRecordType(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="A">A</option>
            <option value="AAAA">AAAA</option>
            <option value="CNAME">CNAME</option>
            <option value="MX">MX</option>
            <option value="TXT">TXT</option>
          </select>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Value"
            className="p-2 border rounded"
            required
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Add Record
          </button>
        </div>
      </form>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Existing Records</h2>
        <ul className="space-y-2">
          {records.map((record) => (
            <li key={record.id} className="p-2 bg-gray-100 rounded">
              <strong>{record.domain}</strong> - {record.recordType} - {record.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DomainRecordManager;
