import React from 'react';

// MOCK DATA for Recent Rides
const recentRides = [
  { id: "R-8291", customer: "Rahul Sharma", driver: "Amit Kumar", status: "IN_PROGRESS", amount: "₹180" },
  { id: "R-8290", customer: "Priya Singh", driver: "Rajesh (Searching)", status: "SEARCHING", amount: "Est. ₹250" },
  { id: "R-8289", customer: "Vikram G.", driver: "Suresh P.", status: "COMPLETED", amount: "₹320" },
  { id: "R-8288", customer: "Neha M.", driver: "Unassigned", status: "CANCELLED", amount: "₹0" },
];

export default function RecentRidesTable() {
  // Helper function: Status ke hisaab se CSS classes return karna
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800';
      case 'SEARCHING': return 'bg-yellow-100 text-yellow-800';
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">Ride ID</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">Customer</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">Driver</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-light uppercase tracking-wider">Amount</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {recentRides.map((ride, index) => (
            <tr key={index} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brand">{ride.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-charcoal">{ride.customer}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-charcoal">{ride.driver}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${getStatusBadge(ride.status)}`}>
                  {ride.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-charcoal">{ride.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
