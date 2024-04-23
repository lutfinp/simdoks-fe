"use client";

import React, { useState, useEffect } from "react";
import SideBar from "@/components/SideBar";
import NavCategory from "@/components/NavCategory";
import ListFolder from "@/components/ListFolder";
import axios from "axios";

const Page = () => {
  let jwt;
  const [folKeuangan, setFolKeuangan] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState("");

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

    const folderKeuangan = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/financeTypes`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setFolKeuangan(folderKeuangan);
  };

  return (
    <div className="flex flex-row gap-2">
      <div className="text-gray-700 h-screen w-[249px]">
        <SideBar activePage="keuangan" />
      </div>
      <div className="w-full bg-gray-50">
        <div className="ml-[32px] mr-[32px] my-4 flex flex-col gap-3">
          <section>
            <div>
              <NavCategory
                judul="Keuangan"
                add={true}
                api="finance"
                direct="keuangan"
              />
            </div>
          </section>
          <div className="pt-2">
            <ListFolder
              data={folKeuangan.data}
              sub="subkeuangan"
              handleFolderClick={handleFolderClick}
              api="finance"
              fileID={selectedFolderId}
              direct="keuangan"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
