"use client";

import React, { useState } from 'react';

// MOCK DATA for Rides
const ridesList = [
  { id: "R-9001", customer: "Rahul Sharma", driver: "Amit Kumar", pickup: "Connaught Place", dropoff: "Gurgaon Sec 29", status: "IN_PROGRESS", fare: "₹450" },
  { id: "R-9002", customer: "Priya Singh", driver: "Rajesh (Searching)", pickup: "Hauz Khas", dropoff: "Noida Sec 15", status: "SEARCHING", fare: "Est. ₹250" },
  { id: "R-9003", customer: "Vikram G.", driver: "Suresh P.", pickup: "IGI Airport", dropoff: "Vasant Kunj", status: "COMPLETED", fare: "₹320" },
  { id: "R-9004", customer: "Neha M.", driver: "Unassigned", pickup: "Saket Mall", dropoff: "Lajpat Nagar", status: "CANCELLED", fare: "₹0" },
];

export default function RidesPage() {
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredRides = ridesList.filter(ride => 
    statusFilter === "All" || ride.status === statusFilter
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Ride Operations</h1>
          <p className="text-charcoal-light">Monitor live rides, intervene, or force re-match drivers.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        
        {/* Filter */}
        <div className="mb-6 flex">
          <select 
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand focus:outline-none bg-white min-w-[200px]"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Ride Statuses</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="SEARCHING">Searching</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        {/* Rides Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">Ride Details</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">Locations</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">Fare</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-charcoal-light uppercase tracking-wider">Intervention</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRides.map((ride, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-extrabold text-brand">{ride.id}</div>
                    <div className="text-sm text-charcoal mt-1">C: {ride.customer}</div>
                    <div className="text-sm text-charcoal-light">D: {ride.driver}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-charcoal">
                    <div className="font-semibold text-green-600">A: {ride.pickup}</div>
                    <div className="font-semibold text-red-500 mt-1">B: {ride.dropoff}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                     <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                        ride.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 
                        ride.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' : 
                        ride.status === 'SEARCHING' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {ride.status}
                      </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-extrabold text-charcoal">{ride.fare}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {ride.status === 'SEARCHING' && (
                      <button className="text-white bg-brand px-3 py-1 rounded hover:bg-brand-hover text-xs mr-2">Force Match</button>
                    )}
                    {ride.status === 'IN_PROGRESS' && (
                      <button className="text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-xs mr-2">Cancel</button>
                    )}
                    <button className="text-brand hover:text-brand-hover text-xs font-bold">Details</button>
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
