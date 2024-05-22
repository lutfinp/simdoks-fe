"use client"

import { useEffect } from "react";
import axios from "axios";

const Logout = () => {
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

    const logout = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    if(logout) {
      window.location.href = "/"
    }
  }

}

export default Logout