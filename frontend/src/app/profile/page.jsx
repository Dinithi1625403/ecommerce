"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  PencilIcon, 
  HomeIcon, 
  MapPinIcon, 
  PhoneIcon, 
  UserIcon, 
  CalendarIcon, 
  EyeIcon, 
  HeartIcon, 
  CogIcon,
  StarIcon,
  ShieldCheckIcon,
  BellIcon,
  KeyIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("profile");
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalViews: 0,
    totalBookings: 0,
    totalRevenue: 0,
    rating: 4.8
  });
  const router = useRouter();

  const fetchUserProperties = async (token, userId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/properties/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setProperties(data);
        setStats({
          totalProperties: data.length,
          totalViews: data.reduce((sum, prop) => sum + (prop.views || 0), 0),
          totalBookings: data.reduce((sum, prop) => sum + (prop.bookings || 0), 0),
          totalRevenue: data.reduce((sum, prop) => sum + (prop.revenue || 0), 0)
        });
      }
    } catch (err) {
      console.error("Error fetching properties:", err);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (typeof window === "undefined") return;

      await new Promise((resolve) => setTimeout(resolve, 100));
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      if (!token || !userData) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.push("/login");
          return;
        }

        const profile = await response.json();
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setName(parsedUser.name);
        setPhone(parsedUser.phone || "");
        setAddress(parsedUser.address || "");
        setProfilePic(parsedUser.profilePic || null);

        if (parsedUser.role === "Owner") {
          fetchUserProperties(token, parsedUser._id);
        }
      } catch (error) {
        console.error("Error validating token:", error);
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
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("address", address);
      if (profilePic instanceof File) formData.append("profilePic", profilePic);

      const response = await fetch(`http://localhost:5000/api/users/${user._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

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
  if (!user) return (
    <div className="min-h-screen bg-gradient-to-br from-[#292929] via-[#3a3a3a] to-[#1a1a1a] flex items-center justify-center p-4">
      <div className="bg-[#292929]/90 backdrop-blur-xl p-12 rounded-3xl shadow-2xl border border-[#FFC72C]/20 max-w-md w-full text-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#5C5C5C] border-t-[#FFC72C] mx-auto mb-6"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FFC72C]/10 to-[#FFC72C]/5 animate-pulse"></div>
        </div>
        <p className="text-lg font-medium text-white">Loading your rental profile...</p>
        <p className="text-sm text-[#5C5C5C] mt-2">Setting up your dashboard</p>
      </div>
    </div>
  );
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#292929] via-[#1f1f1f] to-[#000000]">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FFC72C] rounded-full mix-blend-soft-light filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FFC72C] rounded-full mix-blend-soft-light filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-[#5C5C5C] rounded-full mix-blend-soft-light filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header Card */}
        <div className="bg-[#292929]/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden mb-8 border border-[#FFC72C]/20 hover:border-[#FFC72C]/40 transition-all duration-300">
          {/* Gradient Header */}
          <div className="relative bg-gradient-to-r from-[#292929] via-[#3a3a3a] to-[#292929] px-8 py-8 overflow-hidden border-b border-[#FFC72C]/20">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFC72C]/5 via-[#FFC72C]/10 to-[#FFC72C]/5"></div>
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFC72C]/20 to-transparent animate-shimmer"></div>
            </div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#FFC72C]/30 to-[#FFC72C]/10 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse-slow"></div>
                  {profilePic && !(profilePic instanceof File) ? (
                    <img 
                      src={profilePic} 
                      alt="Profile" 
                      className="relative w-28 h-28 rounded-full border-4 border-[#FFC72C]/50 shadow-2xl object-cover ring-4 ring-[#FFC72C]/20 group-hover:ring-[#FFC72C]/40 transition-all duration-300 group-hover:scale-105" 
                    />
                  ) : (
                    <div className="relative w-28 h-28 rounded-full border-4 border-[#FFC72C]/50 shadow-2xl bg-gradient-to-br from-[#5C5C5C] to-[#292929] flex items-center justify-center ring-4 ring-[#FFC72C]/20 group-hover:ring-[#FFC72C]/40 transition-all duration-300 group-hover:scale-105">
                      <UserIcon className="w-16 h-16 text-[#FFC72C]" />
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 bg-[#FFC72C] w-7 h-7 rounded-full border-3 border-[#292929] shadow-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-[#292929] rounded-full animate-ping"></div>
                    <div className="absolute w-2 h-2 bg-[#FFC72C] rounded-full"></div>
                  </div>
                </div>
                <div className="text-white">
                  <div className="flex items-center space-x-3 mb-1">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-[#FFC72C] bg-clip-text text-transparent">{user.name}</h1>
                    <div className="flex items-center bg-[#FFC72C]/20 backdrop-blur-sm px-3 py-1 rounded-full border border-[#FFC72C]/30 hover:bg-[#FFC72C]/30 transition-all duration-300">
                      <ShieldCheckIcon className="w-4 h-4 mr-1 text-[#FFC72C]" />
                      <span className="text-xs font-medium uppercase tracking-wide text-[#FFC72C]">{user.role}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-[#5C5C5C]">
                    <div className="flex items-center space-x-1 group hover:scale-105 transition-transform duration-200">
                      {[1,2,3,4].map((i) => (
                        <StarIconSolid key={i} className="w-5 h-5 text-[#FFC72C] fill-[#FFC72C] group-hover:animate-pulse" />
                      ))}
                      <StarIcon className="w-5 h-5 text-[#FFC72C]" />
                      <span className="text-sm font-medium text-white ml-1">4.8</span>
                    </div>
                    <div className="flex items-center space-x-1 hover:text-[#FFC72C] transition-colors duration-200">
                      <CalendarIcon className="w-4 h-4" />
                      <span className="text-sm">Since {new Date(user.createdAt || Date.now()).getFullYear()}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button className="p-3 bg-[#FFC72C]/10 backdrop-blur-sm rounded-2xl hover:bg-[#FFC72C]/20 transition-all duration-200 hover:scale-110 border border-[#FFC72C]/30 group">
                <PencilIcon className="w-6 h-6 text-[#FFC72C] group-hover:rotate-12 transition-transform duration-200" />
              </button>
            </div>
          </div>          {/* Enhanced Stats Row */}
          {user.role === "Owner" && (
            <div className="px-8 py-6 bg-gradient-to-r from-[#292929]/80 to-[#1f1f1f]/80 backdrop-blur-sm border-b border-[#FFC72C]/10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: HomeIcon, label: "Properties", value: stats.totalProperties, color: "from-[#FFC72C] to-[#FFD700]", bgColor: "bg-[#FFC72C]/10" },
                  { icon: EyeIcon, label: "Total Views", value: stats.totalViews.toLocaleString(), color: "from-[#FFC72C] to-[#FFB700]", bgColor: "bg-[#FFC72C]/10" },
                  { icon: BuildingOfficeIcon, label: "Bookings", value: stats.totalBookings, color: "from-[#FFC72C] to-[#FFA500]", bgColor: "bg-[#FFC72C]/10" },
                  { icon: CurrencyDollarIcon, label: "Revenue", value: `$${stats.totalRevenue.toLocaleString()}`, color: "from-[#FFC72C] to-[#FF9500]", bgColor: "bg-[#FFC72C]/10" }
                ].map((stat, index) => (
                  <div key={index} className="group relative overflow-hidden rounded-2xl p-6 bg-[#292929]/60 backdrop-blur-sm border border-[#FFC72C]/20 hover:border-[#FFC72C]/50 hover:shadow-lg hover:shadow-[#FFC72C]/20 transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FFC72C]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#FFC72C]/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex flex-col items-center text-center">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 bg-gradient-to-r ${stat.color} shadow-lg shadow-[#FFC72C]/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                        <stat.icon className="w-7 h-7 text-[#292929]" />
                      </div>
                      <p className="text-3xl font-bold bg-gradient-to-r from-white to-[#FFC72C] bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform duration-300">{stat.value}</p>
                      <p className="text-sm text-[#5C5C5C] font-medium group-hover:text-[#FFC72C] transition-colors duration-300">{stat.label}</p>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${stat.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </div>
                ))}
              </div>
            </div>
          )}          {/* Modern Tab Navigation */}
          <div className="px-8 py-6 bg-[#292929]/60 backdrop-blur-sm border-t border-[#FFC72C]/10">
            <div className="border-b border-[#5C5C5C]/30">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: "profile", label: "Profile", icon: UserIcon },
                  ...(user.role === "Owner" ? [{ id: "properties", label: "Properties", icon: HomeIcon }] : []),
                  { id: "settings", label: "Settings", icon: CogIcon }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`group inline-flex items-center px-1 py-4 border-b-2 font-medium text-sm transition-all duration-200 relative overflow-hidden ${
                      activeTab === tab.id
                        ? "border-[#FFC72C] text-[#FFC72C]"
                        : "border-transparent text-[#5C5C5C] hover:text-white hover:border-[#5C5C5C]"
                    }`}
                  >
                    <tab.icon className={`w-5 h-5 mr-2 transition-transform duration-200 ${activeTab === tab.id ? 'scale-110' : ''}`} />
                    {tab.label}
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFC72C] to-[#FFD700] animate-pulse"></div>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="bg-[#292929]/90 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-[#FFC72C]/20">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Profile Information</h2>
                  <p className="text-[#5C5C5C]">Update your rental profile to attract more tenants</p>
                </div>
                <div className="flex items-center space-x-2 bg-[#FFC72C]/10 px-4 py-2 rounded-2xl border border-[#FFC72C]/30">
                  <KeyIcon className="w-5 h-5 text-[#FFC72C]" />
                  <span className="text-sm font-medium text-[#FFC72C]">Verified Landlord</span>
                </div>
              </div>

              <form onSubmit={handleUpdate} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Profile Picture Section */}
                <div className="lg:col-span-2 space-y-4">
                  <label className="block text-sm font-semibold text-white mb-2">Profile Picture</label>
                  <div className="relative">
                    <div className="flex items-center justify-center w-32 h-32 bg-gradient-to-br from-[#5C5C5C] to-[#292929] rounded-2xl border-2 border-dashed border-[#FFC72C]/30 mx-auto overflow-hidden group hover:border-[#FFC72C] transition-colors cursor-pointer">
                      {profilePic && !(profilePic instanceof File) ? (
                        <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-center p-4">
                          <UserIcon className="w-12 h-12 text-[#FFC72C] mb-2 group-hover:scale-110 transition-transform" />
                          <p className="text-sm text-[#5C5C5C] group-hover:text-[#FFC72C] transition-colors">Upload photo</p>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setProfilePic(e.target.files[0])}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                    <p className="text-center text-xs text-[#5C5C5C] mt-2">PNG, JPG up to 10MB. Professional photos work best!</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Full Name</label>
                    <div className="relative">
                      <UserIcon className="w-5 h-5 text-[#5C5C5C] absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-[#FFC72C]" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-[#292929]/50 backdrop-blur-sm border border-[#5C5C5C]/30 rounded-2xl focus:ring-2 focus:ring-[#FFC72C]/50 focus:border-[#FFC72C] transition-all duration-200 placeholder-[#5C5C5C] text-white"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Phone Number</label>
                    <div className="relative">
                      <PhoneIcon className="w-5 h-5 text-[#5C5C5C] absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-[#292929]/50 backdrop-blur-sm border border-[#5C5C5C]/30 rounded-2xl focus:ring-2 focus:ring-[#FFC72C]/50 focus:border-[#FFC72C] transition-all duration-200 text-white placeholder-[#5C5C5C]"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Email Address</label>
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="w-full px-4 py-4 bg-[#1f1f1f]/70 backdrop-blur-sm border border-[#5C5C5C]/30 rounded-2xl text-[#5C5C5C] cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Account Type</label>
                    <div className="flex items-center px-4 py-4 bg-gradient-to-r from-[#FFC72C]/10 to-[#FFC72C]/5 rounded-2xl border border-[#FFC72C]/30">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#FFC72C] rounded-full animate-pulse"></div>
                        <span className="font-semibold text-[#FFC72C]">{user.role}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-white mb-2">Business Address</label>
                  <div className="relative">
                    <MapPinIcon className="w-5 h-5 text-[#5C5C5C] absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-[#292929]/50 backdrop-blur-sm border border-[#5C5C5C]/30 rounded-2xl focus:ring-2 focus:ring-[#FFC72C]/50 focus:border-[#FFC72C] transition-all duration-200 text-white placeholder-[#5C5C5C]"
                      placeholder="Enter your business address"
                    />
                  </div>
                  <p className="text-xs text-[#5C5C5C] mt-1">This will appear on your property listings</p>
                </div>

                {/* Submit Button */}
                <div className="lg:col-span-2 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full bg-gradient-to-r from-[#FFC72C] to-[#FFD700] text-[#292929] py-4 px-8 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-[#FFC72C]/50 transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-200 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FFC72C] transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                    <div className="relative flex items-center justify-center">
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#292929] mr-3"></div>
                          Saving changes...
                        </>
                      ) : (
                        <>
                          <PencilIcon className="w-5 h-5 mr-2" />
                          Update Profile
                        </>
                      )}
                    </div>
                  </button>
                </div>
              </form>

              {message && (
                <div className={`mt-6 p-4 rounded-2xl backdrop-blur-sm border ${
                  message.includes("success") 
                    ? "bg-[#FFC72C]/10 border-[#FFC72C]/30" 
                    : "bg-red-500/10 border-red-500/30"
                }`}>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      {message.includes("success") ? (
                        <svg className="h-6 w-6 text-[#FFC72C]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">{message}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}          {/* Properties Tab */}
          {activeTab === "properties" && user.role === "Owner" && (
            <div className="bg-[#292929]/90 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-[#FFC72C]/20">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-1">Your Properties</h2>
                  <p className="text-[#5C5C5C]">Manage your rental listings</p>
                </div>
                <button 
                  onClick={() => router.push('/add-property')}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#FFC72C] to-[#FFD700] text-[#292929] font-semibold rounded-2xl shadow-lg hover:shadow-[#FFC72C]/50 hover:-translate-y-0.5 transform transition-all duration-200 whitespace-nowrap"
                >
                  <HomeIcon className="w-5 h-5 mr-2" />
                  Add New Property
                </button>
              </div>

              {properties.length === 0 ? (
                <div className="text-center py-16">
                  <div className="mx-auto w-32 h-32 bg-gradient-to-br from-[#FFC72C]/20 to-[#FFC72C]/10 rounded-3xl flex items-center justify-center mb-8 shadow-lg border border-[#FFC72C]/30">
                    <HomeIcon className="w-16 h-16 text-[#FFC72C]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">No properties yet</h3>
                  <p className="text-[#5C5C5C] mb-8 max-w-md mx-auto">Get started by adding your first rental property to begin earning</p>
                  <button 
                    onClick={() => router.push('/add-property')}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FFC72C] to-[#FFD700] text-[#292929] font-semibold rounded-2xl shadow-xl hover:shadow-[#FFC72C]/50 hover:-translate-y-1 transform transition-all duration-200"
                  >
                    <HomeIcon className="w-5 h-5 mr-2" />
                    Add Your First Property
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {properties.map((property) => (
                    <div 
                      key={property._id} 
                      className="group relative bg-[#292929]/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-[#FFC72C]/30 transition-all duration-500 hover:-translate-y-2 border border-[#5C5C5C]/30 hover:border-[#FFC72C]/50"
                    >
                      {/* Property Image */}
                      {property.images && property.images[0] && (
                        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#5C5C5C] to-[#292929]">
                          <img 
                            src={property.images[0]} 
                            alt={property.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute top-4 right-4">
                            <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm ${
                              property.status === 'Available' 
                                ? 'bg-[#FFC72C]/90 text-[#292929]' 
                                : property.status === 'Rented'
                                ? 'bg-[#5C5C5C]/90 text-white'
                                : 'bg-[#000000]/90 text-white'
                            }`}>
                              {property.status}
                            </span>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-[#292929]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      )}

                      {/* Property Info */}
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-[#FFC72C] transition-colors">{property.title}</h3>
                        <div className="flex items-center text-sm text-[#5C5C5C] mb-4">
                          <MapPinIcon className="w-4 h-4 mr-1" />
                          <span className="truncate">{property.location}</span>
                        </div>
                        
                        {/* Price & Actions */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-2xl font-bold bg-gradient-to-r from-[#FFC72C] to-[#FFD700] bg-clip-text text-transparent">
                            ${property.price}
                            <span className="text-base font-normal text-[#5C5C5C]">/month</span>
                          </div>
                          
                          <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-150">
                            <button className="p-2 text-[#5C5C5C] hover:text-[#FFC72C] transition-colors rounded-xl hover:bg-[#FFC72C]/10">
                              <EyeIcon className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-[#5C5C5C] hover:text-red-500 transition-colors rounded-xl hover:bg-red-500/10">
                              <HeartIcon className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-[#5C5C5C] hover:text-white transition-colors rounded-xl hover:bg-[#5C5C5C]/30">
                              <PencilIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="flex items-center justify-between text-xs text-[#5C5C5C]">
                          <span>{property.views || 0} views</span>
                          <span>{property.bookings || 0} bookings</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="bg-[#292929]/90 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-[#FFC72C]/20">
              <h2 className="text-3xl font-bold text-white mb-2">Account Settings</h2>
              <p className="text-[#5C5C5C] mb-8">Manage your rental account preferences</p>
              
              <div className="space-y-8">
                {/* Security Section */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-8 bg-gradient-to-b from-[#FFC72C] to-[#FFD700] rounded-full"></div>
                    <h3 className="text-xl font-bold text-white">Security</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <button className="w-full text-left p-6 bg-[#292929]/60 backdrop-blur-sm rounded-2xl border border-[#5C5C5C]/30 hover:border-[#FFC72C]/50 hover:shadow-md hover:shadow-[#FFC72C]/10 transition-all duration-200 hover:-translate-y-0.5 group">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-[#FFC72C]/10 rounded-2xl group-hover:bg-[#FFC72C]/20 transition-colors">
                            <KeyIcon className="w-6 h-6 text-[#FFC72C]" />
                          </div>
                          <div>
                            <p className="font-semibold text-white">Change Password</p>
                            <p className="text-sm text-[#5C5C5C]">Update your account password for security</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-3 py-1 bg-[#FFC72C]/10 backdrop-blur-sm rounded-full text-sm font-medium text-[#FFC72C]">Secure</span>
                          <svg className="w-5 h-5 text-[#5C5C5C] group-hover:text-[#FFC72C] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </button>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button className="p-6 bg-[#292929]/60 backdrop-blur-sm rounded-2xl border border-[#5C5C5C]/30 hover:border-[#FFC72C]/50 hover:shadow-md hover:shadow-[#FFC72C]/10 transition-all duration-200 text-left group">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 bg-[#FFC72C]/10 rounded-2xl group-hover:bg-[#FFC72C]/20 transition-colors">
                              <ShieldCheckIcon className="w-6 h-6 text-[#FFC72C]" />
                            </div>
                            <div>
                              <p className="font-semibold text-white">Two-Factor Auth</p>
                              <p className="text-sm text-[#5C5C5C]">Extra security layer</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="relative w-11 h-6 bg-[#5C5C5C] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FFC72C]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFC72C]"></div>
                          </label>
                        </div>
                      </button>

                      <button className="p-6 bg-[#292929]/60 backdrop-blur-sm rounded-2xl border border-[#5C5C5C]/30 hover:border-[#FFC72C]/50 hover:shadow-md hover:shadow-[#FFC72C]/10 transition-all duration-200 text-left group">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 bg-[#FFC72C]/10 rounded-2xl group-hover:bg-[#FFC72C]/20 transition-colors">
                              <BellIcon className="w-6 h-6 text-[#FFC72C]" />
                            </div>
                            <div>
                              <p className="font-semibold text-white">Session Management</p>
                              <p className="text-sm text-[#5C5C5C]">Review active sessions</p>
                            </div>
                          </div>
                          <div className="w-2 h-2 bg-[#FFC72C] rounded-full animate-ping"></div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Notifications Section */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-8 bg-gradient-to-b from-[#FFC72C] to-[#FFD700] rounded-full"></div>
                    <h3 className="text-xl font-bold text-white">Notifications</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-6 bg-[#292929]/60 backdrop-blur-sm rounded-2xl border border-[#5C5C5C]/30 hover:border-[#FFC72C]/50 transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-[#FFC72C]/10 rounded-2xl">
                            <svg className="w-6 h-6 text-[#FFC72C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-semibold text-white">Email Notifications</p>
                            <p className="text-sm text-[#5C5C5C]">Booking confirmations, payment receipts</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="relative w-11 h-6 bg-[#5C5C5C] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FFC72C]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFC72C]"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-[#292929]/60 backdrop-blur-sm rounded-2xl border border-[#5C5C5C]/30 hover:border-[#FFC72C]/50 transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-[#FFC72C]/10 rounded-2xl">
                            <svg className="w-6 h-6 text-[#FFC72C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-semibold text-white">SMS Notifications</p>
                            <p className="text-sm text-[#5C5C5C]">Urgent updates and maintenance alerts</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="relative w-11 h-6 bg-[#5C5C5C] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FFC72C]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFC72C]"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="pt-8 border-t border-[#5C5C5C]/30">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-2 h-8 bg-gradient-to-b from-red-500 to-red-700 rounded-full"></div>
                    <h3 className="text-xl font-bold text-white">Danger Zone</h3>
                  </div>
                  
                  <div className="p-6 bg-red-500/10 backdrop-blur-sm rounded-2xl border border-red-500/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-red-400 text-lg">Delete Account</p>
                        <p className="text-sm text-red-300 mt-1">Permanently delete your account and all rental data. This cannot be undone.</p>
                      </div>
                      <button className="px-6 py-2 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes tilt {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(2deg); }
          75% { transform: rotate(-2deg); }
        }
        .animate-tilt {
          animation: tilt 10s ease-in-out infinite;
        }
        .animate-ping {
          animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
}