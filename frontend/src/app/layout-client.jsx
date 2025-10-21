"use client";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { usePathname } from "next/navigation";

export default function LayoutClient({ children }) {
  const pathname = usePathname();

  const hideLayout = ["/login", "/signup"].includes(pathname);

  return (
    <>
      {!hideLayout && <Navbar />}
      <main className={`${!hideLayout ? "min-h-[80vh]" : ""}`}>
        {children}
      </main>
      {!hideLayout && <Footer />}
    </>
  );
}
