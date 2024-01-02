import React, { useState } from 'react';
import { Bell } from "@phosphor-icons/react/dist/ssr";
import NotificationPopup from '../notification/notifContent'

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
      <div>Hai {name}!</div>
      <div className="">
        <button className="self-center hover:scale-105" onClick={handleNotificationClick}>
          <Bell size={27} weight="fill" />
        </button>
        {showNotifications && (
          <NotificationPopup
            notifications={notifications}
            onClose={handleCloseNotification}
          />
        )}
      </div>
     </div>
  );
};

export default Header;
