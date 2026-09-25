"use client";

import React from 'react';

export default function LiveMapPage() {
  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Live City Map</h1>
          <p className="text-charcoal-light">Real-time tracking of all active rides and online drivers.</p>
        </div>
        <div className="flex space-x-3">
          <div className="flex items-center space-x-2">
             <div className="w-3 h-3 bg-brand rounded-full"></div>
             <span className="text-sm font-semibold">Active Rides</span>
          </div>
          <div className="flex items-center space-x-2">
             <div className="w-3 h-3 bg-green-500 rounded-full"></div>
             <span className="text-sm font-semibold">Idle Drivers</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex-1 relative overflow-hidden flex items-center justify-center">
        {/* Placeholder for actual Map Integration (Google Maps / Mapbox) */}
        <div className="absolute inset-0 bg-gray-100 opacity-50 pointer-events-none"></div>
        
        <div className="z-10 text-center p-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200">
          <svg className="w-16 h-16 mx-auto mb-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          <h2 className="text-xl font-bold text-charcoal mb-2">Map Interface Simulated</h2>
          <p className="text-sm text-charcoal-light max-w-sm mx-auto">
            In production, this area will render a dynamic Leaflet or Google Maps instance plotting WebSockets data for vehicle locations.
          </p>
        </div>
      </div>
    </div>
  );
}
