"use client";

import React, { useState } from 'react';

// MOCK DATA for Customers
const customersList = [
  { id: "C-901", name: "Ananya Pandey", phone: "+91 9123456780", rides: 24, rating: 4.8, status: "ACTIVE" },
  { id: "C-902", name: "Rajat Kapoor", phone: "+91 9123456781", rides: 5, rating: 3.5, status: "ACTIVE" },
  { id: "C-903", name: "Sneha Reddy", phone: "+91 9123456782", rides: 0, rating: 0, status: "NEW" },
  { id: "C-904", name: "Mohit Jain", phone: "+91 9123456783", rides: 12, rating: 1.2, status: "SUSPENDED" },
];

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customersList.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Customer Management</h1>
          <p className="text-charcoal-light">View riders, their ride history, and account status.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        
        {/* Search */}
        <div className="mb-6 flex">
          <input 
            type="text" 
            placeholder="Search by customer name or phone..." 
            className="flex-1 max-w-md px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Customers Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">Customer Info</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">Total Rides</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">Avg Rating</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-charcoal-light uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-charcoal">{customer.name}</div>
                    <div className="text-sm text-charcoal-light">{customer.phone} • {customer.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-charcoal font-medium">{customer.rides}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-yellow-500">
                    {customer.rating > 0 ? `★ ${customer.rating}` : 'No ratings'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                     <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                        customer.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 
                        customer.status === 'NEW' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {customer.status}
                      </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-brand hover:text-brand-hover">View Profile</button>
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
