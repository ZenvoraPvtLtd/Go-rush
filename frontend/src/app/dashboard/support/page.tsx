"use client";

import React, { useState } from 'react';

// MOCK DATA for Support Tickets
const ticketsList = [
  { id: "TKT-1001", user: "Ramesh Yadav", role: "Driver", issue: "Payment not received", priority: "HIGH", status: "OPEN" },
  { id: "TKT-1002", user: "Priya Singh", role: "Customer", issue: "Driver was rude", priority: "MEDIUM", status: "PENDING" },
  { id: "TKT-1003", user: "Vikram G.", role: "Customer", issue: "Forgot item in cab", priority: "HIGH", status: "OPEN" },
  { id: "TKT-1004", user: "Anil Sharma", role: "Driver", issue: "App crashing on accept", priority: "LOW", status: "CLOSED" },
];

export default function SupportPage() {
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredTickets = ticketsList.filter(ticket => 
    statusFilter === "All" || ticket.status === statusFilter
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Support Tickets</h1>
          <p className="text-charcoal-light">Manage customer and driver queries, complaints, and issues.</p>
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
            <option value="All">All Tickets</option>
            <option value="OPEN">Open</option>
            <option value="PENDING">Pending (Waiting on user)</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>

        {/* Tickets Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">Ticket ID & User</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">Issue Description</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-charcoal-light uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTickets.map((ticket, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-extrabold text-charcoal">{ticket.id}</div>
                    <div className="text-sm text-charcoal-light mt-1">{ticket.user} <span className="bg-gray-200 px-2 py-0.5 rounded text-xs ml-2">{ticket.role}</span></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-charcoal font-medium">
                    {ticket.issue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                     <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                        ticket.priority === 'HIGH' ? 'bg-red-100 text-red-800' : 
                        ticket.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {ticket.priority}
                      </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                     <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                        ticket.status === 'OPEN' ? 'bg-blue-100 text-blue-800' : 
                        ticket.status === 'PENDING' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {ticket.status}
                      </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-brand hover:text-brand-hover text-xs font-bold">Reply / Resolve</button>
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
