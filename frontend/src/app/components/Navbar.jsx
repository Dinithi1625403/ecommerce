"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Browse", href: "/listings" },
    { name: "Add Listing", href: "/add-listing" },
    { name: "Login", href: "/login" },
  ];

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold">Rentify</h1>
      <div className="flex gap-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`hover:text-yellow-300 ${
              pathname === link.href ? "text-yellow-400 font-semibold" : ""
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
