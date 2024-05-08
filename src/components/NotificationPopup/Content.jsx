import React, { useState, useEffect } from "react";

const Content = ({ data, onClose }) => {
  const [selectedNotification, setSelectedNotification] = useState(null);

  return (
    <div className="grid grid-rows-4 gap-4 ">
      <div
        className="notification-popup border-b rounded absolute top-13 right-3 "
        style={{
          zIndex: selectedNotification ? 9 : 10,
          width: "65vh",
        }}
      >
        <div className="w-full h-full bg-white rounded shadow-md border border-gray-300">
          <div className="notification-header flex justify-between items-center p-3 bg-white border-b ">
            <div className="font-bold text-xl">Notifikasi</div>
            <a
              href="#"
              className="text-sm text-gray-600 border-b border-b-black font-bold"
            >
              Tandai sudah dibaca
            </a>
          </div>
          <div className="notification-list overflow-y-auto max-h-[60vh]">
            {data?.map((notification, index) => (
              <div
                key={index}
                className={`notification-item bg-white p-4 rounded cursor-pointer border-b ${
                  selectedNotification === notification ? "selected" : ""
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="text-gray-800 text-xs font-semibold">
                  <p>Dokumen {notification.file_name} berhasil diupload</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedNotification && (
        <div className="selected-notification-popup bg-gray-800 text-white p-4 rounded absolute top-0 left-0 right-0 bottom-0 z-20">
          <div className="selected-notification-content">
            <p>{selectedNotification.file_name}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;
