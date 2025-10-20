"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");  const router = useRouter();

  const validateToken = async (token) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.ok;
    } catch (error) {
      console.error("Token validation error:", error);
      return false;
    }
  };
  useEffect(() => {
  const checkAuth = async () => {
    if (typeof window === "undefined") return;

    // wait 100ms to make sure login page has stored values
    await new Promise((resolve) => setTimeout(resolve, 100));

    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    console.log("🔑 Token from localStorage:", token);
    console.log("👤 User from localStorage:", userData);

    if (!token || !userData) {
      console.log("No user data or token found → redirecting");
      router.push("/login");
      return;
    }

    // check if token still valid with backend
    try {
      const response = await fetch("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        console.log("❌ Token invalid or expired → redirecting");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
        return;
      }

      const profile = await response.json();
      console.log("✅ Profile verified:", profile);

      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setName(parsedUser.name);
      setPhone(parsedUser.phone || "");
    } catch (error) {
      console.error("⚠️ Error validating token:", error);
      router.push("/login");
    }
  };

  checkAuth();
}, [router]);


  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");      const response = await fetch(
        `http://localhost:5000/api/users/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, phone }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        setMessage("Profile updated successfully!");
      } else {
        setMessage(data.message || "Error updating profile");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6 mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">My Profile</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-gray-700 font-medium">Role</label>
          <input
            type="text"
            value={user.role}
            disabled
            className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-700 font-medium">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-blue-500"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>

      {message && (
        <p
          className={`text-center mt-4 font-medium ${
            message.includes("success") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
