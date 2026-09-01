import React from 'react';
import RecentRidesTable from '../components/RecentRidesTable'; // 1. Ye nayi line humne add ki hai

// MOCK DATA 
const kpiData = [
  { title: "Total Active Rides", value: "142", trend: "+12%", status: "success" },
  { title: "Online Drivers", value: "89", trend: "-3%", status: "danger" },
  { title: "Today's Revenue", value: "₹45,200", trend: "+8%", status: "success" },
  { title: "Pending KYC", value: "12", trend: "Needs Review", status: "warning" }
];

export default function DashboardPage() {
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
