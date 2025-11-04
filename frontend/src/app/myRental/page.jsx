"use client";

import { useEffect, useState } from "react";

export default function MyRentalsPage() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's rentals
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

  if (loading) return <p>Loading your rentals...</p>;

  return (
    <div>
      <h1>My Rentals</h1>

      {rentals.length === 0 ? (
        <p>You haven’t rented anything yet.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Total Cost</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {rentals.map((rental) => (
              <tr key={rental.id}>
                <td>{rental.itemName}</td>
                <td>{rental.category}</td>
                <td>{new Date(rental.startDate).toLocaleDateString()}</td>
                <td>{new Date(rental.endDate).toLocaleDateString()}</td>
                <td>${rental.totalCost}</td>
                <td>{rental.status}</td>
                <td>
                  {rental.status === "Active" && (
                    <>
                      <button onClick={() => handleReturnRental(rental.id)}>Return</button>
                      <button onClick={() => handleExtendRental(rental.id)}>Extend</button>
                    </>
                  )}
                  {rental.status === "Returned" && <span>✅ Returned</span>}
                  {rental.status === "Expired" && <span>⚠️ Expired</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
