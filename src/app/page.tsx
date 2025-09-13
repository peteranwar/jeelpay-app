import Link from "next/link";

export default function Home() {
  return (
    <main className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-center">Jeel  Study Plans App</h1>
      <p className="text-gray-600">Choose a section to explore:</p>

      <nav className="space-y-2">
        <Link href="/plans" className="block text-blue-600 hover:underline">
          → Browse Plans
        </Link>
        <Link href="/me" className="block text-blue-600 hover:underline">
          → My Subscription
        </Link>
        <Link href="/admin" className="block text-blue-600 hover:underline">
          → Admin Panel
        </Link>
      </nav>
    </main>
  );
}
