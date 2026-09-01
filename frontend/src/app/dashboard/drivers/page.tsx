"use client";

import React, { useState } from 'react';

// MOCK DATA: Isko baad mein GET /v1/admin/drivers API se replace kiya jayega
const driversList = [
  { id: "D-101", name: "Ramesh Yadav", phone: "+91 9876543210", vehicle: "Tata Nexon (EV)", status: "ONLINE", kyc: "VERIFIED" },
  { id: "D-102", name: "Suresh Kumar", phone: "+91 9876543211", vehicle: "Maruti Dzire", status: "OFFLINE", kyc: "VERIFIED" },
  { id: "D-103", name: "Vikash Singh", phone: "+91 9876543212", vehicle: "Honda Amaze", status: "PENDING", kyc: "PENDING" },
  { id: "D-104", name: "Anil Sharma", phone: "+91 9876543213", vehicle: "Hyundai Aura", status: "BLOCKED", kyc: "REJECTED" },
];

export default function DriversPage() {
  // State for filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Filtering Logic
  const filteredDrivers = driversList.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          driver.phone.includes(searchTerm);
    const matchesStatus = statusFilter === "All" || driver.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Driver Management</h1>
          <p className="text-charcoal-light">View, search, and manage platform drivers.</p>
        </div>
        <button className="bg-brand hover:bg-brand-hover text-white px-4 py-2 rounded-lg font-semibold shadow-sm transition-colors">
          + Add New Driver
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        
        {/* Filters Section */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Search by name or phone..." 
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand focus:outline-none bg-white min-w-[150px]"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="ONLINE">Online</option>
            <option value="OFFLINE">Offline</option>
            <option value="PENDING">Pending</option>
            <option value="BLOCKED">Blocked</option>
          </select>
        </div>

        {/* Drivers Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">Driver Info</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">Vehicle</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">KYC Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">Current Status</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-charcoal-light uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDrivers.length > 0 ? (
                filteredDrivers.map((driver, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-charcoal">{driver.name}</div>
                      <div className="text-sm text-charcoal-light">{driver.phone} • {driver.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-charcoal">{driver.vehicle}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                      <span className={`px-2 py-1 rounded-md text-xs ${driver.kyc === 'VERIFIED' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {driver.kyc}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-charcoal">{driver.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-brand hover:text-brand-hover">Review</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-charcoal-light">
                    No drivers found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
