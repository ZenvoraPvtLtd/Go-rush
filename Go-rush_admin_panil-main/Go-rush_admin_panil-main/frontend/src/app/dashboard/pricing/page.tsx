"use client";

import React, { useState } from 'react';

export default function PricingPage() {
  const [baseFare, setBaseFare] = useState("50");
  const [perKm, setPerKm] = useState("12");
  const [surge, setSurge] = useState("1.5");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Pricing & Zones</h1>
          <p className="text-charcoal-light">Configure base fares, per-km rates, and surge multipliers.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Pricing Config Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-charcoal mb-4">Global Pricing Rules (Mini)</h2>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Pricing Updated Successfully!"); }}>
            <div>
              <label className="block text-sm font-semibold text-charcoal-light mb-1">Base Fare (₹)</label>
              <input type="number" value={baseFare} onChange={(e) => setBaseFare(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-charcoal-light mb-1">Per Kilometer Rate (₹)</label>
              <input type="number" value={perKm} onChange={(e) => setPerKm(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-charcoal-light mb-1">Active Surge Multiplier</label>
              <input type="number" step="0.1" value={surge} onChange={(e) => setSurge(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand focus:outline-none" />
            </div>
            <button type="submit" className="mt-4 w-full bg-brand text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-hover transition-colors">
              Save Pricing Rules
            </button>
          </form>
        </div>

        {/* Zones List */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-charcoal mb-4">Active Zones</h2>
          <div className="space-y-3">
            {['Delhi NCR', 'Mumbai', 'Bangalore'].map((zone, i) => (
              <div key={i} className="flex justify-between items-center p-3 border border-gray-100 rounded-lg bg-gray-50">
                <span className="font-semibold text-charcoal">{zone}</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-bold">Active</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
