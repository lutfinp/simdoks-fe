import React, { useState } from 'react';

const dummyNotifications = [
  { id: 1, message: 'Notification 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.sdfkljgklsjalfdjlkjasldfkjaskldjflkasjdlfkjaskdfja;sldfjlasjdjkfhaslkdlhfkasl asdhgfjasgdfhjgasjh bsdhjfgasdjfga bsdjfhaskjdfhjkas dasfkhadskjfh shkdfkashdfk' },
  { id: 2, message: 'Notification 2: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { id: 3, message: 'Notification 3: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
  { id: 4, message: 'Notification 4: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
  { id: 5, message: 'Notification 5: Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
  { id: 6, message: 'Notification 6: Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { id: 7, message: 'Notification 7: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { id: 8, message: 'Notification 8: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
  { id: 9, message: 'Notification 9: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
  { id: 10, message: 'Notification 10: Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
];

const NotificationPopup = ({ onClose }) => {
  const [selectedNotification, setSelectedNotification] = useState(null);

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
  };

  const closeSelectedNotification = () => {
    setSelectedNotification(null);
  };

  return (
    <div className="grid grid-rows-4 gap-4 ">
      <div className="notification-popup border-b rounded absolute top-13 right-3"style={{ zIndex: selectedNotification ? 9 : 10, width:"70vh", height:"60vh" }}>
        <div className="w-full h-full bg-white rounded shadow-md overflow-y-auto">
        <div className="notification-header flex justify-between items-center p-3 bg-white border-b">
            <div className="font-bold text-xl">Notifikasi</div>
            <a href="#" className="text-sm text-gray-600 border-b border-b-black">Tandai sudah dibaca</a>
          </div>
          <div className="notification-list">
            {dummyNotifications.map((notification) => (
              <div
              key={notification.id}
              className={`notification-item bg-white p-4 rounded cursor-pointer border-b ${
                selectedNotification === notification ? 'selected' : ''
              }`}
              onClick={() => handleNotificationClick(notification)}
              >
                <div className="font-bold text-sm">{notification.message.substring(0, 30)}</div>
                <div className="text-black text-xs">{notification.message.substring(30)}</div>
              </div>
            ))}
          </div>
   
        </div>
        <button className="close-button bg-gray-600 text-white text-xs px-2 py-1 rounded absolute buttom-2 right-2" onClick={onClose}>
            Close
          </button>
      </div>

      {selectedNotification && (
        <div className="selected-notification-popup bg-gray-800 text-white p-4 rounded absolute top-0 left-0 right-0 bottom-0 z-20">
          <div className="selected-notification-content">
            <p>{selectedNotification.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPopup;