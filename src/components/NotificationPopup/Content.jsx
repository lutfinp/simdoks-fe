import React, { useState, useEffect } from "react";
import axios from "axios";

const Content = ({ data }) => {
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [jwt, setJwt] = useState("");
  const [isMarkingAllRead, setIsMarkingAllRead] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/token`,
          {
            withCredentials: true,
          }
        );
        setJwt(response.data.accessToken);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    getToken();
  }, [],);

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "id-ID",
      options
    );
    return formattedDate;
  };

  const handleNotificationClick = async (notification) => {
    setSelectedNotification(notification);
    if (!notification.isRead) {
      await markNotificationAsRead(notification.id);
    }
  };
  const markNotificationAsReadAll = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/postAllNotifications`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      window.location.reload();
  } catch (error) {
    console.error("Error menandai semua notifikasi:", error);
  } finally {
    setIsMarkingAllRead(false);
  }

  };

  const markNotificationAsRead = async (notificationId) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/notification/${notificationId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error menandai notifikasi sebagai sudah dibaca:", error);
    }
  };
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
            <a href="#"
              className="text-sm text-gray-600 border-b border-b-black font-bold"
              onClick={markNotificationAsReadAll}
              style={{
                cursor: isMarkingAllRead ? "not-allowed" : "pointer",
                opacity: isMarkingAllRead ? 0.5 : 1
              }}
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
                }${notification.isRead ? "read" : "unread"}`}
                onClick={() => {
                  handleNotificationClick(notification);
                  markNotificationAsRead(notification.id);
                }}
              >
                <div
                  className={`text-sm font-semibold ${
                    notification.isRead ? "text-gray-300" : "text-blac-1000"
                  }`}
                >
                  <p>
                    Dokumen ({notification.file_name}) berhasil di{notification.action} (
                      {formatDate(notification.createdAt)})
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
