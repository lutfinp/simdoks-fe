"use client";

import React, { useState, useEffect } from "react";
import SideBar from "@/components/SideBar";
import NavCategory from "@/components/NavCategory";
import ListFile from "@/components/ListFile";
import axios from "axios";

const Page = () => {
  let jwt;
  const [file, setFile] = useState("");
  const [selectedFileId, setSelectedFileId] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [filter, setFilter] = useState("all");
  const [access, setAccess] = useState("false");

  const handleFileClick = (event, fileId) => {
    event.preventDefault();
    setSelectedFileId(fileId);
  };

  useEffect(() => {
    getToken();
  }, [selectedFileId, filter]);

  const getToken = async () => {
    const token = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/token`,
      {
        withCredentials: true,
      }
    );
    jwt = token.data.accessToken;

    const info = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const username = info?.data.username;
    if (username == "tugas") {
      setAccess("true");
    }

    if(filter == "all"){
      const file = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setFile(file);

    }
    else if(filter == "Semua" )
    {  
      const Filter = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setFile(Filter);
    }
    else{
        const Filter = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/filter?years=${filter}`,
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );
          setFile(Filter);
    }

    if (selectedFileId) {
      const fileUrlResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/task/${selectedFileId}`,
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
        <SideBar activePage="tugas" />
      </div>
      <div className="w-full bg-gray-50">
        <div className="ml-[32px] mr-[32px] my-4 flex flex-col gap-3">
          <section>
            <div>
              <NavCategory
                judul="Tugas"
                add={access}
                filteron="true"
                setFilter={setFilter}
                api="task"
                donthassubfolder="true"
                direct="filetugas"
              />
            </div>
          </section>
          <div className="pt-2">
            <ListFile
              data={file.data}
              handleFileClick={handleFileClick}
              fileUrl={fileUrl}
              fileName={fileName}
              api="task"
              fileID={selectedFileId}
              direct="filetugas"
              access={access}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
