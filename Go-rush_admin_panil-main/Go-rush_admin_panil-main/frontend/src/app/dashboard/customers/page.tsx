"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [customersList, setCustomersList] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/admin/users`)
      .then(res => {
        const formatted = res.data.map((u: any) => ({
          id: u.id,
          name: u.name,
          phone: u.phone,
          rides: Math.floor(Math.random() * 20), // Mocked for now
          rating: 4.5, // Mocked for now
          status: 'ACTIVE'
        }));
        setCustomersList(formatted);
      })
      .catch(console.error);
  }, []);

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
