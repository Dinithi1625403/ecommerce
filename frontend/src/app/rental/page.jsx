"use client";

import { useEffect, useState } from "react";


export default function RentalPage() {
  const [rentals, setRentals] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRental, setSelectedRental] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleViewDetails = (rental) => {
    setSelectedRental(rental);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRental(null);
  };

  return (
    <div className="rental-container" style={{ backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      {/* Hero Section */}
      <div className="hero-section" style={{ 
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        padding: '100px 20px 80px', 
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255, 199, 44, 0.1)', filter: 'blur(60px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255, 199, 44, 0.08)', filter: 'blur(80px)' }}></div>
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
          <h1 className="hero-title" style={{ 
            color: '#FFFFFF', 
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
            marginBottom: '20px',
            fontWeight: '800',
            textAlign: 'center',
            letterSpacing: '-1px',
            textShadow: '0 4px 20px rgba(0,0,0,0.2)'
          }}>
            Find Your Perfect <span style={{ color: '#FFC72C' }}>Rental</span>
          </h1>
          <p className="hero-subtitle" style={{ 
            color: '#cbd5e1', 
            fontSize: '1.2rem', 
            textAlign: 'center',
            maxWidth: '650px',
            margin: '0 auto 50px',
            lineHeight: '1.6'
          }}>
            Discover amazing properties and vehicles across Sri Lanka with verified listings
          </p>

          {/* Search Bar */}
          <div className="search-wrapper" style={{ position: 'relative', maxWidth: '700px', margin: '0 auto 40px' }}>
            <input
              type="text"
              placeholder="Search for properties, vehicles, locations..."
              className="search-input"
              style={{
                width: '100%',
                padding: '20px 60px 20px 24px',
                border: '2px solid rgba(255, 199, 44, 0.2)',
                borderRadius: '16px',
                fontSize: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                color: '#1e293b',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = '#FFC72C';
                e.target.style.boxShadow = '0 15px 50px rgba(255,199,44,0.25)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 199, 44, 0.2)';
                e.target.style.boxShadow = '0 10px 40px rgba(0,0,0,0.1)';
                e.target.style.transform = 'translateY(0)';
              }}
            />
            <svg className="search-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" style={{ position: 'absolute', right: '24px', top: '50%', transform: 'translateY(-50%)' }}>
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </div>

          {/* Filter Tabs */}
          <div className="filter-tabs" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {['all', 'property', 'vehicle'].map((type) => (
              <button
                key={type}
                className={`filter-btn ${filter === type ? "active" : ""}`}
                onClick={() => setFilter(type)}
                style={{
                  padding: '14px 32px',
                  border: filter === type ? '2px solid #FFC72C' : '2px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '30px',
                  fontSize: '15px',
                  cursor: 'pointer',
                  backgroundColor: filter === type ? '#FFC72C' : 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  color: filter === type ? '#000000' : '#FFFFFF',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  textTransform: 'capitalize'
                }}
                onMouseEnter={(e) => {
                  if (filter !== type) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255, 199, 44, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (filter !== type) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                {type === 'all' ? 'All Rentals' : type === 'property' ? 'Properties' : 'Vehicles'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Rental Cards Grid */}
      <div className="rentals-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', 
        gap: '32px', 
        padding: '60px 20px', 
        maxWidth: '1280px', 
        margin: '0 auto' 
      }}>
        {filteredRentals.map((rental) => (
          <div 
            key={rental.id} 
            className="rental-card" 
            style={{ 
              backgroundColor: '#FFFFFF', 
              borderRadius: '20px', 
              overflow: 'hidden', 
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              cursor: 'pointer',
              border: '1px solid #e2e8f0'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-12px)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(255,199,44,0.15), 0 0 0 1px rgba(255,199,44,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
            }}
          >
            <div className="card-image-wrapper" style={{ position: 'relative', overflow: 'hidden', height: '240px' }}>
              <img
                src={rental.image}
                alt={rental.title}
                className="card-image"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)' }}></div>
              <span className="card-badge" style={{ 
                position: 'absolute', 
                top: '16px', 
                right: '16px', 
                backgroundColor: '#FFC72C', 
                color: '#000000', 
                padding: '8px 18px', 
                borderRadius: '25px', 
                fontSize: '13px', 
                fontWeight: '700', 
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                backdropFilter: 'blur(10px)'
              }}>
                {rental.type}
              </span>
            </div>

            <div className="card-content" style={{ padding: '24px' }}>
              <h3 className="card-title" style={{ 
                color: '#1e293b', 
                fontSize: '1.4rem', 
                marginBottom: '14px', 
                fontWeight: '700',
                lineHeight: '1.3'
              }}>
                {rental.title}
              </h3>

              <div className="card-location" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                color: '#64748b', 
                marginBottom: '16px',
                fontSize: '0.95rem'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFC72C" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span style={{ fontWeight: '500' }}>{rental.location}</span>
              </div>

              <div className="card-rating" style={{ 
                display: 'flex', 
                gap: '12px', 
                alignItems: 'center',
                marginBottom: '20px', 
                color: '#64748b',
                fontSize: '0.9rem'
              }}>
                <span className="rating-stars" style={{ 
                  color: '#FFC72C', 
                  fontWeight: '700',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  ⭐ {rental.rating}
                </span>
                <span className="rating-reviews" style={{ fontWeight: '500' }}>({rental.reviews} reviews)</span>
              </div>

              <div className="card-footer" style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                paddingTop: '20px', 
                borderTop: '2px solid #f1f5f9' 
              }}>
                <div className="card-price">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span className="price-amount" style={{ 
                      color: '#1e293b', 
                      fontSize: '1.6rem', 
                      fontWeight: '800',
                      letterSpacing: '-0.5px'
                    }}>
                      Rs. {rental.price.toLocaleString()}
                    </span>
                    <span className="price-period" style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: '500' }}>/day</span>
                  </div>
                </div>                <button 
                  className="view-btn" 
                  onClick={() => handleViewDetails(rental)}
                  style={{ 
                    backgroundColor: '#1e293b', 
                    color: '#FFFFFF', 
                    border: 'none', 
                    padding: '12px 24px', 
                    borderRadius: '12px', 
                    cursor: 'pointer', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    fontWeight: '600',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(30, 41, 59, 0.15)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFC72C';
                    e.currentTarget.style.color = '#000000';
                    e.currentTarget.style.transform = 'translateX(4px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 199, 44, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#1e293b';
                    e.currentTarget.style.color = '#FFFFFF';
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(30, 41, 59, 0.15)';
                  }}
                >
                  View Details
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRentals.length === 0 && (
        <div className="no-results" style={{ 
          textAlign: 'center', 
          padding: '80px 20px',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          <div style={{ 
            fontSize: '4rem', 
            marginBottom: '20px',
            opacity: '0.3'
          }}>🔍</div>
          <h3 style={{ 
            color: '#1e293b', 
            fontSize: '1.5rem', 
            fontWeight: '700',
            marginBottom: '12px'
          }}>No rentals found</h3>
          <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
            Try adjusting your filters or search terms          </p>
        </div>
      )}

      {/* Modal for Rental Details */}
      {showModal && selectedRental && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }} onClick={closeModal}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            maxWidth: '800px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative',
            boxShadow: '0 25px 100px rgba(0,0,0,0.3)'
          }} onClick={(e) => e.stopPropagation()}>
            
            {/* Close Button */}
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                color: '#1e293b',
                zIndex: 1001,
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FFC72C';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              ✕
            </button>

            {/* Modal Image */}
            <div style={{ position: 'relative', height: '300px', overflow: 'hidden', borderRadius: '24px 24px 0 0' }}>
              <img
                src={selectedRental.image}
                alt={selectedRental.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }}></div>
              <span style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                backgroundColor: '#FFC72C',
                color: '#000000',
                padding: '10px 20px',
                borderRadius: '30px',
                fontSize: '14px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {selectedRental.type}
              </span>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '40px' }}>
              <h2 style={{
                color: '#1e293b',
                fontSize: '2rem',
                fontWeight: '800',
                marginBottom: '16px',
                lineHeight: '1.2'
              }}>
                {selectedRental.title}
              </h2>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: '#64748b',
                marginBottom: '24px',
                fontSize: '1.1rem'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFC72C" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span style={{ fontWeight: '600' }}>{selectedRental.location}</span>
              </div>

              <div style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
                marginBottom: '32px',
                color: '#64748b',
                fontSize: '1rem'
              }}>
                <span style={{
                  color: '#FFC72C',
                  fontWeight: '700',
                  fontSize: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  ⭐ {selectedRental.rating}
                </span>
                <span style={{ fontWeight: '600' }}>({selectedRental.reviews} reviews)</span>
              </div>

              <div style={{
                backgroundColor: '#f8fafc',
                padding: '24px',
                borderRadius: '16px',
                marginBottom: '32px'
              }}>
                <h3 style={{
                  color: '#1e293b',
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  marginBottom: '16px'
                }}>
                  Description
                </h3>
                <p style={{
                  color: '#64748b',
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  marginBottom: '20px'
                }}>
                  {selectedRental.type === 'property' 
                    ? 'This beautiful property offers modern amenities and comfortable living spaces. Perfect for both short and long-term stays with excellent accessibility to local attractions and facilities.'
                    : 'This premium vehicle is well-maintained and perfect for your transportation needs. Features modern safety equipment and comfort features for an enjoyable driving experience.'
                  }
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div>
                    <h4 style={{ color: '#1e293b', fontWeight: '600', marginBottom: '8px' }}>Features</h4>
                    <ul style={{ color: '#64748b', listStyle: 'none', padding: 0 }}>
                      {selectedRental.type === 'property' ? (
                        <>
                          <li style={{ marginBottom: '4px' }}>• Fully Furnished</li>
                          <li style={{ marginBottom: '4px' }}>• Air Conditioning</li>
                          <li style={{ marginBottom: '4px' }}>• WiFi Included</li>
                          <li style={{ marginBottom: '4px' }}>• Parking Available</li>
                        </>
                      ) : (
                        <>
                          <li style={{ marginBottom: '4px' }}>• GPS Navigation</li>
                          <li style={{ marginBottom: '4px' }}>• Air Conditioning</li>
                          <li style={{ marginBottom: '4px' }}>• Insurance Included</li>
                          <li style={{ marginBottom: '4px' }}>• 24/7 Support</li>
                        </>
                      )}
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ color: '#1e293b', fontWeight: '600', marginBottom: '8px' }}>Availability</h4>
                    <p style={{ color: '#64748b', marginBottom: '8px' }}>Available Now</p>
                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Minimum: 1 day</p>
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '24px',
                borderTop: '2px solid #f1f5f9'
              }}>
                <div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{
                      color: '#1e293b',
                      fontSize: '2.2rem',
                      fontWeight: '800',
                      letterSpacing: '-1px'
                    }}>
                      Rs. {selectedRental.price.toLocaleString()}
                    </span>
                    <span style={{ color: '#94a3b8', fontSize: '1rem', fontWeight: '500' }}>/day</span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={closeModal}
                    style={{
                      backgroundColor: '#f1f5f9',
                      color: '#64748b',
                      border: 'none',
                      padding: '14px 28px',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#e2e8f0';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f1f5f9';
                    }}
                  >
                    Close
                  </button>
                  <button
                    style={{
                      backgroundColor: '#FFC72C',
                      color: '#000000',
                      border: 'none',
                      padding: '14px 32px',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      fontWeight: '700',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 20px rgba(255, 199, 44, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 30px rgba(255, 199, 44, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 199, 44, 0.3)';
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
