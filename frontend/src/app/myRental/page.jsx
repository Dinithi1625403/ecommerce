"use client";

import { useEffect, useState } from "react";

export default function MyRentalsPage() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("table");
  const [selectedRental, setSelectedRental] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [animateStats, setAnimateStats] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setAnimateStats(true);
    // Check for expiring rentals
    const expiringSoon = rentals.filter(r => {
      const daysLeft = Math.ceil((new Date(r.endDate) - new Date()) / (1000 * 60 * 60 * 24));
      return r.status === "Active" && daysLeft <= 3 && daysLeft > 0;
    });
    setNotifications(expiringSoon);
  }, [rentals]);

  useEffect(() => {
    const fetchMyRentals = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/my-rentals?userId=1", {
          cache: "no-store",
        });
        const data = await res.json();
        setRentals(data);
      } catch (err) {
        console.error("Error fetching my rentals:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyRentals();
  }, []);

  const handleReturnRental = async (rentalId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/rentals/return/${rentalId}`, {
        method: "POST",
      });
      const result = await res.json();
      alert(result.message || "Rental returned successfully!");
      setRentals((prev) => prev.map((r) =>
        r.id === rentalId ? { ...r, status: "Returned" } : r
      ));
    } catch (err) {
      console.error("Error returning rental:", err);
    }
  };

  const handleExtendRental = async (rentalId) => {
    const extraDays = prompt("Enter how many days to extend:");
    if (!extraDays) return;
    try {
      const res = await fetch(`http://localhost:5000/api/rentals/extend/${rentalId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ extraDays: parseInt(extraDays) }),
      });
      const result = await res.json();
      alert(result.message || "Rental extended!");
    } catch (err) {
      console.error("Error extending rental:", err);
    }
  };
  const filteredRentals = rentals
    .filter(rental => {
      const matchesFilter = filter === "all" ? true : rental.status.toLowerCase() === filter.toLowerCase();
      const matchesSearch = rental.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           rental.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case "newest": return new Date(b.startDate) - new Date(a.startDate);
        case "oldest": return new Date(a.startDate) - new Date(b.startDate);
        case "name": return a.itemName.localeCompare(b.itemName);
        case "cost": return b.totalCost - a.totalCost;
        default: return 0;
      }
    });  const getStatusColor = (status) => {
    switch(status) {
      case "Active": return "bg-gradient-to-r from-[#FFC72C] to-[#FFC72C]/80 text-black border border-[#FFC72C]/50";
      case "Returned": return "bg-gradient-to-r from-green-500 to-green-600 text-white border border-green-400/50";
      case "Expired": return "bg-gradient-to-r from-red-500 to-red-600 text-white border border-red-400/50";
      default: return "bg-gradient-to-r from-[#5C5C5C] to-[#292929] text-white border border-[#5C5C5C]/50";
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "Active":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case "Returned":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      case "Expired":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-[#292929] to-[#5C5C5C] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-[#5C5C5C] border-t-[#FFC72C] mx-auto shadow-lg"></div>
          <p className="mt-6 text-white text-xl font-semibold">Loading your rentals...</p>
          <p className="mt-2 text-[#5C5C5C]">Please wait while we fetch your data</p>
        </div>
      </div>
    );
  }return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#292929] to-[#5C5C5C] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-[#FFC72C] via-[#FFC72C] to-white bg-clip-text text-transparent mb-6 drop-shadow-lg">
            My Rentals
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto font-light">
            Manage and track all your rental items in one beautiful dashboard
          </p>
        </div>        {/* Notifications */}
        {notifications.length > 0 && (
          <div className="mb-8">
            <div className="bg-gradient-to-r from-[#FFC72C]/20 to-[#FFC72C]/30 border border-[#FFC72C]/40 rounded-2xl p-6 backdrop-blur-lg shadow-xl">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-[#FFC72C]/20">
                  <svg className="w-6 h-6 text-[#FFC72C]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-white font-medium ml-4 text-lg">
                  {notifications.length} rental{notifications.length > 1 ? 's' : ''} expiring soon!
                </p>
              </div>
            </div>
          </div>
        )}        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-br from-[#292929]/80 to-[#5C5C5C]/60 backdrop-blur-lg border border-[#FFC72C]/20 rounded-3xl p-8 hover:shadow-2xl hover:shadow-[#FFC72C]/10 transition-all duration-500 group hover:border-[#FFC72C]/40">
            <div className="flex items-center">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FFC72C] to-[#FFC72C]/80 shadow-xl group-hover:shadow-[#FFC72C]/30 transition-all duration-500 group-hover:scale-110">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-6">
                <p className="text-[#5C5C5C] text-sm font-semibold uppercase tracking-wider mb-1">Active Rentals</p>
                <p className={`text-5xl font-bold text-white transition-all duration-1000 ${animateStats ? 'transform scale-105' : ''}`}>
                  {rentals.filter(r => r.status === "Active").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#292929]/80 to-[#5C5C5C]/60 backdrop-blur-lg border border-[#FFC72C]/20 rounded-3xl p-8 hover:shadow-2xl hover:shadow-[#FFC72C]/10 transition-all duration-500 group hover:border-[#FFC72C]/40">
            <div className="flex items-center">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FFC72C] to-[#FFC72C]/80 shadow-xl group-hover:shadow-[#FFC72C]/30 transition-all duration-500 group-hover:scale-110">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-6">
                <p className="text-[#5C5C5C] text-sm font-semibold uppercase tracking-wider mb-1">Completed</p>
                <p className={`text-5xl font-bold text-white transition-all duration-1000 ${animateStats ? 'transform scale-105' : ''}`}>
                  {rentals.filter(r => r.status === "Returned").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#292929]/80 to-[#5C5C5C]/60 backdrop-blur-lg border border-[#FFC72C]/20 rounded-3xl p-8 hover:shadow-2xl hover:shadow-[#FFC72C]/10 transition-all duration-500 group hover:border-[#FFC72C]/40">
            <div className="flex items-center">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FFC72C] to-[#FFC72C]/80 shadow-xl group-hover:shadow-[#FFC72C]/30 transition-all duration-500 group-hover:scale-110">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-6">
                <p className="text-[#5C5C5C] text-sm font-semibold uppercase tracking-wider mb-1">Total Spent</p>
                <p className={`text-5xl font-bold text-white transition-all duration-1000 ${animateStats ? 'transform scale-105' : ''}`}>
                  ${rentals.reduce((sum, r) => sum + (r.totalCost || 0), 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>        {/* Search and Filter Controls */}
        <div className="bg-[#292929]/80 backdrop-blur-lg border border-[#5C5C5C]/50 rounded-3xl p-8 mb-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#5C5C5C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search rentals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-[#5C5C5C]/30 border border-[#5C5C5C]/50 rounded-2xl text-white placeholder-[#5C5C5C] focus:outline-none focus:ring-2 focus:ring-[#FFC72C]/50 focus:border-[#FFC72C] transition-all duration-300"
                />
              </div>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full py-4 px-4 bg-[#5C5C5C]/30 border border-[#5C5C5C]/50 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-[#FFC72C]/50 focus:border-[#FFC72C] transition-all duration-300"
              >
                <option value="newest">Sort: Newest</option>
                <option value="oldest">Sort: Oldest</option>
                <option value="name">Sort: Name</option>
                <option value="cost">Sort: Cost</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="flex rounded-2xl bg-[#5C5C5C]/30 border border-[#5C5C5C]/50 p-1">
              <button
                onClick={() => setViewMode("table")}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  viewMode === "table" 
                    ? "bg-[#FFC72C] text-black shadow-lg" 
                    : "text-[#5C5C5C] hover:text-white"
                }`}
              >
                Table
              </button>
              <button
                onClick={() => setViewMode("cards")}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  viewMode === "cards" 
                    ? "bg-[#FFC72C] text-black shadow-lg" 
                    : "text-[#5C5C5C] hover:text-white"
                }`}
              >
                Cards
              </button>
            </div>
          </div>
        </div>        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {["all", "active", "returned", "expired"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-8 py-4 rounded-2xl font-semibold text-sm capitalize transition-all duration-300 ${
                  filter === tab
                    ? "bg-gradient-to-r from-[#FFC72C] to-[#FFC72C] text-black shadow-lg shadow-[#FFC72C]/25 transform scale-105"
                    : "bg-[#292929]/60 text-[#5C5C5C] hover:text-white hover:bg-[#5C5C5C]/60 border border-[#5C5C5C]/30 hover:border-[#FFC72C]/30"
                }`}
              >
                {tab} 
                <span className="ml-2 text-xs opacity-75 bg-black/20 px-2 py-1 rounded-full">
                  {tab === "all" ? rentals.length : rentals.filter(r => r.status.toLowerCase() === tab).length}
                </span>
              </button>
            ))}
          </div>
        </div>        {/* Rentals List */}
        {filteredRentals.length === 0 ? (
          <div className="bg-gradient-to-br from-[#292929] to-[#5C5C5C] rounded-3xl shadow-2xl p-16 text-center border border-[#FFC72C]/20">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 p-4 rounded-full bg-[#FFC72C]/20">
                <svg className="w-full h-full text-[#FFC72C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No rentals found</h3>
              <p className="text-[#5C5C5C] text-lg">
                {filter === "all" ? "You haven't rented anything yet." : `No ${filter} rentals.`}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-[#292929] to-[#5C5C5C] rounded-3xl shadow-2xl overflow-hidden border border-[#FFC72C]/20">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#FFC72C]/20">
                <thead className="bg-black/50">
                  <tr>
                    <th className="px-8 py-6 text-left text-sm font-bold text-[#FFC72C] uppercase tracking-wider">Item</th>
                    <th className="px-8 py-6 text-left text-sm font-bold text-[#FFC72C] uppercase tracking-wider">Category</th>
                    <th className="px-8 py-6 text-left text-sm font-bold text-[#FFC72C] uppercase tracking-wider">Rental Period</th>
                    <th className="px-8 py-6 text-left text-sm font-bold text-[#FFC72C] uppercase tracking-wider">Total Cost</th>
                    <th className="px-8 py-6 text-left text-sm font-bold text-[#FFC72C] uppercase tracking-wider">Status</th>
                    <th className="px-8 py-6 text-left text-sm font-bold text-[#FFC72C] uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="backdrop-blur-sm divide-y divide-[#5C5C5C]/30">
                  {filteredRentals.map((rental) => (
                    <tr key={rental.id} className="hover:bg-[#FFC72C]/10 transition-all duration-300">
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="text-lg font-semibold text-white">{rental.itemName}</div>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <span className="px-3 py-2 inline-flex text-sm font-semibold rounded-xl bg-black/50 text-[#FFC72C] border border-[#FFC72C]/30">
                          {rental.category}
                        </span>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap text-sm text-white">
                        <div className="font-medium">{new Date(rental.startDate).toLocaleDateString()}</div>
                        <div className="text-[#5C5C5C]">to {new Date(rental.endDate).toLocaleDateString()}</div>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap text-lg font-bold text-[#FFC72C]">
                        ${rental.totalCost}
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <span className={`px-4 py-2 inline-flex text-sm font-bold rounded-xl ${getStatusColor(rental.status)}`}>
                          {rental.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap text-sm font-medium">
                        {rental.status === "Active" && (
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleReturnRental(rental.id)}
                              className="text-white hover:text-[#FFC72C] px-4 py-2 border border-[#5C5C5C] rounded-xl hover:bg-[#FFC72C]/10 hover:border-[#FFC72C] transition-all duration-300 font-semibold"
                            >
                              Return
                            </button>
                            <button
                              onClick={() => handleExtendRental(rental.id)}
                              className="text-white hover:text-[#FFC72C] px-4 py-2 border border-[#5C5C5C] rounded-xl hover:bg-[#FFC72C]/10 hover:border-[#FFC72C] transition-all duration-300 font-semibold"
                            >
                              Extend
                            </button>
                          </div>
                        )}
                        {rental.status === "Returned" && (
                          <span className="text-green-400 flex items-center font-semibold">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Completed
                          </span>
                        )}
                        {rental.status === "Expired" && (
                          <span className="text-red-400 flex items-center font-semibold">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            Overdue
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

