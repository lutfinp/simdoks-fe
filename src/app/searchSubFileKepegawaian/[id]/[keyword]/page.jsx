"use client";

import React, { useState, useEffect } from "react";
import SideBar from "@/components/SideBar";
import NavCategory from "@/components/NavCategory";
import ListFile from "@/components/ListFile";
import axios from "axios";

const Page = ({ params: { id, keyword } }) => {
  let jwt;
  const [folkepegawain, setFolkepegawain] = useState("");
  const [file, setFile] = useState("");
  const [selectedFileId, setSelectedFileId] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [access, setAccess] = useState("false");

  const handleFileClick = (event, fileId) => {
    event.preventDefault();
    setSelectedFileId(fileId);
  };

  useEffect(() => {
    getToken();
  }, [selectedFileId]);

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
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/staffType/${id}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setFolkepegawain(folderKepegawaian);

    const info = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const username = info?.data.username;
    if (username == "kepegawaian") {
      setAccess("true");
    }

    const file = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/staffs/search?typeId=${id}&search=${keyword}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setFile(file);

    if (selectedFileId) {
      const fileUrlResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/staff/${selectedFileId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      setFileUrl(fileUrlResponse.data.file_url);
      setFileName(fileUrlResponse.data.file_name);
    }
  };
  return (
    <div className="flex flex-row gap-2">
      <div className="text-gray-700 h-screen w-[249px]">
        <SideBar activePage="kepegawain" />
      </div>
      <div className="w-full bg-gray-50">
        <div className="ml-[32px] mr-[32px] my-4 flex flex-col gap-3">
          <section>
            <div>
              <NavCategory
                judul={folkepegawain.data}
                id={id}
                vardumb="FileKepegawaian"
                api="staff"
                direct="filekepegawaian"
                add={access}
                donthassubfolder="true"
                keyword={keyword}
              />
            </div>
          </section>
          <div className="pt-2">
            <ListFile
              data={file.data}
              id={id}
              handleFileClick={handleFileClick}
              fileUrl={fileUrl}
              fileName={fileName}
              api="staff"
              fileID={selectedFileId}
              direct="filekepegawaian"
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
