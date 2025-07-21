// components/Header.jsx
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNotifications } from '../hooks/useNotifications';

export default function Header() {
  const { user, logout } = useAuth();
  const { notifications, markAsRead, unreadCount } = useNotifications();
  const [showNotif, setShowNotif] = useState(false);

  return (
    <header className="ml-64 bg-white shadow-sm h-16 flex items-center justify-between px-6 z-20 relative">
      <h1 className="text-xl font-semibold text-gray-800">Welcome, {user?.full_name}</h1>

      <div className="flex items-center space-x-6">
        {/* Notifications */}
        <div className="relative">
          <button onClick={() => setShowNotif(!showNotif)} className="relative">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.07 2.82c.35-.78 1.44-.78 1.79 0l.09.2c.4.88 1.26 1.5 2.25 1.68v.3a8 8 0 11-7.18 0v-.3c.99-.18 1.85-.8 2.25-1.68l.09-.2z" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotif && (
            <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
              <div className="p-4 border-b">
                <h3 className="font-medium">Notifications</h3>
              </div>
              <ul>
                {notifications.length === 0 ? (
                  <li className="p-4 text-gray-500">No notifications</li>
                ) : (
                  notifications.map((n) => (
                    <li
                      key={n.id}
                      className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${!n.read ? 'bg-blue-50' : ''}`}
                      onClick={() => markAsRead(n.id)}
                    >
                      <p className="text-sm">{n.message}</p>
                      <p className="text-xs text-gray-500">{n.time}</p>
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Logout */}
        <button onClick={logout} className="text-red-600 hover:text-red-800 font-medium">
          Logout
        </button>
      </div>
    </header>
  );
}