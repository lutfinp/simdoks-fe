"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Content from "./content";

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

  return (
    <>
      <Content data={notification.data} />
    </>
  );
};

export default NotificationPopup;
