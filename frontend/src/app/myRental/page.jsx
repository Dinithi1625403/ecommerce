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
    });

  const getStatusColor = (status) => {
    switch(status) {
      case "Active": return "bg-yellow-100 text-yellow-900";
      case "Returned": return "bg-yellow-50 text-black";
      case "Expired": return "bg-black text-yellow-400";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="mt-4 text-yellow-400">Loading your rentals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">My Rentals</h1>
          <p className="text-yellow-200">Manage and track all your rental items</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-yellow-400 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-black text-yellow-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-black">Active Rentals</p>
                <p className="text-2xl font-semibold text-black">
                  {rentals.filter(r => r.status === "Active").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-400 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-black text-yellow-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-black">Returned</p>
                <p className="text-2xl font-semibold text-black">
                  {rentals.filter(r => r.status === "Returned").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-400 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-black text-yellow-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-black">Total Spent</p>
                <p className="text-2xl font-semibold text-black">
                  ${rentals.reduce((sum, r) => sum + (r.totalCost || 0), 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-yellow-400 rounded-lg shadow mb-6">
          <div className="border-b border-black">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {["all", "active", "returned", "expired"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    filter === tab
                      ? "border-black text-black"
                      : "border-transparent text-gray-700 hover:text-black hover:border-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Rentals List */}
        {filteredRentals.length === 0 ? (
          <div className="bg-yellow-400 rounded-lg shadow p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-black">No rentals found</h3>
            <p className="mt-1 text-sm text-gray-700">
              {filter === "all" ? "You haven't rented anything yet." : `No ${filter} rentals.`}
            </p>
          </div>
        ) : (
          <div className="bg-yellow-400 rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-black">
                <thead className="bg-black">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">Item</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">Rental Period</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">Total Cost</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-yellow-400 divide-y divide-black">
                  {filteredRentals.map((rental) => (
                    <tr key={rental.id} className="hover:bg-yellow-300 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-black">{rental.itemName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-black text-yellow-400">
                          {rental.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                        <div>{new Date(rental.startDate).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-700">to {new Date(rental.endDate).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                        ${rental.totalCost}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(rental.status)}`}>
                          {rental.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {rental.status === "Active" && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleReturnRental(rental.id)}
                              className="text-black hover:text-yellow-400 px-3 py-1 border border-black rounded hover:bg-black transition-colors"
                            >
                              Return
                            </button>
                            <button
                              onClick={() => handleExtendRental(rental.id)}
                              className="text-black hover:text-yellow-400 px-3 py-1 border border-black rounded hover:bg-black transition-colors"
                            >
                              Extend
                            </button>
                          </div>
                        )}
                        {rental.status === "Returned" && (
                          <span className="text-black flex items-center">
                            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Completed
                          </span>
                        )}
                        {rental.status === "Expired" && (
                          <span className="text-black flex items-center">
                            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
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

