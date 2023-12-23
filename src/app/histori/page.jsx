"use client"

import React, { useEffect, useState } from "react";
import Hapus from "@/components/Hapus";
import SideBar from "@/components/SideBar";
import Update from "@/components/Update";
import axios from "axios";

const Page = () => {
  let jwt;
  const [hisdat, setHidat] = useState("")

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

    const history = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/historyUpload`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setHidat(history)

  };

  return (
    <div className="flex flex-row gap-2">
      <div className="text-gray-700 h-screen w-[249px]">
        <SideBar activePage="histori" />
      </div>
      <div className="w-full bg-gray-50 divide-y-2">
        <Update data={hisdat.data} />
        <Hapus />
      </div>
    </div>
  );
};

export default Page;
