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
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
      },
      {
        id: 2,
        title: "Luxury Car - BMW X5",
        price: 15000,
        location: "Kandy",
        type: "vehicle",
        rating: 4.8,
        reviews: 41,
        image: "https://images.unsplash.com/photo-1605559424843-9e4c3e91a22a?auto=format&fit=crop&w=800&q=60",
      },
      {
        id: 3,
        title: "Beachside Villa",
        price: 120000,
        location: "Galle",
        type: "property",
        rating: 4.9,
        reviews: 15,
        image: "https://images.unsplash.com/photo-1600585154200-1c0fbeebf2c1?auto=format&fit=crop&w=800&q=60",
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

  return (    <div style={{ 
      backgroundColor: '#ffffff',
      minHeight: '100vh',
      fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>      {/* Hero Section */}
      <div style={{ 
        background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
        padding: '120px 20px 80px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Minimal grid overlay */}
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px',
          opacity: 0.1
        }}></div>
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>          <h1 style={{ 
            color: '#FFFFFF',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            marginBottom: '24px',
            fontWeight: '600',
            textAlign: 'center',
            letterSpacing: '-1px'
          }}>
            Premium Rental Services
          </h1>
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '1.25rem',
            textAlign: 'center',
            maxWidth: '700px',
            margin: '0 auto 60px',
            lineHeight: '1.8',
            fontWeight: '300'
          }}>
            Premium properties and luxury vehicles across Sri Lanka's most beautiful locations
          </p>          {/* Search Bar */}
          <div style={{ 
            position: 'relative',
            maxWidth: '600px',
            margin: '0 auto 50px'
          }}>
            <input
              type="text"
              placeholder="Search locations, properties, or vehicles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '18px 60px 18px 24px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                fontSize: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                color: '#ffffff',
                outline: 'none',
                transition: 'all 0.3s ease',
                '::placeholder': { color: 'rgba(255, 255, 255, 0.7)' }
              }}
              onFocus={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                e.target.style.color = '#1e293b';
                e.target.style.border = '1px solid rgba(255, 255, 255, 0.3)';
              }}
              onBlur={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.target.style.color = '#ffffff';
                e.target.style.border = '1px solid rgba(255, 255, 255, 0.2)';
              }}
            />
            <div style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'rgba(255, 255, 255, 0.6)',
              pointerEvents: 'none'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
          </div>

          {/* Modern Filter Tabs */}
          <div style={{ 
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {['all', 'property', 'vehicle'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                style={{
                  padding: '16px 40px',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  background: filter === type 
                    ? 'linear-gradient(135deg, #FFC72C 0%, #FFD95A 100%)' 
                    : 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  color: filter === type ? '#000000' : '#FFFFFF',
                  fontWeight: filter === type ? '700' : '500',
                  transition: 'all 0.3s ease',
                  textTransform: 'capitalize',
                  boxShadow: filter === type ? '0 8px 25px rgba(255, 199, 44, 0.3)' : 'none',
                  transform: filter === type ? 'translateY(-2px)' : 'translateY(0)'
                }}
                onMouseEnter={(e) => {
                  if (filter !== type) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (filter !== type) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  }
                }}              >
                {type === 'all' ? 'All Rentals' : type === 'property' ? 'Properties' : 'Vehicles'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{
        maxWidth: '1200px',
        margin: '-50px auto 0',
        padding: '0 20px',
        position: 'relative',
        zIndex: 10
      }}>        <div style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(226, 232, 240, 0.8)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          textAlign: 'center'
        }}>
          {[
            { value: '500+', label: 'Premium Listings' },
            { value: '4.8', label: 'Average Rating' },
            { value: '10K+', label: 'Happy Customers' },
          ].map((stat, i) => (
            <div key={i}>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>{stat.value}</div>
              <div style={{ fontSize: '0.95rem', color: '#64748b', fontWeight: '500', letterSpacing: '0.5px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Rental Cards Grid */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
        gap: '40px',
        padding: '80px 20px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {filteredRentals.map((rental, index) => (
          <div 
            key={rental.id}
            style={{ 
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              overflow: 'hidden',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
              cursor: 'pointer',
              animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-16px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 30px 80px rgba(102, 126, 234, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.08)';
            }}
          >
            <div style={{ position: 'relative', overflow: 'hidden', height: '260px' }}>
              <img
                src={rental.image}
                alt={rental.title}
                style={{ 
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.15)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)'
              }}></div>              <div style={{ 
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(0, 0, 0, 0.7)',
                color: '#FFFFFF',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                backdropFilter: 'blur(10px)'
              }}>
                {rental.type}
              </div>
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                color: '#FFFFFF',
                fontSize: '0.95rem',
                fontWeight: '600',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFC72C">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {rental.location}
              </div>
            </div>

            <div style={{ padding: '28px' }}>
              <h3 style={{ 
                color: '#1e293b',
                fontSize: '1.5rem',
                marginBottom: '16px',
                fontWeight: '800',
                lineHeight: '1.3',
                letterSpacing: '-0.5px'
              }}>
                {rental.title}
              </h3>

              <div style={{ 
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
                marginBottom: '24px',
                paddingBottom: '24px',
                borderBottom: '1px solid #f1f5f9'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'linear-gradient(135deg, #FFF5D6 0%, #FFE5A0 100%)',
                  padding: '8px 16px',
                  borderRadius: '12px'
                }}>
                  <span style={{ fontSize: '1.1rem' }}>★</span>
                  <span style={{ fontWeight: '800', color: '#1e293b', fontSize: '1rem' }}>
                    {rental.rating}
                  </span>
                </div>
                <span style={{ color: '#64748b', fontSize: '0.95rem', fontWeight: '500' }}>
                  {rental.reviews} reviews
                </span>
              </div>

              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '4px', fontWeight: '600' }}>
                    Starting from
                  </div>
                  <div style={{
                    fontSize: '1.8rem',
                    fontWeight: '900',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '-1px'
                  }}>
                    Rs. {rental.price.toLocaleString()}
                    <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: '600' }}>/day</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleViewDetails(rental)}
                  style={{ 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(4px) scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRentals.length === 0 && (
        <div style={{ 
          textAlign: 'center',
          padding: '100px 20px',
          maxWidth: '600px',
          margin: '0 auto'
        }}>          <div style={{ 
            fontSize: '5rem',
            marginBottom: '24px',
            opacity: '0.2',
            filter: 'grayscale(1)'
          }}>🔍</div>
          <h3 style={{ 
            color: '#1e293b',
            fontSize: '2rem',
            fontWeight: '800',
            marginBottom: '16px',
            letterSpacing: '-0.5px'
          }}>No rentals found</h3>
          <p style={{ color: '#64748b', fontSize: '1.15rem', lineHeight: '1.6' }}>
            Try adjusting your filters or search terms to find what you're looking for
          </p>
        </div>
      )}

      {/* Enhanced Modal */}
      {showModal && selectedRental && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px',
          animation: 'fadeIn 0.3s ease-out'
        }} onClick={closeModal}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '32px',
            maxWidth: '900px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative',
            boxShadow: '0 50px 150px rgba(0, 0, 0, 0.4)',
            animation: 'slideUp 0.4s ease-out'
          }} onClick={(e) => e.stopPropagation()}>
            
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                background: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                color: '#1e293b',
                zIndex: 1001,
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                fontWeight: '300'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FFC72C';
                e.currentTarget.style.transform = 'rotate(90deg) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
                e.currentTarget.style.transform = 'rotate(0) scale(1)';
              }}
            >
              ✕
            </button>

            <div style={{ position: 'relative', height: '350px', overflow: 'hidden', borderRadius: '32px 32px 0 0' }}>
              <img
                src={selectedRental.image}
                alt={selectedRental.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ 
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)'
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: '32px',
                left: '40px',
                right: '40px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end'
              }}>
                <div>
                  <div style={{
                    background: selectedRental.type === 'property' 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    color: '#FFFFFF',
                    padding: '10px 20px',
                    borderRadius: '30px',
                    fontSize: '13px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '12px',
                    display: 'inline-block'
                  }}>
                    {selectedRental.type}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: '#FFFFFF',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFC72C">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    {selectedRental.location}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ padding: '48px' }}>
              <h2 style={{
                color: '#1e293b',
                fontSize: '2.5rem',
                fontWeight: '900',
                marginBottom: '20px',
                lineHeight: '1.2',
                letterSpacing: '-1px'
              }}>
                {selectedRental.title}
              </h2>

              <div style={{
                display: 'flex',
                gap: '20px',
                alignItems: 'center',
                marginBottom: '40px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'linear-gradient(135deg, #FFF5D6 0%, #FFE5A0 100%)',
                  padding: '12px 20px',
                  borderRadius: '16px'
                }}>
                  <span style={{ fontSize: '1.3rem' }}>★</span>
                  <span style={{ fontWeight: '800', color: '#1e293b', fontSize: '1.2rem' }}>
                    {selectedRental.rating}
                  </span>
                </div>
                <span style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: '600' }}>
                  ({selectedRental.reviews} reviews)
                </span>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                padding: '32px',
                borderRadius: '20px',
                marginBottom: '40px'
              }}>
                <h3 style={{
                  color: '#1e293b',
                  fontSize: '1.5rem',
                  fontWeight: '800',
                  marginBottom: '20px'
                }}>
                  About this {selectedRental.type}
                </h3>
                <p style={{
                  color: '#475569',
                  fontSize: '1.05rem',
                  lineHeight: '1.8',
                  marginBottom: '28px'
                }}>
                  {selectedRental.type === 'property' 
                    ? 'Experience luxury living in this beautifully designed property. Featuring modern amenities, spacious interiors, and premium finishes throughout. Perfect for both short and long-term stays with excellent connectivity to local attractions.'
                    : 'Drive in style with this premium vehicle. Meticulously maintained and equipped with the latest safety features and comfort amenities. Includes comprehensive insurance and 24/7 roadside assistance for your peace of mind.'
                  }
                </p>

                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '24px'
                }}>
                  <div>
                    <h4 style={{ color: '#1e293b', fontWeight: '700', marginBottom: '12px', fontSize: '1.1rem' }}>
                      ✨ Features
                    </h4>
                    <ul style={{ color: '#64748b', listStyle: 'none', padding: 0, lineHeight: '2' }}>
                      {selectedRental.type === 'property' ? (
                        <>
                          <li>• Fully Furnished</li>
                          <li>• Air Conditioning</li>
                          <li>• High-Speed WiFi</li>
                          <li>• Free Parking</li>
                        </>
                      ) : (
                        <>
                          <li>• GPS Navigation</li>
                          <li>• Climate Control</li>
                          <li>• Full Insurance</li>
                          <li>• 24/7 Support</li>
                        </>
                      )}
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ color: '#1e293b', fontWeight: '700', marginBottom: '12px', fontSize: '1.1rem' }}>
                      📅 Availability
                    </h4>
                    <p style={{ color: '#10b981', fontWeight: '600', marginBottom: '8px', fontSize: '1.05rem' }}>
                      ✓ Available Now
                    </p>
                    <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Minimum rental: 1 day</p>
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '32px',
                borderTop: '2px solid #f1f5f9'
              }}>
                <div>
                  <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '6px', fontWeight: '600' }}>
                    Starting from
                  </div>
                  <div style={{
                    fontSize: '2.8rem',
                    fontWeight: '900',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '-1.5px'
                  }}>
                    Rs. {selectedRental.price.toLocaleString()}
                    <span style={{ fontSize: '1.2rem', color: '#94a3b8', fontWeight: '600' }}>/day</span>
                  </div>
                </div>
                
                <button                  style={{
                    background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '16px 32px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(30, 41, 59, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(30, 41, 59, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(30, 41, 59, 0.3)';
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}
