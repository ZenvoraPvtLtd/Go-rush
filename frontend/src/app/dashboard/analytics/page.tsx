"use client";

import React from 'react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Analytics & Reports</h1>
          <p className="text-charcoal-light">Key performance indicators, revenue graphs, and growth metrics.</p>
        </div>
        <button className="bg-charcoal hover:bg-black text-white px-4 py-2 rounded-lg font-semibold shadow-sm transition-colors">
          Download CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Revenue Chart Placeholder */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-charcoal mb-6">Revenue (Last 7 Days)</h2>
          <div className="h-48 flex items-end justify-between space-x-2">
            {/* Simulated Bar Chart using Tailwind */}
            <div className="w-full bg-brand/20 rounded-t-md relative group"><div className="absolute bottom-0 w-full bg-brand rounded-t-md transition-all h-[40%] group-hover:bg-brand-hover"></div></div>
            <div className="w-full bg-brand/20 rounded-t-md relative group"><div className="absolute bottom-0 w-full bg-brand rounded-t-md transition-all h-[55%] group-hover:bg-brand-hover"></div></div>
            <div className="w-full bg-brand/20 rounded-t-md relative group"><div className="absolute bottom-0 w-full bg-brand rounded-t-md transition-all h-[35%] group-hover:bg-brand-hover"></div></div>
            <div className="w-full bg-brand/20 rounded-t-md relative group"><div className="absolute bottom-0 w-full bg-brand rounded-t-md transition-all h-[80%] group-hover:bg-brand-hover"></div></div>
            <div className="w-full bg-brand/20 rounded-t-md relative group"><div className="absolute bottom-0 w-full bg-brand rounded-t-md transition-all h-[60%] group-hover:bg-brand-hover"></div></div>
            <div className="w-full bg-brand/20 rounded-t-md relative group"><div className="absolute bottom-0 w-full bg-brand rounded-t-md transition-all h-[90%] group-hover:bg-brand-hover"></div></div>
            <div className="w-full bg-brand/20 rounded-t-md relative group"><div className="absolute bottom-0 w-full bg-brand rounded-t-md transition-all h-[100%] group-hover:bg-brand-hover"></div></div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-charcoal-light font-bold">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        {/* User Growth Chart Placeholder */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-charcoal mb-6">New User Registrations</h2>
          <div className="h-48 flex items-end justify-between space-x-2">
            {/* Simulated Bar Chart using Tailwind */}
            <div className="w-full bg-blue-100 rounded-t-md relative group"><div className="absolute bottom-0 w-full bg-blue-500 rounded-t-md transition-all h-[20%] group-hover:bg-blue-600"></div></div>
            <div className="w-full bg-blue-100 rounded-t-md relative group"><div className="absolute bottom-0 w-full bg-blue-500 rounded-t-md transition-all h-[30%] group-hover:bg-blue-600"></div></div>
            <div className="w-full bg-blue-100 rounded-t-md relative group"><div className="absolute bottom-0 w-full bg-blue-500 rounded-t-md transition-all h-[25%] group-hover:bg-blue-600"></div></div>
            <div className="w-full bg-blue-100 rounded-t-md relative group"><div className="absolute bottom-0 w-full bg-blue-500 rounded-t-md transition-all h-[40%] group-hover:bg-blue-600"></div></div>
            <div className="w-full bg-blue-100 rounded-t-md relative group"><div className="absolute bottom-0 w-full bg-blue-500 rounded-t-md transition-all h-[55%] group-hover:bg-blue-600"></div></div>
            <div className="w-full bg-blue-100 rounded-t-md relative group"><div className="absolute bottom-0 w-full bg-blue-500 rounded-t-md transition-all h-[80%] group-hover:bg-blue-600"></div></div>
            <div className="w-full bg-blue-100 rounded-t-md relative group"><div className="absolute bottom-0 w-full bg-blue-500 rounded-t-md transition-all h-[75%] group-hover:bg-blue-600"></div></div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-charcoal-light font-bold">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

      </div>
    </div>
  );
}
