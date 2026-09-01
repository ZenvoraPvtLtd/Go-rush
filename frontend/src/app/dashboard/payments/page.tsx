"use client";

import React, { useState } from 'react';

// MOCK DATA for Payments
const paymentsList = [
  { txnId: "TXN-001", rideId: "R-9001", method: "UPI", amount: "₹450", status: "SUCCESS", date: "2023-10-25 14:30" },
  { txnId: "TXN-002", rideId: "R-9002", method: "Credit Card", amount: "₹250", status: "PENDING", date: "2023-10-25 14:15" },
  { txnId: "TXN-003", rideId: "R-9003", method: "Wallet", amount: "₹320", status: "FAILED", date: "2023-10-25 13:45" },
  { txnId: "TXN-004", rideId: "R-9004", method: "Cash", amount: "₹0", status: "REFUNDED", date: "2023-10-25 12:00" },
];

export default function PaymentsPage() {
  const [filter, setFilter] = useState("All");

  const filteredPayments = paymentsList.filter(payment => filter === "All" || payment.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Payments & Refunds</h1>
          <p className="text-charcoal-light">Reconcile transactions, issue refunds, and monitor provider health.</p>
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
            <option value="All">All Transactions</option>
            <option value="SUCCESS">Success</option>
            <option value="PENDING">Pending</option>
            <option value="FAILED">Failed</option>
            <option value="REFUNDED">Refunded</option>
          </select>
        </div>

        {/* Payments Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">Transaction Info</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">Ride ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-charcoal-light uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayments.map((payment, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-extrabold text-charcoal">{payment.txnId}</div>
                    <div className="text-sm text-charcoal-light mt-1">{payment.method} • {payment.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-brand font-medium">{payment.rideId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-charcoal">{payment.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                     <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                        payment.status === 'SUCCESS' ? 'bg-green-100 text-green-800' : 
                        payment.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                        payment.status === 'REFUNDED' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {payment.status}
                      </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {payment.status === 'SUCCESS' && (
                      <button className="text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-xs mr-2">Initiate Refund</button>
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
