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
  const [hapus, setHapus] = useState("")
  const [pageHapus, setPageHapus] = useState(1)
  let jwt
  

  useEffect(() => {
    getToken();
  }, [pageHapus]);

  const getToken = async () => {
    const token = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/token`,
      {
        withCredentials: true,
      }
    );
    jwt = token.data.accessToken
    
    const info = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/me`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setNama(info)

    const category = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setcat(category)

    const deleted = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/getAllFilesDeletedIn7Days`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setHapus(deleted)
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
              <Navbar data={nama?.data} />
            </div>
          </section>
          {/* <div>
            <Reminder total={hapus.data?.totalFile} date={hapus.data?.data} />
          </div> */}
          <div className="flex flex-col gap-7 divide-y-2">
            <div>
              <Category data={cat?.data} />
            </div>
            <div>
              <Deleted data={hapus.data?.data}/>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
