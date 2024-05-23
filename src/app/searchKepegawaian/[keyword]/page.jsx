"use client";

import React, { useState, useEffect } from "react";
import SideBar from "@/components/SideBar";
import NavCategory from "@/components/NavCategory";
import ListFolder from "@/components/ListFolder";
import axios from "axios";

const Page = ({ params: { keyword } }) => {
  let jwt;
  const [folKepegawaian, setFolKepegawaian] = useState("");
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

    const folderKepegawaian = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/staffTypes/search?search=${keyword}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setFolKepegawaian(folderKepegawaian);

    const info = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const username = info?.data.username;
    if (username == "kepegawaian") {
      setAccess("true");
    }
  };

  return (
    <div className="flex flex-row gap-2">
      <div className="text-gray-700 h-screen w-[249px]">
        <SideBar activePage="kepegawaian" />
      </div>
      <div className="w-full bg-gray-50">
        <div className="ml-[32px] mr-[32px] my-4 flex flex-col gap-3">
          <section>
            <div>
              <NavCategory
                judul="Kepegawaian"
                add={access}
                api="staff"
                direct="kepegawaian"
                keyword={keyword}
              />
            </div>
          </section>
          <div className="pt-2">
            <ListFolder
              data={folKepegawaian.data}
              handleFolderClick={handleFolderClick}
              api="staff"
              fileID={selectedFolderId}
              direct="kepegawaian"
              sub="filekepegawaian"
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
