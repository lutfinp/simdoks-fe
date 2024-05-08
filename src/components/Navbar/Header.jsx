import React, { useState } from "react";
import { Bell } from "@phosphor-icons/react/dist/ssr";
import NotificationPopup from "../NotificationPopup";

const Header = ({ name }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleCloseNotification = () => {
    setShowNotifications(false);
  };

  return (
    <div className="flex-row flex justify-between text-2xl font-bold text-gray-700">
      <div>Hai {name?.role}!</div>
      <div>
        <button
          className="self-center hover:scale-105"
          onClick={handleNotificationClick}
        >
          <Bell size={27} weight="fill" />
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
