// app/dashboard/layout.js
import Link from 'next/link';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 p-6 space-y-6 bg-white border-r border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Chatify</h2>

        <nav className="space-y-4">
          {/* Navigation Links */}
          <div>
            <Link href="/dashboard/chat" className="block text-lg text-gray-700 hover:text-yellow-400 transition duration-300">
              Chat
            </Link>
            <Link href="/dashboard/group" className="block text-lg text-gray-700 hover:text-yellow-400 transition duration-300">
              Group
            </Link>
            <Link href="/dashboard/contacts" className="block text-lg text-gray-700 hover:text-yellow-400 transition duration-300">
              Contacts
            </Link>
          </div>

          {/* Additional Links */}
          <div>
            <Link href="/dashboard/profile" className="block text-lg text-gray-700 hover:text-yellow-400 transition duration-300">
              Profile
            </Link>
            <Link href="/dashboard/settings" className="block text-lg text-gray-700 hover:text-yellow-400 transition duration-300">
              Settings
            </Link>
          </div>

          {/* LogOut Button */}
          <div>
            <button className="w-full py-2 mt-6 text-lg text-white bg-red-500 hover:bg-red-600 rounded-md focus:outline-none transition duration-300">
              Log Out
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-64  p-8 bg-red-500 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
