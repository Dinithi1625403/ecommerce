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
          ? "text-[#FACC15] bg-[#FACC15]/10"
          : "text-gray-300 hover:text-[#FACC15] hover:bg-[#FACC15]/10"
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
      <nav className="bg-[#071022]/95 backdrop-blur-md shadow-sm border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:shadow-lg transition-all duration-300"
                style={{
                  background: "linear-gradient(90deg,#0b1220,#FACC15)",
                }}
              >
                <span className="text-black font-bold text-lg">R</span>
              </div>
              <span
                className="text-2xl font-bold"
                style={{
                  background: "linear-gradient(90deg,#0b1220,#FACC15)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Rentify
              </span>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-300" />
                </div>
                <input
                  type="text"
                  placeholder="Search for rentals, locations, or experiences..."
                  className="w-full pl-12 pr-4 py-3 border rounded-2xl bg-[#0b1220] text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FACC15] transition-all duration-200"
                  style={{ borderColor: "rgba(255,255,255,0.04)" }}
                />
                <button className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <div className="bg-[#FACC15] hover:bg-[#e0b21a] text-black p-2 rounded-xl transition-colors duration-200">
                    <Search className="h-4 w-4" />
                  </div>
                </button>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {links.map((link) => navLink(link, pathname))}
            </div>

            {/* Right side - Desktop */}
            <div className="hidden lg:flex items-center space-x-3">
              <button className="relative p-2.5 text-gray-300 hover:text-[#FACC15] hover:bg-[#FACC15]/10 rounded-xl transition-all duration-200">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-[#FACC15] rounded-full border border-[#071022]"></span>
              </button>
              <Link
                href="/wishlist"
                className="relative p-2.5 text-gray-300 hover:text-[#FACC15] hover:bg-[#FACC15]/10 rounded-xl transition-all duration-200"
              >
                <Heart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-[#FACC15] text-black text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Link>
              <div className="relative">
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center space-x-2 p-1.5 border"
                  style={{ borderColor: "rgba(255,255,255,0.04)" }}
                >
                  <div className="p-1">
                    <Menu className="h-4 w-4 text-gray-300" />
                  </div>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      background: "linear-gradient(90deg,#0b1220,#FACC15)",
                    }}
                  >
                    <User className="h-4 w-4 text-black" />
                  </div>
                </button>
                {profileDropdown && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-[#0b1220] rounded-2xl shadow-xl border py-2 z-50"
                    style={{ borderColor: "rgba(255,255,255,0.04)" }}
                  >
                    <Link
                      href="/profile"
                      className="block px-4 py-3 text-gray-100 hover:bg-[#FACC15]/5 transition-colors duration-150"
                    >
                      <div className="flex items-center space-x-3">
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                      </div>
                    </Link>
                    <Link
                      href="/my-rentals"
                      className="block px-4 py-3 text-gray-100 hover:bg-[#FACC15]/5 transition-colors duration-150"
                    >
                      <div className="flex items-center space-x-3">
                        <ShoppingBag className="h-4 w-4" />
                        <span>My Rentals</span>
                      </div>
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-3 text-gray-100 hover:bg-[#FACC15]/5 transition-colors duration-150"
                    >
                      <div className="flex items-center space-x-3">
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </div>
                    </Link>
                    <hr className="my-2 border-white/5" />
                    <Link
                      href="/login"
                      className="block px-4 py-3 text-gray-100 hover:bg-[#FACC15]/5 transition-colors duration-150"
                    >
                      Login / Sign up
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Search & Menu Button */}
            <div className="flex items-center space-x-2 lg:hidden">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 text-gray-300 hover:text-[#FACC15] hover:bg-[#FACC15]/10 rounded-xl transition-all duration-200"
              >
                <Search className="h-5 w-5" />
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2.5 text-gray-300 hover:text-[#FACC15] hover:bg-[#FACC15]/10 rounded-xl transition-all duration-200"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {searchOpen && (
            <div
              className="lg:hidden px-4 pb-4 border-t"
              style={{ borderColor: "rgba(255,255,255,0.04)" }}
            >
              <div className="relative mt-4">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-300" />
                </div>
                <input
                  type="text"
                  placeholder="Search rentals..."
                  className="w-full pl-12 pr-4 py-3 border rounded-2xl bg-[#0b1220] text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FACC15] transition-all duration-200"
                  style={{ borderColor: "rgba(255,255,255,0.04)" }}
                />
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-60"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-80 bg-[#071022] shadow-2xl"
            style={{ borderLeft: "1px solid rgba(255,255,255,0.04)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-semibold text-gray-100">Menu</h2>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 text-gray-300 hover:text-gray-100 hover:bg-[#0b1220]/50 rounded-xl transition-all duration-200"
                >
                  <X size={20} />
                </button>
              </div>

              <div
                className="flex items-center space-x-3 p-4 rounded-2xl mb-6"
                style={{ border: "1px solid rgba(255,255,255,0.04)" }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(90deg,#0b1220,#FACC15)",
                  }}
                >
                  <User className="h-6 w-6 text-black" />
                </div>
                <div>
                  <p className="font-semibold text-gray-100">Welcome!</p>
                  <Link
                    href="/login"
                    className="text-sm text-[#FACC15] hover:text-[#e0b21a]"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login / Sign up
                  </Link>
                </div>
              </div>

              <div className="space-y-2">
                {links.map((link) =>
                  navLink(link, pathname, "p-4 rounded-2xl", () =>
                    setMenuOpen(false)
                  )
                )}
              </div>

              <div className="mt-8 pt-6 border-t" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                <Link
                  href="/wishlist"
                  className="flex items-center space-x-3 p-4 rounded-2xl text-gray-100 hover:text-[#FACC15] hover:bg-[#FACC15]/10 transition-all duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  <Heart className="h-5 w-5" />
                  <span className="font-medium">Wishlist</span>
                  <span className="ml-auto bg-[#FACC15] text-black text-xs px-2 py-1 rounded-full">3</span>
                </Link>
                <Link
                  href="/notifications"
                  className="flex items-center space-x-3 p-4 rounded-2xl text-gray-100 hover:text-[#FACC15] hover:bg-[#FACC15]/10 transition-all duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  <Bell className="h-5 w-5" />
                  <span className="font-medium">Notifications</span>
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center space-x-3 p-4 rounded-2xl text-gray-100 hover:text-[#FACC15] hover:bg-[#FACC15]/10 transition-all duration-200"
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

      {/* Click outside to close profile dropdown */}
      {profileDropdown && (
        <div className="fixed inset-0 z-30" onClick={() => setProfileDropdown(false)}></div>
      )}
    </>
  );
}