// app/dashboard/layout.js
import Link from 'next/link';

export default function chatLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-4">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <nav className="flex flex-col gap-3">
          <Link href="/dashboard/chat" className="hover:text-yellow-400">💬 Chat</Link>
          <Link href="/dashboard/profile" className="hover:text-yellow-400">👤 Profile</Link>
          <Link href="/dashboard/settings" className="hover:text-yellow-400">⚙️ Settings</Link>
          <Link href="/dashboard/group" className="hover:text-yellow-400">👥 Group</Link>
          <Link href="/dashboard/contacts" className="hover:text-yellow-400">📇 Contacts</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        {children}
      </main>
    </div>
  );
}
