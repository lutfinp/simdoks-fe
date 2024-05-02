"use client";

import React, { useState, useEffect } from "react";
import SideBar from "@/components/SideBar";
import NavCategory from "@/components/NavCategory";
import ListFolder from "@/components/ListFolder";
import axios from "axios";

const Page = ({ params: { id } }) => {
  let jwt
  const [folsubBarang, setFolsubBarang] = useState("");
  const [folBarang, setFolBarang] = useState("");

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

    const folderBarang = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/itemType/${id}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setFolBarang(folderBarang);

    const folderSubBarang = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/itemSubtypes`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setFolsubBarang(folderSubBarang);
  };

  return (
    <div className="flex flex-row gap-2">
      <div className="text-gray-700 h-screen w-[249px]">
        <SideBar activePage="barang" />
      </div>
      <div className="w-full bg-gray-50">
        <div className="ml-[32px] mr-[32px] my-4 flex flex-col gap-3">
          <section>
            <div>
              <NavCategory judul={folBarang.data} id={id} vardumb="Barang" api="itemSub" direct="subbarang" add={true} />
            </div>
          </section>
          <div className="pt-2">
            <ListFolder data={folsubBarang.data} id={id} file="item" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
