"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter(); 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        router.push('/dashboard');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed', error);
      alert('Login error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      {/* Brand Logo / Header Area */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-charcoal">
          Go<span className="text-brand">Rush</span>
        </h1>
        <p className="text-sm font-medium text-charcoal-light mt-1 uppercase tracking-widest">
          Admin Operations Panel
        </p>
      </div>

      {/* Login Card */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-bold text-charcoal mb-6">
          Sign In
        </h2>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-charcoal-light mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              className="block w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors text-charcoal"
              placeholder="admin@gorush.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-charcoal-light mb-1">
              Password
            </label>
            <input
              type="password"
              required
              className="block w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors text-charcoal"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 rounded-lg shadow-md text-sm font-bold text-white bg-brand hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all transform hover:-translate-y-0.5"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
