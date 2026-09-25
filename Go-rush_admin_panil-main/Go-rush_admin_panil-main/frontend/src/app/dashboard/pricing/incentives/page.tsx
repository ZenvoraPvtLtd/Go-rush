"use client";

import React, { useState } from 'react';
import { Trophy, Target, Gift, Plus } from 'lucide-react';

const mockIncentives = [
  { id: 1, title: "Weekly Quest", type: "TRIP_TARGET", target: 15, reward: 1000, active: true, progress: 120, totalEligible: 300 },
  { id: 2, title: "Weekend Warrior", type: "TRIP_TARGET", target: 25, reward: 2500, active: false, progress: 0, totalEligible: 150 },
  { id: 3, title: "Early Bird", type: "TIME_BASED", target: 5, reward: 500, active: true, progress: 45, totalEligible: 200 },
];

export default function IncentivesPage() {
  const [incentives, setIncentives] = useState(mockIncentives);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Driver Incentives & Quests</h1>
          <p className="text-charcoal-light">Manage weekly quests and performance bonuses to motivate drivers.</p>
        </div>
        <button className="bg-brand hover:bg-brand-hover text-white px-4 py-2 rounded-lg font-semibold shadow-sm transition-colors flex items-center gap-2">
          <Plus size={18} /> Add New Quest
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {incentives.map((incentive) => (
          <div key={incentive.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-2 h-full ${incentive.active ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-lg ${incentive.active ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-500'}`}>
                <Trophy size={24} />
              </div>
              <div>
                <h3 className="font-bold text-charcoal text-lg">{incentive.title}</h3>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${incentive.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  {incentive.active ? 'ACTIVE' : 'INACTIVE'}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-6 flex-1">
              <div className="flex justify-between items-center text-sm">
                <span className="text-charcoal-light flex items-center gap-2"><Target size={16} /> Target</span>
                <span className="font-semibold">{incentive.target} {incentive.type === 'TRIP_TARGET' ? 'Trips' : 'Trips (Time window)'}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-charcoal-light flex items-center gap-2"><Gift size={16} /> Reward</span>
                <span className="font-bold text-green-600">₹{incentive.reward}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs text-charcoal-light mb-2">Drivers completed: {incentive.progress} / {incentive.totalEligible}</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-brand h-2 rounded-full" style={{ width: `${(incentive.progress / incentive.totalEligible) * 100}%` }}></div>
              </div>
              <button className="mt-4 w-full text-sm font-semibold text-charcoal border border-gray-200 rounded-lg py-2 hover:bg-gray-50 transition">
                Manage Quest
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
