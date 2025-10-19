"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Menu,
  X,
  Search,
  Heart,
  User,
  ShoppingBag,
  MapPin,
  Bell,
  Settings,
} from "lucide-react";

const links = [
  { name: "Explore", href: "/listings", icon: Search },
  { name: "Categories", href: "/categories", icon: MapPin },
  { name: "My Rentals", href: "/my-rentals", icon: ShoppingBag },
  { name: "Host", href: "/become-host", icon: Settings },
];

const navLink = (link, pathname, extra = "", onClick) => {
  const Icon = link.icon;
  const active = pathname === link.href;
  return (
    <Link
      key={link.href}
      href={link.href}
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
        active
          ? "text-[#FDE047] bg-[#FDE047]/10"
          : "text-gray-300 hover:text-[#FDE047] hover:bg-[#FDE047]/10"
      } ${extra}`}
    >
      <Icon className="h-4 w-4 text-current" />
      <span>{link.name}</span>
    </Link>
  );
};

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  return (
    <>
      {/* Add CSS keyframes for animations */}
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes particles {
          0% { opacity: 0; transform: translateY(0px) rotate(0deg); }
          50% { opacity: 1; transform: translateY(-10px) rotate(180deg); }
          100% { opacity: 0; transform: translateY(-20px) rotate(360deg); }
        }
      `}</style>
      
      <nav className="sticky top-0 z-50 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-800 backdrop-blur-xl shadow-2xl border-b border-[#FDE047]/30 overflow-visible">
        {/* Enhanced animated gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FDE047]/12 via-[#F59E0B]/8 to-[#FDE047]/12 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#FDE047]/6 to-transparent animate-pulse" style={{ animationDelay: "1.5s" }}></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#FBBF24]/5 via-transparent to-[#F59E0B]/5" style={{ animation: "glow 3s ease-in-out infinite" }}></div>
        
        {/* Enhanced floating particles effect */}
        <div className="absolute top-2 left-1/4 w-2 h-2 bg-[#FDE047]/40 rounded-full" style={{ animation: "float 4s ease-in-out infinite" }}></div>
        <div className="absolute top-1 right-1/3 w-1 h-1 bg-[#F59E0B]/50 rounded-full" style={{ animation: "float 3s ease-in-out infinite", animationDelay: "2s" }}></div>
        <div className="absolute bottom-2 left-1/2 w-1.5 h-1.5 bg-[#FBBF24]/30 rounded-full" style={{ animation: "particles 5s ease-in-out infinite", animationDelay: "1s" }}></div>
        
        {/* Improved top border gradient */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FDE047] to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-5">
            {/* Enhanced Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xl group-hover:shadow-[#FDE047]/60 relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #FDE047 0%, #F59E0B 30%, #FBBF24 60%, #FDE047 100%)",
                  boxShadow: "0 8px 32px rgba(253, 224, 71, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                }}
              >
                {/* Enhanced shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="text-black font-bold text-xl drop-shadow-sm relative z-10">R</span>
              </div>
              <span
                className="text-4xl font-extrabold tracking-tight relative"
                style={{
                  background: "linear-gradient(135deg, #FDE047 0%, #F59E0B 25%, #FDE047 50%, #FBBF24 75%, #FDE047 100%)",
                  backgroundSize: "300% 300%",
                  animation: "gradient 4s ease infinite",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  filter: "drop-shadow(0 0 20px rgba(253, 224, 71, 0.5))",
                }}
              >
                Rentify
                {/* Enhanced glow effect */}
                <div className="absolute inset-0 blur-xl opacity-40" style={{
                  background: "linear-gradient(135deg, #FDE047 0%, #F59E0B 25%, #FDE047 50%, #FBBF24 75%, #FDE047 100%)",
                  backgroundSize: "300% 300%",
                  animation: "gradient 4s ease infinite",
                }}></div>
              </span>
            </Link>

            {/* Enhanced Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#FDE047] transition-colors duration-200" />
                </div>
                <input
                  type="text"
                  placeholder="Search for rentals, locations, or experiences..."
                  className="w-full pl-12 pr-16 py-4 border border-white/10 rounded-2xl bg-gradient-to-r from-[#0b0b0d]/80 to-[#141214]/80 backdrop-blur-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FDE047]/50 focus:border-[#FDE047]/30 transition-all duration-300 hover:border-white/20"
                  style={{ 
                    boxShadow: "inset 0 2px 10px rgba(0,0,0,0.1), 0 4px 20px rgba(253, 224, 71, 0.05)"
                  }}
                />
                <button className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <div className="bg-gradient-to-r from-[#FDE047] to-[#F59E0B] hover:from-[#FCD34D] hover:to-[#FBBF24] text-black p-2.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
                    <Search className="h-4 w-4" />
                  </div>
                </button>
                {/* Search bar glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FDE047]/10 to-[#F59E0B]/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none blur-xl"></div>
              </div>
            </div>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {links.map((link) => {
                const Icon = link.icon;
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 relative overflow-hidden group ${
                      active
                        ? "text-[#FDE047] bg-gradient-to-r from-[#FDE047]/20 to-[#F59E0B]/10 shadow-lg"
                        : "text-gray-300 hover:text-[#FDE047] hover:bg-gradient-to-r hover:from-[#FDE047]/10 hover:to-[#F59E0B]/5"
                    }`}
                  >
                    {/* Hover shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FDE047]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                    <Icon className="h-4 w-4 text-current relative z-10" />
                    <span className="relative z-10">{link.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Enhanced Right side - Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-3 text-gray-300 hover:text-[#FDE047] hover:bg-gradient-to-r hover:from-[#FDE047]/10 hover:to-[#F59E0B]/5 rounded-xl transition-all duration-300 hover:scale-105 group">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-r from-[#FDE047] to-[#F59E0B] rounded-full border-2 border-[#0b0b0d] flex items-center justify-center animate-pulse">
                  <span className="h-2 w-2 bg-white rounded-full"></span>
                </span>
              </button>
              
              {/* Wishlist */}
                      <Link
                      href="/wishlist"
                      className="relative p-3 text-gray-300 hover:text-[#FDE047] hover:bg-gradient-to-r hover:from-[#FDE047]/10 hover:to-[#F59E0B]/5 rounded-xl transition-all duration-300 hover:scale-105 group"
                      >
                      <Heart className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-[#FDE047] to-[#F59E0B] text-black text-xs rounded-full flex items-center justify-center font-bold shadow-lg">
                        3
                      </span>
                      </Link>

                      {/* Profile Dropdown */}
                      <div className="relative">
                      <button
                        onClick={() => setProfileDropdown(!profileDropdown)}
                        className="p-2 border border-white/10 rounded-full hover:border-[#FDE047]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#FDE047]/10"
                        style={{
                        background: "linear-gradient(135deg, rgba(253, 224, 71, 0.05) 0%, rgba(245, 158, 11, 0.05) 100%)",
                        }}
                        aria-haspopup="true"
                        aria-expanded={profileDropdown}
                      >
                        <div
                        className="w-9 h-9 rounded-full flex items-center justify-center shadow-lg"
                        style={{
                          background: "linear-gradient(135deg, #FDE047 0%, #F59E0B 100%)",
                        }}
                        >
                        <User className="h-4 w-4 text-black" />
                        </div>
                      </button>

                      {profileDropdown && (
                        <div
                        className="absolute right-0 mt-3 w-64 bg-gradient-to-br from-[#0b0b0d] to-[#141214] rounded-2xl shadow-2xl border border-white/10 py-3 z-50 backdrop-blur-xl"
                        style={{
                          boxShadow: "0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(253, 224, 71, 0.1)",
                        }}
                        onClick={(e) => e.stopPropagation()}
                        >
                        <Link
                          href="/profile"
                          onClick={() => setProfileDropdown(false)}
                          className="block px-5 py-3 text-gray-100 hover:bg-gradient-to-r hover:from-[#FDE047]/10 hover:to-[#F59E0B]/5 transition-all duration-200 hover:text-[#FDE047]"
                        >
                          <div className="flex items-center space-x-3">
                          <User className="h-4 w-4" />
                          <span>Profile</span>
                          </div>
                        </Link>
                        <Link
                          href="/my-rentals"
                          className="block px-5 py-3 text-gray-100 hover:bg-gradient-to-r hover:from-[#FDE047]/10 hover:to-[#F59E0B]/5 transition-all duration-200 hover:text-[#FDE047]"
                        >
                          <div className="flex items-center space-x-3">
                          <ShoppingBag className="h-4 w-4" />
                          <span>My Rentals</span>
                          </div>
                        </Link>
                        <Link
                          href="/settings"
                          className="block px-5 py-3 text-gray-100 hover:bg-gradient-to-r hover:from-[#FDE047]/10 hover:to-[#F59E0B]/5 transition-all duration-200 hover:text-[#FDE047]"
                        >
                          <div className="flex items-center space-x-3">
                          <Settings className="h-4 w-4" />
                          <span>Settings</span>
                          </div>
                        </Link>
                        <hr className="my-3 border-white/10" />
                        <Link
                          href="/login"
                          className="block px-5 py-3 text-gray-100 hover:bg-gradient-to-r hover:from-[#FDE047]/10 hover:to-[#F59E0B]/5 transition-all duration-200 hover:text-[#FDE047] font-medium"
                        >
                          Login / Sign up
                        </Link>
                        </div>
                      )}
                      </div>
                    <div className="flex items-center space-x-3 lg:hidden">
                      <button
                      onClick={() => setSearchOpen(!searchOpen)}
                      className="p-3 text-gray-300 hover:text-[#FDE047] hover:bg-gradient-to-r hover:from-[#FDE047]/10 hover:to-[#F59E0B]/5 rounded-xl transition-all duration-300 hover:scale-105"
                      >
                      <Search className="h-5 w-5" />
                      </button>
                      <button
                      onClick={() => setMenuOpen(!menuOpen)}
                      className="p-3 text-gray-300 hover:text-[#FDE047] hover:bg-gradient-to-r hover:from-[#FDE047]/10 hover:to-[#F59E0B]/5 rounded-xl transition-all duration-300 hover:scale-105"
                      >
                      {menuOpen ? <X size={20} /> : <Menu size={20} />}
                      </button>
                    </div>
                    </div>
                    </div>

                    {/* Enhanced Mobile Search Bar */}
                    {searchOpen && (
                    <div
                      className="lg:hidden px-4 pb-5 border-t border-white/10"
                      style={{ 
                      background: "linear-gradient(135deg, rgba(253, 224, 71, 0.02) 0%, rgba(245, 158, 11, 0.02) 100%)"
                      }}
                    >
                      <div className="relative mt-4">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search rentals..."
                        className="w-full pl-12 pr-4 py-4 border border-white/10 rounded-2xl bg-gradient-to-r from-[#0b0b0d]/80 to-[#141214]/80 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FDE047]/50 focus:border-[#FDE047]/30 transition-all duration-300"
                        style={{ 
                        boxShadow: "inset 0 2px 10px rgba(0,0,0,0.1)"
                        }}
                      />
                      </div>
                    </div>
                    )}
                  </div>
                  </nav>

                  {/* Enhanced Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-80 bg-gradient-to-br from-[#0b0b0d] to-[#131214] shadow-2xl backdrop-blur-xl"
            style={{ 
              borderLeft: "1px solid rgba(253, 224, 71, 0.1)",
              boxShadow: "-10px 0 40px rgba(0,0,0,0.3)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-semibold text-gray-100">Menu</h2>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 text-gray-300 hover:text-[#FDE047] hover:bg-[#FDE047]/10 rounded-xl transition-all duration-200"
                >
                  <X size={20} />
                </button>
              </div>

              <div
                className="flex items-center space-x-3 p-4 rounded-2xl mb-6 border border-white/10"
                style={{ 
                  background: "linear-gradient(135deg, rgba(253, 224, 71, 0.05) 0%, rgba(245, 158, 11, 0.05) 100%)"
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #FDE047 0%, #F59E0B 100%)",
                  }}
                >
                  <User className="h-6 w-6 text-black" />
                </div>
                <div>
                  <p className="font-semibold text-gray-100">Welcome!</p>
                  <Link
                    href="/login"
                    className="text-sm text-[#FDE047] hover:text-[#FCD34D] transition-colors duration-200"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login / Sign up
                  </Link>
                </div>
              </div>

              <div className="space-y-2">
                {links.map((link) => {
                  const Icon = link.icon;
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center space-x-3 p-4 rounded-2xl font-medium transition-all duration-200 ${
                        active
                          ? "text-[#FDE047] bg-gradient-to-r from-[#FDE047]/20 to-[#F59E0B]/10"
                          : "text-gray-300 hover:text-[#FDE047] hover:bg-gradient-to-r hover:from-[#FDE047]/10 hover:to-[#F59E0B]/5"
                      }`}
                    >
                      <Icon className="h-4 w-4 text-current" />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <Link
                  href="/wishlist"
                  className="flex items-center space-x-3 p-4 rounded-2xl text-gray-100 hover:text-[#FDE047] hover:bg-gradient-to-r hover:from-[#FDE047]/10 hover:to-[#F59E0B]/5 transition-all duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  <Heart className="h-5 w-5" />
                  <span className="font-medium">Wishlist</span>
                  <span className="ml-auto bg-gradient-to-r from-[#FDE047] to-[#F59E0B] text-black text-xs px-2 py-1 rounded-full font-bold">3</span>
                </Link>
                <Link
                  href="/notifications"
                  className="flex items-center space-x-3 p-4 rounded-2xl text-gray-100 hover:text-[#FDE047] hover:bg-gradient-to-r hover:from-[#FDE047]/10 hover:to-[#F59E0B]/5 transition-all duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  <Bell className="h-5 w-5" />
                  <span className="font-medium">Notifications</span>
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center space-x-3 p-4 rounded-2xl text-gray-100 hover:text-[#FDE047] hover:bg-gradient-to-r hover:from-[#FDE047]/10 hover:to-[#F59E0B]/5 transition-all duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  <Settings className="h-5 w-5" />
                  <span className="font-medium">Settings</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Click outside to close profile dropdown */}
      {profileDropdown && (
        <div className="fixed inset-0 z-30" onClick={() => setProfileDropdown(false)}></div>
      )}
    </>
  );
}