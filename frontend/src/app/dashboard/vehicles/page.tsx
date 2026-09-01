"use client";

import React, { useState } from 'react';

// MOCK DATA for Vehicles
const vehiclesList = [
  { id: "V-501", plate: "MH 12 AB 1234", category: "Micro", driver: "Ramesh Yadav", rcStatus: "VERIFIED", insurance: "EXPIRED" },
  { id: "V-502", plate: "DL 01 CD 5678", category: "Mini", driver: "Suresh Kumar", rcStatus: "VERIFIED", insurance: "VALID" },
  { id: "V-503", plate: "KA 05 EF 9012", category: "Sedan", driver: "Vikash Singh", rcStatus: "PENDING", insurance: "VALID" },
  { id: "V-504", plate: "HR 26 GH 3456", category: "SUV", driver: "Unassigned", rcStatus: "REJECTED", insurance: "EXPIRED" },
];

export default function VehiclesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVehicles = vehiclesList.filter(vehicle => 
    vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Vehicle Management</h1>
          <p className="text-charcoal-light">Manage fleet, categories, and document expirations.</p>
        </div>
        <button className="bg-brand hover:bg-brand-hover text-white px-4 py-2 rounded-lg font-semibold shadow-sm transition-colors">
          + Add Vehicle
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        
        {/* Search */}
        <div className="mb-6 flex">
          <input 
            type="text" 
            placeholder="Search by license plate or driver name..." 
            className="flex-1 max-w-md px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Vehicles Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">License Plate</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">Assigned Driver</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">RC Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">Insurance</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-charcoal-light uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVehicles.map((vehicle, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-extrabold text-charcoal">{vehicle.plate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-charcoal-light">
                    <span className="bg-gray-100 px-2 py-1 rounded-md">{vehicle.category}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-charcoal">{vehicle.driver}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                     <span className={`px-2 py-1 rounded-md text-xs font-bold ${vehicle.rcStatus === 'VERIFIED' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                        {vehicle.rcStatus}
                      </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                     <span className={`px-2 py-1 rounded-md text-xs font-bold ${vehicle.insurance === 'VALID' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {vehicle.insurance}
                      </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-brand hover:text-brand-hover">Verify Docs</button>
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
