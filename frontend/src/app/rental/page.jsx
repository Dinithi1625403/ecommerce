"use client";

import { useEffect, useState } from "react";

export default function RentalPage() {
  const [rentals, setRentals] = useState([]);

  // temporary mock data — later you'll fetch from backend
  useEffect(() => {
    const mockRentals = [
      {
        id: 1,
        title: "Cozy Apartment in Colombo",
        price: 25000,
        location: "Colombo 05",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
      },
      {
        id: 2,
        title: "Luxury Car - BMW X5",
        price: 15000,
        location: "Kandy",
        image:
          "https://images.unsplash.com/photo-1605559424843-9e4c3e91a22a?auto=format&fit=crop&w=800&q=60",
      },
      {
        id: 3,
        title: "Beachside Villa",
        price: 120000,
        location: "Galle",
        image:
          "https://images.unsplash.com/photo-1600585154200-1c0fbeebf2c1?auto=format&fit=crop&w=800&q=60",
      },
    ];
    setRentals(mockRentals);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Available Rentals</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {rentals.map((rental) => (
          <div
            key={rental.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              overflow: "hidden",
              padding: "10px",
            }}
          >
            <img
              src={rental.image}
              alt={rental.title}
              style={{ width: "100%", height: "180px", objectFit: "cover" }}
            />
            <h3>{rental.title}</h3>
            <p>{rental.location}</p>
            <p>Rs. {rental.price.toLocaleString()}</p>
            <button
              style={{
                backgroundColor: "#FFC72C",
                border: "none",
                padding: "8px 12px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
