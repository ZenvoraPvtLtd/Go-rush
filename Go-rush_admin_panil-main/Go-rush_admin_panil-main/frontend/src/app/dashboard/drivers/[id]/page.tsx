"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, Star, Car, Clock, ShieldCheck, CreditCard, Wallet, AlertTriangle 
} from 'lucide-react';

export default function DriverDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  // Mock Data since backend is not running
  const [driver, setDriver] = useState({
    id: id,
    name: "Isha Sharma",
    phone: "+91 9876543210",
    vehicle: "Swift Dzire (DL 1Z 1234)",
    kyc: "VERIFIED",
    status: "ONLINE",
    totalRides: 18,
    onlineTime: "6h 24m",
    avgRating: 4.8,
    totalEarnings: 23600,
    todaysEarnings: 12400,
    linkedBank: "HDFC Bank .... 4092",
    recentActivity: [
      { id: 1, type: 'TRIP', desc: 'Trip Completed', amount: '+ ₹320', time: '25m ago' },
      { id: 2, type: 'PAYOUT', desc: 'Instant Cash Out', amount: '- ₹5,000', time: '2h ago' },
      { id: 3, type: 'ALERT', desc: 'Rating Updated: 5 Stars', amount: '', time: '1d ago' },
    ]
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => router.back()}
          className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition"
        >
          <ArrowLeft size={20} className="text-charcoal" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-charcoal">{driver.name}</h1>
          <p className="text-charcoal-light">Driver ID: {driver.id}</p>
        </div>
        <div className="ml-auto flex gap-3">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 ${driver.kyc === 'VERIFIED' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <ShieldCheck size={16} />
            {driver.kyc}
          </span>
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-brand text-white">
            {driver.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main Stats Card */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
              <Car size={24} className="text-brand mb-2" />
              <span className="text-2xl font-bold text-charcoal">{driver.totalRides}</span>
              <span className="text-xs text-charcoal-light uppercase">Total Rides</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
              <Clock size={24} className="text-brand mb-2" />
              <span className="text-2xl font-bold text-charcoal">{driver.onlineTime}</span>
              <span className="text-xs text-charcoal-light uppercase">Online Time</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
              <Star size={24} className="text-brand mb-2" />
              <span className="text-2xl font-bold text-charcoal">{driver.avgRating}</span>
              <span className="text-xs text-charcoal-light uppercase">Avg Rating</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
              <Wallet size={24} className="text-brand mb-2" />
              <span className="text-2xl font-bold text-charcoal">₹{driver.totalEarnings}</span>
              <span className="text-xs text-charcoal-light uppercase">Earnings</span>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-charcoal mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {driver.recentActivity.map((act) => (
                <div key={act.id} className="flex justify-between items-center p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                  <div>
                    <p className="font-semibold text-charcoal">{act.desc}</p>
                    <p className="text-xs text-charcoal-light">{act.time}</p>
                  </div>
                  {act.amount && (
                    <span className={`font-bold ${act.amount.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {act.amount}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-6">
          <div className="bg-brand text-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold opacity-90 mb-1">Today's Earnings</h2>
            <p className="text-4xl font-extrabold mb-4">₹{driver.todaysEarnings}</p>
            <div className="text-sm bg-white/20 px-3 py-1 rounded-full inline-block">
              ↗ +12% vs yesterday
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-charcoal mb-4 flex items-center gap-2">
              <CreditCard size={20} className="text-brand" /> Bank & Payouts
            </h2>
            <p className="text-sm text-charcoal mb-1 font-semibold">Linked Bank Account</p>
            <p className="text-sm text-charcoal-light mb-4">{driver.linkedBank}</p>
            <button 
              onClick={() => router.push('/dashboard/payments')}
              className="w-full bg-charcoal hover:bg-black text-white py-2 rounded-lg font-semibold transition"
            >
              View Payout History
            </button>
          </div>

          <div className="bg-red-50 p-6 rounded-xl shadow-sm border border-red-100">
            <h2 className="text-lg font-bold text-red-600 mb-2 flex items-center gap-2">
              <AlertTriangle size={20} /> Safety Monitoring
            </h2>
            <p className="text-sm text-red-800 mb-4">No active SOS alerts for this driver.</p>
            <button 
              onClick={() => router.push('/dashboard/safety')}
              className="w-full bg-red-100 hover:bg-red-200 text-red-700 py-2 rounded-lg font-semibold transition"
            >
              Emergency Contacts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
