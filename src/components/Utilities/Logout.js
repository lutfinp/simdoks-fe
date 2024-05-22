"use client"

import { useEffect } from "react";
import axios from "axios";

const Logout = () => {
  let jwt;

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const logout = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`)

    if(logout) {
      console.log(logout)
    }
  }

}

export default Logout