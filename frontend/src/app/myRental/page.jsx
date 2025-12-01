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
    });

  const getStatusColor = (status) => {
    switch(status) {
      case "Active": return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "Returned": return "bg-green-100 text-green-800 border border-green-200";
      case "Expired": return "bg-red-100 text-red-800 border border-red-200";
      default: return "bg-gray-800 text-white border border-gray-700";
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
      <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-neutral-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-neutral-700 border-t-indigo-400 mx-auto shadow-lg"></div>
          <p className="mt-6 text-white text-xl font-semibold">Loading your rentals...</p>
          <p className="mt-2 text-neutral-400">Please wait while we fetch your data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              My Rentals
            </h1>
            <p className="mt-2 text-neutral-400 max-w-2xl">
              Manage and track all your rental items in one modern, clean dashboard.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm text-neutral-400">Signed in as</p>
              <p className="text-white font-medium">user@example.com</p>
            </div>
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-md hover:scale-105 transform transition">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Rental
            </button>
          </div>
        </div>

        {notifications.length > 0 && (
          <div className="mb-8">
            <div className="bg-gradient-to-r from-yellow-800/6 to-yellow-700/6 border border-yellow-700/10 rounded-2xl p-4 backdrop-blur-sm shadow-sm flex items-center gap-4">
              <div className="p-3 rounded-xl bg-yellow-600/10">
                <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-white">{notifications.length} rental{notifications.length > 1 ? 's' : ''} expiring soon</p>
                <p className="text-xs text-neutral-400">Consider returning or extending them to avoid fees.</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 p-6 border border-neutral-800 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-indigo-700/10">
                <svg className="w-7 h-7 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-neutral-400 uppercase tracking-wide">Active Rentals</p>
                <p className={`text-3xl font-semibold text-white ${animateStats ? 'animate-pulse' : ''}`}>
                  {rentals.filter(r => r.status === "Active").length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 p-6 border border-neutral-800 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-600/10">
                <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-neutral-400 uppercase tracking-wide">Completed</p>
                <p className={`text-3xl font-semibold text-white ${animateStats ? 'animate-pulse' : ''}`}>
                  {rentals.filter(r => r.status === "Returned").length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 p-6 border border-neutral-800 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-violet-600/10">
                <svg className="w-7 h-7 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-neutral-400 uppercase tracking-wide">Total Spent</p>
                <p className={`text-3xl font-semibold text-white ${animateStats ? 'animate-pulse' : ''}`}>
                  ${rentals.reduce((sum, r) => sum + (r.totalCost || 0), 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-neutral-800/60 border border-neutral-800 rounded-2xl p-5 mb-8 backdrop-blur-sm flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 w-full">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search rentals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30 transition"
              />
            </div>
          </div>

          <div className="w-48">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full py-3 px-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500/30"
            >
              <option value="newest">Sort: Newest</option>
              <option value="oldest">Sort: Oldest</option>
              <option value="name">Sort: Name</option>
              <option value="cost">Sort: Cost</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("table")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${viewMode === "table" ? 'bg-neutral-900 text-white border border-neutral-700 shadow' : 'text-neutral-400 hover:text-white'}`}
            >
              Table
            </button>
            <button
              onClick={() => setViewMode("cards")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${viewMode === "cards" ? 'bg-neutral-900 text-white border border-neutral-700 shadow' : 'text-neutral-400 hover:text-white'}`}
            >
              Cards
            </button>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          {["all", "active", "returned", "expired"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${filter === tab ? 'bg-violet-600 text-white shadow' : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'}`}
            >
              {tab}
              <span className="ml-2 text-xs bg-neutral-900/40 px-2 py-0.5 rounded-full text-neutral-300">
                {tab === "all" ? rentals.length : rentals.filter(r => r.status.toLowerCase() === tab).length}
              </span>
            </button>
          ))}
        </div>

        {filteredRentals.length === 0 ? (
          <div className="rounded-2xl bg-neutral-800 p-12 text-center border border-neutral-800 shadow-sm">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 p-4 rounded-full bg-neutral-700/40 flex items-center justify-center">
                <svg className="w-8 h-8 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No rentals found</h3>
              <p className="text-neutral-400 text-lg">
                {filter === "all" ? "You haven't rented anything yet." : `No ${filter} rentals.`}
              </p>
            </div>
          </div>
        ) : viewMode === "cards" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRentals.map((rental) => (
              <div key={rental.id} className="bg-neutral-800 rounded-2xl p-5 border border-neutral-800 hover:shadow-lg transition transform hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-lg flex items-center justify-center bg-neutral-700/40">
                    <svg className="w-7 h-7 text-neutral-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h12M3 17h18" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-white">{rental.itemName}</h4>
                      <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(rental.status)}`}>
                        <span className="inline-flex items-center gap-2">
                          {getStatusIcon(rental.status)}
                          <span>{rental.status}</span>
                        </span>
                      </span>
                    </div>
                    <p className="mt-1 text-neutral-400 text-sm">{rental.category}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-sm text-neutral-400">
                        <div>{new Date(rental.startDate).toLocaleDateString()} → {new Date(rental.endDate).toLocaleDateString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-violet-400">${(rental.totalCost || 0).toFixed(2)}</div>
                        <div className="mt-2 flex gap-2">
                          {rental.status === "Active" && (
                            <>
                              <button onClick={() => handleExtendRental(rental.id)} className="px-3 py-1 text-sm rounded-lg bg-neutral-700 text-white hover:bg-neutral-600">Extend</button>
                              <button onClick={() => handleReturnRental(rental.id)} className="px-3 py-1 text-sm rounded-lg bg-violet-600 text-white hover:bg-violet-500">Return</button>
                            </>
                          )}
                          {rental.status === "Returned" && (
                            <div className="text-green-400 font-semibold text-sm">Completed</div>
                          )}
                          {rental.status === "Expired" && (
                            <div className="text-red-400 font-semibold text-sm">Overdue</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden border border-neutral-800 shadow-sm">
            <div className="w-full overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-800">
                <thead className="bg-neutral-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Item</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Period</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Cost</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-neutral-800 divide-y divide-neutral-700">
                  {filteredRentals.map((rental) => (
                    <tr key={rental.id} className="hover:bg-neutral-900/40 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">{rental.itemName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-neutral-300">{rental.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">
                        {new Date(rental.startDate).toLocaleDateString()} — {new Date(rental.endDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-violet-400">
                        ${Number(rental.totalCost || 0).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${getStatusColor(rental.status)}`}>
                          {getStatusIcon(rental.status)}
                          <span>{rental.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {rental.status === "Active" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleExtendRental(rental.id)}
                              className="px-3 py-1 rounded-md bg-neutral-700 text-white hover:bg-neutral-600"
                            >
                              Extend
                            </button>
                            <button
                              onClick={() => handleReturnRental(rental.id)}
                              className="px-3 py-1 rounded-md bg-violet-600 text-white hover:bg-violet-500"
                            >
                              Return
                            </button>
                          </div>
                        )}
                        {rental.status === "Returned" && (
                          <div className="text-green-400 font-semibold flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Completed
                          </div>
                        )}
                        {rental.status === "Expired" && (
                          <div className="text-red-400 font-semibold flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            Overdue
                          </div>
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
