import { useEffect, useState } from 'react';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulate real-time appointment updates (in prod: use WebSocket)
    const mockUpdates = [
      { id: 1, message: "Your appointment is confirmed.", time: "2 min ago", read: false },
      { id: 2, message: "Dr. Susan has updated your record.", time: "5 min ago", read: false },
    ];

    setNotifications(mockUpdates);

    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const newNotif = {
          id: Date.now(),
          message: "New appointment scheduled.",
          time: "Just now",
          read: false,
        };
        setNotifications(prev => [newNotif, ...prev.slice(0, 4)]);
      }
    }, 30000); // Every 30s

    return () => clearInterval(interval);
  }, []);

  const markAsRead = (id) => {
    setNotifications(notifs =>
      notifs.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return { notifications, markAsRead, unreadCount };
};