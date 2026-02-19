"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle2, XCircle, Loader2 } from "lucide-react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const [formErrors, setFormErrors] = useState({});
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = "Full name is required";
    }

    if (!email) {
      errors.email = "Email is required";
    } else if (!validateEmail(email)) {
      errors.email = "Please enter a valid email";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (formErrors.name) {
      setFormErrors(prev => ({ ...prev, name: "" }));
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (formErrors.email) {
      setFormErrors(prev => ({ ...prev, email: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (formErrors.password) {
      setFormErrors(prev => ({ ...prev, password: "" }));
    }
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center p-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #000000 0%, #292929 50%, #5C5C5C 100%)' }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 blur-3xl animate-pulse" style={{ background: 'linear-gradient(45deg, #FFC72C, #FFFFFF)' }}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-15 blur-3xl animate-pulse delay-1000" style={{ background: 'linear-gradient(45deg, #FFC72C, #5C5C5C)' }}></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Main form container with glassmorphism */}
        <div className="backdrop-blur-xl border rounded-2xl shadow-2xl p-8 transform transition-all duration-700 hover:scale-[1.02]" style={{ backgroundColor: 'rgba(41, 41, 41, 0.8)', borderColor: 'rgba(255, 199, 44, 0.3)' }}>
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 shadow-lg" style={{ backgroundColor: '#FFC72C' }}>
              <User className="text-black" size={24} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p style={{ color: '#5C5C5C' }}>Join us and start your journey</p>
          </div>

          {/* Status messages */}
          {error && (
            <div className="mb-6 p-4 rounded-xl backdrop-blur-sm animate-shake" style={{ backgroundColor: 'rgba(255, 0, 0, 0.1)', border: '1px solid rgba(255, 0, 0, 0.3)' }}>
              <div className="flex items-center gap-3">
                <XCircle className="text-red-400 flex-shrink-0" size={20} />
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 rounded-xl backdrop-blur-sm animate-bounce" style={{ backgroundColor: 'rgba(255, 199, 44, 0.2)', border: '1px solid #FFC72C' }}>
              <div className="flex items-center gap-3">
                <CheckCircle2 style={{ color: '#FFC72C' }} className="flex-shrink-0" size={20} />
                <p className="text-white text-sm">{success}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>

            {/* Name field */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white"
              >
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User
                    className="transition-colors duration-200"
                    style={{ color: nameFocused ? '#FFC72C' : '#5C5C5C' }}
                    size={20}
                  />
                </div>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-white transition-all duration-200 focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: 'rgba(92, 92, 92, 0.2)',
                    border: formErrors.name
                      ? '1px solid red'
                      : '1px solid rgba(92, 92, 92, 0.5)',
                    '::placeholder': { color: '#5C5C5C' }
                  }}
                  onFocus={(e) => {
                    setNameFocused(true);
                    e.target.style.borderColor = '#FFC72C';
                    e.target.style.boxShadow = '0 0 0 2px rgba(255, 199, 44, 0.2)';
                  }}
                  onBlur={(e) => {
                    setNameFocused(false);
                    e.target.style.borderColor = formErrors.name ? 'red' : 'rgba(92, 92, 92, 0.5)';
                    e.target.style.boxShadow = 'none';
                  }}
                  value={name}
                  onChange={handleNameChange}
                  required
                  aria-describedby={formErrors.name ? "name-error" : undefined}
                />
              </div>
              {formErrors.name && (
                <p id="name-error" className="text-red-400 text-xs mt-1 animate-slideDown">
                  {formErrors.name}
                </p>
              )}
            </div>

            {/* Email field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail
                    className="transition-colors duration-200"
                    style={{ color: emailFocused ? '#FFC72C' : '#5C5C5C' }}
                    size={20}
                  />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-white transition-all duration-200 focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: 'rgba(92, 92, 92, 0.2)',
                    border: formErrors.email
                      ? '1px solid red'
                      : '1px solid rgba(92, 92, 92, 0.5)',
                    '::placeholder': { color: '#5C5C5C' }
                  }}
                  onFocus={(e) => {
                    setEmailFocused(true);
                    e.target.style.borderColor = '#FFC72C';
                    e.target.style.boxShadow = '0 0 0 2px rgba(255, 199, 44, 0.2)';
                  }}
                  onBlur={(e) => {
                    setEmailFocused(false);
                    e.target.style.borderColor = formErrors.email ? 'red' : 'rgba(92, 92, 92, 0.5)';
                    e.target.style.boxShadow = 'none';
                  }}
                  value={email}
                  onChange={handleEmailChange}
                  required
                  aria-describedby={formErrors.email ? "email-error" : undefined}
                />
              </div>
              {formErrors.email && (
                <p id="email-error" className="text-red-400 text-xs mt-1 animate-slideDown">
                  {formErrors.email}
                </p>
              )}
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock
                    className="transition-colors duration-200"
                    style={{ color: passwordFocused ? '#FFC72C' : '#5C5C5C' }}
                    size={20}
                  />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className="w-full pl-10 pr-12 py-3 rounded-xl text-white transition-all duration-200 focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: 'rgba(92, 92, 92, 0.2)',
                    border: formErrors.password
                      ? '1px solid red'
                      : '1px solid rgba(92, 92, 92, 0.5)',
                    '::placeholder': { color: '#5C5C5C' }
                  }}
                  onFocus={(e) => {
                    setPasswordFocused(true);
                    e.target.style.borderColor = '#FFC72C';
                    e.target.style.boxShadow = '0 0 0 2px rgba(255, 199, 44, 0.2)';
                  }}
                  onBlur={(e) => {
                    setPasswordFocused(false);
                    e.target.style.borderColor = formErrors.password ? 'red' : 'rgba(92, 92, 92, 0.5)';
                    e.target.style.boxShadow = 'none';
                  }}
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  aria-describedby={formErrors.password ? "password-error" : undefined}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center rounded-r-xl transition-colors duration-200"
                  style={{ ':hover': { backgroundColor: 'rgba(92, 92, 92, 0.2)' } }}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(92, 92, 92, 0.2)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  {showPassword ? (
                    <EyeOff className="transition-colors" style={{ color: '#5C5C5C' }} size={20} />
                  ) : (
                    <Eye className="transition-colors" style={{ color: '#5C5C5C' }} size={20} />
                  )}
                </button>
              </div>
              {formErrors.password && (
                <p id="password-error" className="text-red-400 text-xs mt-1 animate-slideDown">
                  {formErrors.password}
                </p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative overflow-hidden font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg disabled:hover:scale-100 disabled:hover:shadow-none group"
              style={{
                backgroundColor: isLoading ? '#5C5C5C' : '#FFC72C',
                color: '#000000',
                boxShadow: isLoading ? 'none' : '0 4px 15px rgba(255, 199, 44, 0.3)'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.target.style.backgroundColor = '#e6b428';
                  e.target.style.boxShadow = '0 6px 20px rgba(255, 199, 44, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.target.style.backgroundColor = '#FFC72C';
                  e.target.style.boxShadow = '0 4px 15px rgba(255, 199, 44, 0.3)';
                }
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight
                      className="group-hover:translate-x-1 transition-transform duration-200"
                      size={20}
                    />
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-white text-sm">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium transition-colors duration-200 hover:underline"
                style={{ color: '#FFC72C' }}
                onMouseEnter={(e) => e.target.style.color = '#e6b428'}
                onMouseLeave={(e) => e.target.style.color = '#FFC72C'}
              >
                Sign In
              </a>
            </p>
          </div>
        </div>

        {/* Additional decorative elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 rounded-tl-lg" style={{ borderColor: 'rgba(255, 199, 44, 0.5)' }}></div>
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 rounded-br-lg" style={{ borderColor: 'rgba(255, 199, 44, 0.5)' }}></div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
