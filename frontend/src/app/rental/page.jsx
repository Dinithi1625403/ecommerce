"use client";

import { useEffect, useState } from "react";
import "./rental.css";

export default function RentalPage() {
  const [rentals, setRentals] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const mockRentals = [
      {
        id: 1,
        title: "Cozy Apartment in Colombo",
        price: 25000,
        location: "Colombo 05",
        type: "property",
        rating: 4.5,
        reviews: 23,
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
      },
      {
        id: 2,
        title: "Luxury Car - BMW X5",
        price: 15000,
        location: "Kandy",
        type: "vehicle",
        rating: 4.8,
        reviews: 41,
        image:
          "https://images.unsplash.com/photo-1605559424843-9e4c3e91a22a?auto=format&fit=crop&w=800&q=60",
      },
      {
        id: 3,
        title: "Beachside Villa",
        price: 120000,
        location: "Galle",
        type: "property",
        rating: 4.9,
        reviews: 15,
        image:
          "https://images.unsplash.com/photo-1600585154200-1c0fbeebf2c1?auto=format&fit=crop&w=800&q=60",
      },
    ];
    setRentals(mockRentals);
  }, []);

  const filteredRentals = rentals.filter(
    (rental) =>
      (filter === "all" || rental.type === filter) &&
      rental.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="rental-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">Find Your Perfect Rental</h1>
        <p className="hero-subtitle">
          Discover amazing properties and vehicles across Sri Lanka
        </p>

        {/* Search Bar */}
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search rentals..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          <button
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === "property" ? "active" : ""}`}
            onClick={() => setFilter("property")}
          >
            Properties
          </button>
          <button
            className={`filter-btn ${filter === "vehicle" ? "active" : ""}`}
            onClick={() => setFilter("vehicle")}
          >
            Vehicles
          </button>
        </div>
      </div>

      {/* Rental Cards Grid */}
      <div className="rentals-grid">
        {filteredRentals.map((rental) => (
          <div key={rental.id} className="rental-card">
            <div className="card-image-wrapper">
              <img
                src={rental.image}
                alt={rental.title}
                className="card-image"
              />
              <span className="card-badge">{rental.type}</span>
            </div>

            <div className="card-content">
              <h3 className="card-title">{rental.title}</h3>
              
              <div className="card-location">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>{rental.location}</span>
              </div>

              <div className="card-rating">
                <span className="rating-stars">⭐ {rental.rating}</span>
                <span className="rating-reviews">({rental.reviews} reviews)</span>
              </div>

              <div className="card-footer">
                <div className="card-price">
                  <span className="price-amount">Rs. {rental.price.toLocaleString()}</span>
                  <span className="price-period">/day</span>
                </div>
                <button className="view-btn">
                  View Details
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRentals.length === 0 && (
        <div className="no-results">
          <p>No rentals found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}
