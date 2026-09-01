import Link from 'next/link'; // 1. Yahan humne Link import kiya

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode; 
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      
      {/* 1. Left Sidebar Area */}
      <aside className="w-64 bg-charcoal text-white hidden md:flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-charcoal-light">
          <h1 className="text-2xl font-extrabold tracking-tight">
            Go<span className="text-brand">Rush</span>
          </h1>
        </div>
        
        {/* 2. Navigation Links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          
          <Link href="/dashboard" className="block p-3 hover:bg-charcoal-light rounded-lg font-semibold cursor-pointer transition-colors">
            Dashboard
          </Link>
          
          <Link href="/dashboard/map" className="block p-3 hover:bg-charcoal-light rounded-lg cursor-pointer transition-colors text-sm">
            Live City Map
          </Link>

          <Link href="/dashboard/drivers" className="block p-3 hover:bg-charcoal-light rounded-lg cursor-pointer transition-colors text-sm">
            Drivers
          </Link>

          <Link href="/dashboard/customers" className="block p-3 hover:bg-charcoal-light rounded-lg cursor-pointer transition-colors text-sm">
            Customers
          </Link>

          <Link href="/dashboard/vehicles" className="block p-3 hover:bg-charcoal-light rounded-lg cursor-pointer transition-colors text-sm">
            Vehicles
          </Link>
          
          <Link href="/dashboard/rides" className="block p-3 hover:bg-charcoal-light rounded-lg cursor-pointer transition-colors text-sm">
            Rides & Operations
          </Link>

          <Link href="/dashboard/pricing" className="block p-3 hover:bg-charcoal-light rounded-lg cursor-pointer transition-colors text-sm">
            Pricing & Zones
          </Link>

          <Link href="/dashboard/payments" className="block p-3 hover:bg-charcoal-light rounded-lg cursor-pointer transition-colors text-sm">
            Payments & Refunds
          </Link>

          <Link href="/dashboard/support" className="block p-3 hover:bg-charcoal-light rounded-lg cursor-pointer transition-colors text-sm">
            Support Tickets
          </Link>

          <Link href="/dashboard/safety" className="block p-3 text-red-400 hover:bg-charcoal-light rounded-lg cursor-pointer transition-colors text-sm font-semibold">
            Safety (SOS)
          </Link>

          <Link href="/dashboard/fraud" className="block p-3 hover:bg-charcoal-light rounded-lg cursor-pointer transition-colors text-sm">
            Fraud & Risk
          </Link>

          <Link href="/dashboard/analytics" className="block p-3 hover:bg-charcoal-light rounded-lg cursor-pointer transition-colors text-sm">
            Analytics
          </Link>

          <Link href="/dashboard/settings" className="block p-3 hover:bg-charcoal-light rounded-lg cursor-pointer transition-colors text-sm">
            Settings & RBAC
          </Link>
          
        </nav>
      </aside>

      {/* 2. Right Content Area (Topbar + Main Page) */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 justify-between shadow-sm">
          <div className="text-lg font-semibold text-charcoal">
            Overview
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-charcoal-light">Admin User</span>
            <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>

        {/* Main Page Content (children) */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children} 
        </main>

      </div>
    </div>
  );
}
