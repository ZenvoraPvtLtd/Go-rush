"use client";

import React, { useState } from 'react';
import { ShieldAlert, Siren, CheckCircle, Search, PhoneCall } from 'lucide-react';

// MOCK DATA for SOS Events
const sosEvents = [
  { id: "SOS-001", rideId: "R-9001", triggeredBy: "Driver (Rajesh) - App SOS Button", location: "Connaught Place", time: "2 mins ago", status: "CRITICAL" },
  { id: "SOS-002", rideId: "R-8290", triggeredBy: "Passenger (Rahul)", location: "Noida Sec 15", time: "15 mins ago", status: "INVESTIGATING" },
  { id: "SOS-003", rideId: "R-8289", triggeredBy: "Automatic (Deviation)", location: "Vasant Kunj", time: "1 hour ago", status: "RESOLVED" },
];

export default function SafetyPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-red-600 flex items-center gap-2">
            <ShieldAlert size={28} />
            Safety & SOS Console
          </h1>
          <p className="text-charcoal-light">High priority dashboard for handling driver and passenger emergency situations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded shadow-sm flex items-start gap-4">
           <Siren className="text-red-600 mt-1 animate-pulse" size={32} />
           <div>
             <h3 className="text-sm font-bold text-red-800 uppercase tracking-wider">Active Critical SOS</h3>
             <p className="text-3xl font-extrabold text-red-600 mt-1">1</p>
           </div>
        </div>
        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded shadow-sm flex items-start gap-4">
           <Search className="text-orange-500 mt-1" size={32} />
           <div>
             <h3 className="text-sm font-bold text-orange-800 uppercase tracking-wider">Under Investigation</h3>
             <p className="text-3xl font-extrabold text-orange-600 mt-1">1</p>
           </div>
        </div>
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded shadow-sm flex items-start gap-4">
           <CheckCircle className="text-green-500 mt-1" size={32} />
           <div>
             <h3 className="text-sm font-bold text-green-800 uppercase tracking-wider">Resolved Today</h3>
             <p className="text-3xl font-extrabold text-green-600 mt-1">4</p>
           </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-red-100">
        <h2 className="text-lg font-bold text-charcoal mb-4">Emergency Dispatch Queue</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">SOS ID & Ride</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">Trigger Source</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">Location & Time</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-charcoal-light uppercase tracking-wider">Emergency Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sosEvents.map((sos, index) => (
                <tr key={index} className={`transition-colors ${sos.status === 'CRITICAL' ? 'bg-red-50' : 'hover:bg-gray-50'}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-extrabold text-charcoal">{sos.id}</div>
                    <div className="text-sm text-brand font-semibold mt-1">{sos.rideId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-charcoal font-medium">
                    {sos.triggeredBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-charcoal">{sos.location}</div>
                    <div className="text-sm text-red-500 font-semibold">{sos.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                     <span className={`px-2 py-1 rounded-md text-xs font-bold flex w-max items-center gap-1 ${
                        sos.status === 'CRITICAL' ? 'bg-red-600 text-white animate-pulse' : 
                        sos.status === 'INVESTIGATING' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {sos.status}
                      </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {sos.status !== 'RESOLVED' && (
                      <>
                        <button className="text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-xs mr-2 shadow-sm font-bold inline-flex items-center gap-1"><PhoneCall size={14}/> Call Police</button>
                        <button className="text-charcoal bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 text-xs mr-2 font-bold inline-flex items-center gap-1"><CheckCircle size={14}/> Resolve</button>
                      </>
                    )}
                    <button className="text-brand hover:text-brand-hover text-xs font-bold mt-2 sm:mt-0">View Timeline</button>
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
