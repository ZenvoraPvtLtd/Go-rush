"use client";

import React, { useState } from 'react';
import { Bell, Send } from 'lucide-react';

// MOCK DATA for Admin Users (RBAC)
const adminUsers = [
  { name: "Super Admin", email: "admin@gorush.in", role: "SUPER_ADMIN", lastActive: "Just now" },
  { name: "Ops Team Lead", email: "ops@gorush.in", role: "OPS_MANAGER", lastActive: "2 hours ago" },
  { name: "Support Staff 1", email: "support1@gorush.in", role: "SUPPORT_AGENT", lastActive: "5 mins ago" },
];

export default function SettingsPage() {
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [pushEnabled, setPushEnabled] = useState({ trips: true, payments: true, ratings: true });

  const togglePush = (key: keyof typeof pushEnabled) => {
    setPushEnabled(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Settings & Platform Config</h1>
          <p className="text-charcoal-light">Manage system configurations, notifications, and team access.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* RBAC Table */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-charcoal">Team Access (RBAC)</h2>
            <button className="text-brand font-bold text-sm hover:underline">+ Invite Member</button>
          </div>
          
          <div className="overflow-x-auto flex-1">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">User</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">Role</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">Last Active</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-charcoal-light uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {adminUsers.map((user, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-bold text-charcoal">{user.name}</div>
                      <div className="text-sm text-charcoal-light">{user.email}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                       <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                          user.role === 'SUPER_ADMIN' ? 'bg-red-100 text-red-800' : 
                          user.role === 'OPS_MANAGER' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {user.role}
                        </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-charcoal-light">{user.lastActive}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-brand hover:text-brand-hover text-xs font-bold">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Notifications Hub */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <h2 className="text-lg font-bold text-charcoal mb-4 flex items-center gap-2"><Bell size={20}/> Push Notification Hub (Driver App)</h2>
            <div className="grid sm:grid-cols-3 gap-4">
               <div className="p-4 border border-gray-100 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-sm">Trip Alerts</span>
                    <button onClick={() => togglePush('trips')} className={`w-10 h-5 rounded-full transition-colors relative ${pushEnabled.trips ? 'bg-brand' : 'bg-gray-300'}`}>
                      <div className={`w-3 h-3 bg-white rounded-full absolute top-1 transition-all ${pushEnabled.trips ? 'left-6' : 'left-1'}`}></div>
                    </button>
                  </div>
                  <p className="text-xs text-charcoal-light">"New Ride Request Available", "Trip Completed"</p>
               </div>
               <div className="p-4 border border-gray-100 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-sm">Payment Alerts</span>
                    <button onClick={() => togglePush('payments')} className={`w-10 h-5 rounded-full transition-colors relative ${pushEnabled.payments ? 'bg-brand' : 'bg-gray-300'}`}>
                      <div className={`w-3 h-3 bg-white rounded-full absolute top-1 transition-all ${pushEnabled.payments ? 'left-6' : 'left-1'}`}></div>
                    </button>
                  </div>
                  <p className="text-xs text-charcoal-light">"Payout Received: ₹12,400 to HDFC Bank"</p>
               </div>
               <div className="p-4 border border-gray-100 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-sm">Rating Alerts</span>
                    <button onClick={() => togglePush('ratings')} className={`w-10 h-5 rounded-full transition-colors relative ${pushEnabled.ratings ? 'bg-brand' : 'bg-gray-300'}`}>
                      <div className={`w-3 h-3 bg-white rounded-full absolute top-1 transition-all ${pushEnabled.ratings ? 'left-6' : 'left-1'}`}></div>
                    </button>
                  </div>
                  <p className="text-xs text-charcoal-light">"Rating Updated: You received 5 Stars"</p>
               </div>
            </div>
            
            <div className="mt-4 p-4 bg-gray-50 rounded-lg flex items-center justify-between">
              <input type="text" placeholder="Type a custom broadcast message to all drivers..." className="flex-1 bg-transparent border-none focus:ring-0 text-sm p-0"/>
              <button className="bg-brand text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"><Send size={14}/> Broadcast</button>
            </div>
          </div>

        </div>

        {/* Security & Feature Flags */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-charcoal mb-4">Security Settings</h2>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-charcoal text-sm">Two-Factor Auth (MFA)</div>
                <div className="text-xs text-charcoal-light mt-1">Require MFA for all admin accounts.</div>
              </div>
              <button 
                onClick={() => setMfaEnabled(!mfaEnabled)} 
                className={`w-12 h-6 rounded-full transition-colors relative ${mfaEnabled ? 'bg-brand' : 'bg-gray-300'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${mfaEnabled ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-charcoal mb-4">Feature Flags</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-charcoal text-sm">New Driver App Beta</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-bold">ON</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-charcoal text-sm">Surge V2 Algorithm</span>
                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded font-bold">OFF</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
