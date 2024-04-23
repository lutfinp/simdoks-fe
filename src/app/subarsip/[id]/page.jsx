"use client";

import React, { useState, useEffect } from "react";
import SideBar from "@/components/SideBar";
import NavCategory from "@/components/NavCategory";
import ListFolder from "@/components/ListFolder";
import axios from "axios";

const Page = ({ params: { id } }) => {
  let jwt;
  const [folsubarsip, setFolsubarsip] = useState("");
  const [folarsip, setFolarsip] = useState("");
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

    const folderarsip = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/archiveType/${id}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setFolarsip(folderarsip);

    const folderSubarsip = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/archiveSubtypes`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setFolsubarsip(folderSubarsip);
  };

  return (
    <div className="flex flex-row gap-2">
      <div className="text-gray-700 h-screen w-[249px]">
        <SideBar activePage="arsip" />
      </div>
      <div className="w-full bg-gray-50">
        <div className="ml-[32px] mr-[32px] my-4 flex flex-col gap-3">
          <section>
            <div>
              <NavCategory
                judul={folarsip.data}
                id={id}
                vardumb="Arsip"
                api="archiveSub"
                direct="subarsip"
                add={true}
              />
            </div>
          </section>
          <div className="pt-2">
            <ListFolder
              data={folsubarsip.data}
              id={id}
              handleFolderClick={handleFolderClick}
              api="archiveSub"
              fileID={selectedFolderId}
              direct="subarsip"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
