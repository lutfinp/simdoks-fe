  "use client";

<<<<<<< HEAD:src/components/notification/index.jsx
  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import Content from "./content";
=======
import React, { useState, useEffect } from "react";
import axios from "axios";
import Content from "./Content";
>>>>>>> ab89df21fd8ee982f133702e2ce4d355f3d0d39d:src/components/NotificationPopup/index.jsx

  const NotificationPopup = () => {
    const [notification, setNotification] = useState([]);
    let jwt;

    useEffect(() => {
      getToken();
    }, []);

    const getToken = async () => {
      const token = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/token`,
        {
          withCredentials: true,
        }
      );
      jwt = token.data.accessToken;
      getNotification();
    };

    const getNotification = async () => {
      const dataNotification = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications?order=desc`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setNotification(dataNotification);
    };
    const hasUnreadNotifications = useMemo(() => {
      return data.some(notification => notification.isRead === 0);
    }, [data]);

    return (
      <>
        <Content data={notification.data} />
      </>
    );
  };

  export default NotificationPopup;
