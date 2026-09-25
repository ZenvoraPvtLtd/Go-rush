'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecentRidesTable from '../components/RecentRidesTable'; // 1. Ye nayi line humne add ki hai

export default function DashboardPage() {
  const [stats, setStats] = useState({ activeRides: 0, totalDrivers: 0, totalRevenue: 0, totalUsers: 0 });

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/admin/stats`)
      .then(res => setStats(res.data))
      .catch(console.error);
  }, []);

  // MOCK DATA merged with LIVE DATA
  const kpiData = [
    { title: "Total Active Rides", value: stats.activeRides.toString(), trend: "Live", status: "success" },
    { title: "Total Drivers", value: stats.totalDrivers.toString(), trend: "Live", status: "brand" },
    { title: "Total Revenue", value: `₹${stats.totalRevenue}`, trend: "Live", status: "success" },
    { title: "Total Users", value: stats.totalUsers.toString(), trend: "Live", status: "warning" }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-charcoal">Dashboard Overview</h1>
        <p className="text-charcoal-light">Real-time marketplace statistics and operations.</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
            <h3 className="text-sm font-semibold text-charcoal-light uppercase tracking-wider">
              {kpi.title}
            </h3>
            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-charcoal">
                {kpi.value}
              </span>
              <span className={`text-sm font-bold ${
                kpi.status === 'success' ? 'text-green-600' : 
                kpi.status === 'danger' ? 'text-red-500' : 'text-brand'
              }`}>
                {kpi.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Yahan humne Placeholder hata kar apna naya component daal diya */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
         <h3 className="text-lg font-bold text-charcoal mb-4">Live Operations Snapshot</h3>
         
         <RecentRidesTable />

      </div>
      
    </div>
  );
}
