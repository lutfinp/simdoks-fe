"use client";

import React, { useState, useEffect } from "react";
import SideBar from "@/components/SideBar";
import NavCategory from "@/components/NavCategory";
import ListFile from "@/components/ListFile";
import axios from "axios";

const Page = ({ params: { id } }) => {
  let jwt;

  const [file, setFile] = useState("");
  const [folkepegawain, setFolkepegawain] = useState("");
  const [selectedFileId, setSelectedFileId] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handleFileClick = (event, fileId) => {
    event.preventDefault();
    setSelectedFileId(fileId);
  };

  useEffect(() => {
    getToken();
  }, [selectedFileId]);
  const getToken = async () => {
    const token = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/token`,
      {
        withCredentials: true,
      }
    );
    jwt = token.data.accessToken;

    const folderKepegawaian = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/archiveType/${id}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setFolkepegawain(folderKepegawaian);

    const file = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/archives`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setFile(file);
    
    if(selectedFileId){    
        const fileUrlResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/archive/${selectedFileId}`,
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );
            
      setFileUrl(fileUrlResponse.data.file_url);
    };
  };
  return (
    <div className="flex flex-row gap-2">
      <div className="text-gray-700 h-screen w-[249px]">
        <SideBar activePage="Arsip" />
      </div>
      <div className="w-full bg-gray-50">
        <div className="ml-[32px] mr-[32px] my-4 flex flex-col gap-3">
          <section>
            <div>
              <NavCategory judul={folkepegawain.data} add="true" id={id} api="archive" donthassubfolder="true"/>
            </div>
          </section>
          <div className="pt-2">
            <ListFile data={file.data} id={id}  handleFileClick={handleFileClick} fileUrl={fileUrl} api="archive" fileID={selectedFileId}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
