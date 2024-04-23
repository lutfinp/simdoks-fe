"use client";

import React, { useState, useEffect } from "react";
import SideBar from "@/components/SideBar";
import NavCategory from "@/components/NavCategory";
import ListFolder from "@/components/ListFolder";
import axios from "axios";

const Page = () => {
  let jwt;
  const [folakre, setFolakre] = useState("");
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

    const folderAkre = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/accreditationTypes`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setFolakre(folderAkre);
  };

  return (
    <div className="flex flex-row gap-2">
      <div className="text-gray-700 h-screen w-[249px]">
        <SideBar activePage="akreditasi" />
      </div>
      <div className="w-full bg-gray-50">
        <div className="ml-[32px] mr-[32px] my-4 flex flex-col gap-3">
          <section>
            <div>
              <NavCategory
                judul="Akreditasi"
                add={true}
                api="accreditation"
                direct="akreditasi"
              />
            </div>
          </section>
          <div className="pt-2">
            <ListFolder
              data={folakre.data}
              sub="subakreditasi"
              handleFolderClick={handleFolderClick}
              api="accreditation"
              fileID={selectedFolderId}
              direct="akreditasi"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
