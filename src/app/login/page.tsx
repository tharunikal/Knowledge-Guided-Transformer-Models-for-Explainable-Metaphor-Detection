"use client";

import { useState, FormEvent } from "react";
import {useRouter} from "next/navigation";



export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setError("");
    router.push("/home");
    //alert("Login successful!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md px-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-gray-200/50 p-12 border border-gray-100/50 transition-all duration-500 hover:shadow-3xl hover:shadow-gray-300/30">
          {/* Logo/Title Area */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl mx-auto mb-5 flex items-center justify-center shadow-lg shadow-gray-900/20">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Welcome back</h1>
            <p className="text-gray-500 mt-2 text-sm font-light">Sign in to continue</p>
          </div>

          <div className="space-y-5">
            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className={`w-full px-5 py-4 bg-gray-50 border rounded-2xl text-gray-900 placeholder-gray-400 transition-all duration-300 focus:outline-none ${
                  emailFocused 
                    ? 'border-gray-900 bg-white shadow-lg shadow-gray-900/5 scale-[1.01]' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-white'
                }`}
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className={`w-full px-5 py-4 bg-gray-50 border rounded-2xl text-gray-900 placeholder-gray-400 transition-all duration-300 focus:outline-none ${
                  passwordFocused 
                    ? 'border-gray-900 bg-white shadow-lg shadow-gray-900/5 scale-[1.01]' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-white'
                }`}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 animate-in fade-in slide-in-from-top-1 duration-300">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleLogin}
              className="w-full bg-gray-900 text-white py-4 rounded-2xl font-semibold transition-all duration-300 hover:bg-gray-800 hover:shadow-xl hover:shadow-gray-900/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              Sign In
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <button className="text-gray-900 font-semibold hover:underline transition-all duration-200">
                Sign up
              </button>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <p className="text-center mt-8 text-xs text-gray-400">
          Protected by industry-standard encryption
        </p>
      </div>
    </div>
  );
}