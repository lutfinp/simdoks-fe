import React, { useState, useEffect } from "react";
import { Bell } from "@phosphor-icons/react/dist/ssr";
import NotificationPopup from "../NotificationPopup";
import axios from "axios";

const Header = ({ name }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  let jwt;

  useEffect(() => {
    const getTokenAndCheckNotification = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const token = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/token`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );
        jwt = token.data.accessToken;

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/checkIfHaveNotification`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        setHasNotification(response.data.hasNotification);
        setUnreadCount(response.data.unreadCount);
      } catch (error) {
        console.error("Error fetching token or checking notification:", error);
      }
    };

    getTokenAndCheckNotification();
  }, []);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleCloseNotification = () => {
    setShowNotifications(false);
  };

  return (
    <div className="flex-row flex justify-between text-2xl font-bold text-gray-700">
      <div>Hai, {name?.role}!</div>
      <div>
        <button onClick={handleNotificationClick}>
          <Bell size={27} weight="fill" />
          {hasNotification && unreadCount > 0 && (
            <span className="absolute top-4 right-8 inline-block w-3.5 h-3.5 bg-red-600 rounded-full"></span>
          )}
        </button>
        <div className="h-0">
          {showNotifications && (
            <NotificationPopup
              notifications={notifications}
              onClose={handleCloseNotification}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
