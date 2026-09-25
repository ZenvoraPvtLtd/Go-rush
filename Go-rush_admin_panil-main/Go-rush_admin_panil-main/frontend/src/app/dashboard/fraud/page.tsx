"use client";

import React, { useState } from 'react';

// MOCK DATA for Fraud Alerts
const fraudAlerts = [
  { id: "FRD-01", type: "GPS Spoofing", user: "Vikash Singh (Driver)", severity: "CRITICAL", date: "2023-10-25 15:30", status: "OPEN" },
  { id: "FRD-02", type: "Promo Abuse", user: "Mohit Jain (Customer)", severity: "HIGH", date: "2023-10-25 12:45", status: "INVESTIGATING" },
  { id: "FRD-03", type: "Fake Ride", user: "Anil Sharma (Driver)", severity: "MEDIUM", date: "2023-10-24 18:20", status: "RESOLVED" },
];

export default function FraudPage() {
  const [filter, setFilter] = useState("All");

  const filteredAlerts = fraudAlerts.filter(alert => filter === "All" || alert.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Fraud & Risk Alerts</h1>
          <p className="text-charcoal-light">System-generated alerts for unusual activities and policy violations.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        
        {/* Filter */}
        <div className="mb-6 flex">
          <select 
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand focus:outline-none bg-white min-w-[200px]"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Alerts</option>
            <option value="OPEN">Open Alerts</option>
            <option value="INVESTIGATING">Under Investigation</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>

        {/* Fraud Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">Alert ID & Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">Flagged User</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">Severity</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-charcoal-light uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAlerts.map((alert, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-extrabold text-charcoal">{alert.id}</div>
                    <div className="text-sm text-red-600 font-bold mt-1">{alert.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-charcoal font-medium">
                    {alert.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                     <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                        alert.severity === 'CRITICAL' ? 'bg-red-100 text-red-800' : 
                        alert.severity === 'HIGH' ? 'bg-orange-100 text-orange-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {alert.severity}
                      </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                     <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                        alert.status === 'OPEN' ? 'bg-blue-100 text-blue-800' : 
                        alert.status === 'INVESTIGATING' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {alert.status}
                      </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {alert.status !== 'RESOLVED' && (
                      <button className="text-white bg-charcoal px-3 py-1 rounded hover:bg-black text-xs mr-2 font-bold shadow-sm">Block User</button>
                    )}
                    <button className="text-brand hover:text-brand-hover text-xs font-bold">Investigate</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
