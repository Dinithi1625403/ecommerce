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
    <div className="rental-container" style={{ backgroundColor: '#F8F9FA', minHeight: '100vh' }}>
      {/* Hero Section */}
      <div className="hero-section" style={{ 
        backgroundColor: '#292929', 
        padding: '80px 20px', 
        background: 'linear-gradient(135deg, #292929 0%, #1a1a1a 100%)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <h1 className="hero-title" style={{ 
          color: '#FFC72C', 
          fontSize: '3rem', 
          marginBottom: '20px',
          fontWeight: '800',
          textAlign: 'center',
          letterSpacing: '-0.5px'
        }}>
          Find Your Perfect Rental
        </h1>
        <p className="hero-subtitle" style={{ 
          color: '#E0E0E0', 
          fontSize: '1.2rem', 
          marginBottom: '40px',
          textAlign: 'center',
          maxWidth: '600px',
          margin: '0 auto 40px'
        }}>
          Discover amazing properties and vehicles across Sri Lanka
        </p>        {/* Search Bar */}
        <div className="search-wrapper" style={{ position: 'relative', maxWidth: '600px', margin: '0 auto 30px' }}>
          <input
            type="text"
            placeholder="Search rentals..."
            className="search-input"
            style={{
              width: '100%',
              padding: '18px 50px 18px 20px',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              backgroundColor: '#FFFFFF',
              color: '#000000',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              transition: 'box-shadow 0.3s, transform 0.3s',
              outline: 'none'
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={(e) => e.target.style.boxShadow = '0 6px 20px rgba(255,199,44,0.3)'}
            onBlur={(e) => e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)'}
          />
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5C5C5C" strokeWidth="2" style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)' }}>
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs" style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
            style={{
              padding: '12px 30px',
              border: '2px solid #FFC72C',
              borderRadius: '25px',
              fontSize: '16px',
              cursor: 'pointer',
              backgroundColor: filter === "all" ? '#FFC72C' : '#292929',
              color: filter === "all" ? '#000000' : '#FFFFFF',
              fontWeight: '600',
              transition: 'all 0.3s'
            }}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === "property" ? "active" : ""}`}
            onClick={() => setFilter("property")}
            style={{
              padding: '12px 30px',
              border: '2px solid #FFC72C',
              borderRadius: '25px',
              fontSize: '16px',
              cursor: 'pointer',
              backgroundColor: filter === "property" ? '#FFC72C' : '#292929',
              color: filter === "property" ? '#000000' : '#FFFFFF',
              fontWeight: '600',
              transition: 'all 0.3s'
            }}
          >
            Properties
          </button>
          <button
            className={`filter-btn ${filter === "vehicle" ? "active" : ""}`}
            onClick={() => setFilter("vehicle")}
            style={{
              padding: '12px 30px',
              border: '2px solid #FFC72C',
              borderRadius: '25px',
              fontSize: '16px',
              cursor: 'pointer',
              backgroundColor: filter === "vehicle" ? '#FFC72C' : '#292929',
              color: filter === "vehicle" ? '#000000' : '#FFFFFF',
              fontWeight: '600',
              transition: 'all 0.3s'
            }}
          >
            Vehicles
          </button>
        </div>
      </div>      {/* Rental Cards Grid */}
      <div className="rentals-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px', padding: '50px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        {filteredRentals.map((rental) => (
          <div 
            key={rental.id} 
            className="rental-card" 
            style={{ 
              backgroundColor: '#FFFFFF', 
              borderRadius: '16px', 
              overflow: 'hidden', 
              transition: 'transform 0.3s, box-shadow 0.3s',
              boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(255,199,44,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 15px rgba(0,0,0,0.08)';
            }}
          >
            <div className="card-image-wrapper" style={{ position: 'relative', overflow: 'hidden' }}>
              <img
                src={rental.image}
                alt={rental.title}
                className="card-image"
                style={{ width: '100%', height: '220px', objectFit: 'cover', transition: 'transform 0.3s' }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              />
              <span className="card-badge" style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: '#FFC72C', color: '#000000', padding: '8px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '700', textTransform: 'capitalize', boxShadow: '0 2px 10px rgba(0,0,0,0.15)' }}>
                {rental.type}
              </span>
            </div>

            <div className="card-content" style={{ padding: '20px' }}>
              <h3 className="card-title" style={{ color: '#292929', fontSize: '1.3rem', marginBottom: '12px', fontWeight: '700' }}>
                {rental.title}
              </h3>
                <div className="card-location" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#5C5C5C', marginBottom: '12px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5C5C5C" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>{rental.location}</span>
              </div>

              <div className="card-rating" style={{ display: 'flex', gap: '10px', marginBottom: '15px', color: '#5C5C5C' }}>
                <span className="rating-stars" style={{ color: '#FFC72C', fontWeight: '600' }}>⭐ {rental.rating}</span>
                <span className="rating-reviews">({rental.reviews} reviews)</span>
              </div>              <div className="card-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '15px', borderTop: '1px solid #E0E0E0' }}>
                <div className="card-price">
                  <span className="price-amount" style={{ color: '#292929', fontSize: '1.4rem', fontWeight: '700' }}>
                    Rs. {rental.price.toLocaleString()}
                  </span>
                  <span className="price-period" style={{ color: '#5C5C5C', fontSize: '0.9rem' }}>/day</span>
                </div>
                <button 
                  className="view-btn" 
                  style={{ backgroundColor: '#FFC72C', color: '#000000', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', transition: 'all 0.3s' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFD700';
                    e.currentTarget.style.transform = 'translateX(3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFC72C';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  View Details
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRentals.length === 0 && (
        <div className="no-results" style={{ textAlign: 'center', padding: '60px 20px', color: '#5C5C5C', fontSize: '1.2rem' }}>
          <p>No rentals found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}
