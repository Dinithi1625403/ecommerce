"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Loader2,
  User2,
} from "lucide-react";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, error: "", ok: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState("");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  const validators = {
    name: (v) => (v ? "" : "Full name is required"),
    email: (v) =>
      !v ? "Email is required" : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Please enter a valid email",
    password: (v) => (!v ? "Password is required" : v.length < 6 ? "Password must be at least 6 characters" : ""),
  };

  const validateAll = () => {
    const next = Object.fromEntries(Object.keys(form).map((k) => [k, validators[k](form[k])]));
    setErrors(next);
    return !Object.values(next).some(Boolean);
  };

  const handleChange = (k) => (e) => {
    setForm((s) => ({ ...s, [k]: e.target.value }));
    if (errors[k]) setErrors((s) => ({ ...s, [k]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;
    setStatus({ loading: true, error: "", ok: "" });
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");
      setStatus({ loading: false, error: "", ok: "Account created — redirecting..." });
      setTimeout(() => router.push("/login"), 1500);
    } catch (err) {
      setStatus({ loading: false, error: err.message || "Signup failed", ok: "" });
    }
  };

  if (!mounted) return null;

  return (
    <><div className="page">
      <div className="bg-orbs" aria-hidden />
      <div className="card">
        <div className="head">
          <div className="logo">
            <User2 size={22} />
          </div>
          <h1>Create Account</h1>
          <p className="muted">Join us and start your journey</p>
        </div>

        {status.error && (
          <div className="status error">
            <XCircle size={18} />
            <span>{status.error}</span>
          </div>
        )}
        {status.ok && (
          <div className="status success">
            <CheckCircle2 size={18} />
            <span>{status.ok}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <Field
            id="name"
            label="Full Name"
            icon={<User2 size={18} color={focused === "name" ? undefined : undefined} />}
            value={form.name}
            focused={focused === "name"}
            error={errors.name}
            onFocus={() => setFocused("name")}
            onBlur={() => setFocused("")}
            onChange={handleChange("name")}
            placeholder="Enter your full name" />
          <Field
            id="email"
            label="Email Address"
            icon={<Mail size={18} />}
            value={form.email}
            focused={focused === "email"}
            error={errors.email}
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused("")}
            onChange={handleChange("email")}
            placeholder="Enter your email"
            type="email" />

          <div className="field">
            <label htmlFor="password">Password</label>
            <div className={`input ${errors.password ? "err" : ""} ${focused === "password" ? "focus" : ""}`}>
              <div className="left-icon">
                <Lock size={18} />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={form.password}
                onChange={handleChange("password")}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused("")}
                aria-describedby={errors.password ? "password-err" : undefined}
                required />
              <button
                type="button"
                className="show-btn"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p id="password-err" className="err-text">
                {errors.password}
              </p>
            )}
          </div>

          <button className="submit" type="submit" disabled={status.loading}>
            {status.loading ? (
              <>
                <Loader2 className="spin" size={16} />
                Creating Account...
              </>
            ) : (
              <>
                Create Account <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
        <div className="footer">
          <p>
            Already have an account? <Link href="/login">Sign In</Link>
          </p>
          <p className="tiny">
            By creating an account you agree to our <a href="#">Terms</a> and <a href="#">Privacy</a>.
          </p>
        </div>
      </div>
    </div><style jsx>{`
        :root {
          --bg1: #000;
          --bg2: #292929;
          --card: rgba(41,41,41,0.8);
          --accent: #FFC72C;
          --muted: #5C5C5C;
        }
        .page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: linear-gradient(135deg, var(--bg1) 0%, var(--bg2) 50%, #5C5C5C 100%);
          position: relative;
          overflow: hidden;
        }
        .bg-orbs {
          position: absolute;
          inset: 0;
        }
        .bg-orbs::before,
        .bg-orbs::after {
          content: "";
          position: absolute;
          width: 320px;
          height: 320px;
          border-radius: 999px;
          filter: blur(40px);
          opacity: 0.15;
          animation: pulse 6s infinite;
        }
        .bg-orbs::before {
          top: -80px;
          right: -80px;
          background: linear-gradient(45deg, var(--accent), #fff);
        }
        .bg-orbs::after {
          bottom: -80px;
          left: -80px;
          background: linear-gradient(45deg, var(--accent), #5C5C5C);
          opacity: 0.12;
        }
        @keyframes pulse { 0%,100%{transform:scale(1)}50%{transform:scale(1.05)} }

        .card {
          width: 100%;
          max-width: 420px;
          padding: 28px;
          border-radius: 16px;
          background: var(--card);
          border: 1px solid rgba(255,199,44,0.12);
          box-shadow: 0 10px 30px rgba(0,0,0,0.6);
          backdrop-filter: blur(8px);
          position: relative;
          z-index: 2;
        }
        .head { text-align: center; margin-bottom: 18px; }
        .logo {
          width:56px;height:56px;border-radius:999px;background:var(--accent);display:inline-flex;align-items:center;justify-content:center;margin:0 auto 8px;
        }
        h1 { color: #fff; margin: 0 0 6px; font-size: 22px; }
        .muted { color: var(--muted); font-size: 13px; margin: 0; }

        .status { display:flex; gap:8px; align-items:center; padding:10px 12px; border-radius:10px; margin-bottom:12px; font-size:13px; }
        .status.error { background: rgba(255,0,0,0.08); border:1px solid rgba(255,0,0,0.18); color:#ffcccc; animation: shake .5s; }
        .status.success { background: rgba(255,199,44,0.12); border:1px solid rgba(255,199,44,0.3); color: #fff; }

        form { display: grid; gap:14px; }

        .field { display:flex; flex-direction:column; gap:6px; }
        label { color:#fff; font-size:13px; }

        .input { display:flex; align-items:center; background: rgba(92,92,92,0.14); border-radius:12px; padding:8px 10px; gap:8px; border:1px solid rgba(92,92,92,0.5); transition: box-shadow .15s, border-color .15s; }
        .input.focus { box-shadow: 0 0 0 4px rgba(255,199,44,0.08); border-color: var(--accent); }
        .input.err { border-color: #f87171; }
        .left-icon { color: var(--muted); display:flex; align-items:center; justify-content:center; width:30px; flex-shrink:0; }
        input { background: transparent; border: none; outline: none; color:#fff; width:100%; padding:8px 6px; font-size:14px; }
        .show-btn { background:transparent; border:none; color:var(--muted); cursor:pointer; padding:6px; display:flex; align-items:center; }
        .err-text { color:#fb7185; font-size:12px; margin-top:4px; }

        .submit {
          display:flex; align-items:center; justify-content:center; gap:8px;
          background: var(--accent); color:#000; font-weight:600; padding:12px; border-radius:12px; border:none; cursor:pointer;
          box-shadow: 0 8px 24px rgba(255,199,44,0.18); transition: transform .15s, box-shadow .15s, background .15s;
        }
        .submit:disabled { opacity:0.9; cursor:not-allowed; transform:none; box-shadow:none; background:#5C5C5C; color:#000; }
        .submit:hover:not(:disabled){ transform: translateY(-2px); box-shadow: 0 12px 34px rgba(255,199,44,0.24); }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes shake { 0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)} }

        .footer { text-align:center; margin-top:12px; color:#fff; font-size:13px; }
        .footer a { color: var(--accent); text-decoration:none; }
        .tiny { font-size:11px; color: #9ca3af; margin-top:8px; }

        /* small */
        @media (max-width:420px){ .card{padding:20px} }
      `}</style></>
  );
}

function Field({ id, label, icon, value, onChange, onFocus, onBlur, placeholder, focused, error, type = "text" }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className={`input ${error ? "err" : ""} ${focused ? "focus" : ""}`}>
        <div className="left-icon">{icon}</div>
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          aria-describedby={error ? `${id}-err` : undefined}
          required
        />
      </div>
      {error && (
        <p id={`${id}-err`} className="err-text">
          {error}
        </p>
      )}
    </div>
  );
}
