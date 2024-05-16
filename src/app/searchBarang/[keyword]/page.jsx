"use client";

import React, { useState, useEffect } from "react";
import SideBar from "@/components/SideBar";
import NavCategory from "@/components/NavCategory";
import ListFolder from "@/components/ListFolder";
import axios from "axios";

const Page = ({ params: { keyword } }) => {
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
    const token = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/token`,
      {
        withCredentials: true,
      }
    );
    jwt = token.data.accessToken;

    const folderBarang = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/itemTypes/search?search=${keyword}`,
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
              <NavCategory
                judul="Barang"
                add={access}
                api="item"
                direct="barang"
                keyword={keyword}
              />
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
              keyword={keyword}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
