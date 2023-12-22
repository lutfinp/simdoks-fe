"use client";

import React, { useEffect, useState } from "react";
import Category from "@/components/Category";
import Deleted from "@/components/Deleted";
import Navbar from "@/components/Navbar";
import Reminder from "@/components/Reminder";
import SideBar from "@/components/SideBar";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function Page() {
  const [nama, setNama] = useState("");
  const [cat, setcat] = useState("");
  let jwt
  

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
    jwt = token.data.accessToken
    const decoded = jwtDecode(token.data?.accessToken);
    setNama(decoded.username);

    const category = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setcat(category)
  };

  return (
    <div className="flex flex-row gap-2">
      <div className="text-gray-700 h-screen w-[249px]">
        <SideBar activePage="dashboard" />
      </div>
      <div className="w-full bg-gray-50">
        <div className="ml-[32px] mr-[32px] my-4 flex flex-col gap-3">
          <section>
            <div>
              <Navbar data={nama} />
            </div>
          </section>
          <div>
            <Reminder />
          </div>
          <div className="flex flex-col gap-7 divide-y-2">
            <div>
              <Category data={cat.data} />
            </div>
            <div>
              <Deleted />
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
