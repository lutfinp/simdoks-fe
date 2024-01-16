"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Content from "./content";

const NotificationPopup = () => {
  const [history, setHistory] = useState("");
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
    getHistory();
  };

  const getHistory = async () => {
    const dataHistory = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/historyUpload`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setHistory(dataHistory);
  };

  return (
    <>
      <Content data={history.data} />
    </>
  );
};

export default NotificationPopup;
