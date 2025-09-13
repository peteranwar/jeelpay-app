"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full bg-slate-900 text-white px-6 py-3 flex items-center gap-6">
      <Link href="/" className="font-bold hover:underline">StudyPlans</Link>
      <nav className="flex gap-4 text-sm">
        <Link href="/plans" className="hover:underline">Plans</Link>
        <Link href="/me" className="hover:underline">My Subscription</Link>
        <Link href="/admin" className="hover:underline">Admin</Link>
      </nav>
    </header>
  );
}
