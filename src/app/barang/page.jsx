"use client";

import React, { useState, useEffect } from "react";
import SideBar from "@/components/SideBar";
import NavCategory from "@/components/NavCategory";
import ListFolder from "@/components/ListFolder";
import axios from "axios";

const Page = () => {
  let jwt;
  const [folBarang, setFolBarang] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState("");
  const [access, setAccess] = useState("false");

  const handleFolderClick = (event, folderId) => {
    event.preventDefault();
    setSelectedFolderId(folderId);
  };

  useEffect(() => {
    getToken();
  }, [selectedFolderId]);

  const getToken = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const token = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/token`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      }
    );
    jwt = token.data.accessToken;

    const folderBarang = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/itemTypes`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setFolBarang(folderBarang);

    const info = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const username = info?.data.username;
    if (username == "barang") {
      setAccess("true");
    }
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
              <NavCategory judul="Barang" api="item" direct="barang" />
            </div>
          </section>
          <div className="pt-2">
            <ListFolder
              data={folBarang.data}
              sub="subbarang"
              handleFolderClick={handleFolderClick}
              api="item"
              fileID={selectedFolderId}
              direct="barang"
              access={access}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
