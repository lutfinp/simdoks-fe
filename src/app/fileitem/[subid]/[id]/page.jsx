"use client";

import React, { useState, useEffect } from "react";
import SideBar from "@/components/SideBar";
import NavCategory from "@/components/NavCategory";
import ListFile from "@/components/ListFile";
import axios from "axios";

const Page = ({ params: { subid, id } }) => {
  let jwt;

  const [file, setFile] = useState("");
  const [folsubbarang, setFolsubbarang] = useState("");
  const [folbarang, setFolbarang] = useState("");
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

    const folderBarang = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/itemType/${id}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setFolbarang(folderBarang);

    const file = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/items`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setFile(file);

    const folderSubBarang = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/itemSubtype/${subid}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setFolsubbarang(folderSubBarang);
    

    if(selectedFileId){    
      const fileUrlResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/item/${selectedFileId}`,
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
        <SideBar activePage="Barang" />
      </div>
      <div className="w-full bg-gray-50">
        <div className="ml-[32px] mr-[32px] my-4 flex flex-col gap-3">
          <section>
            <div>
              <NavCategory judul={folsubbarang.data} add="true" id={id} subid={subid} api="item" direct="barang" />
            </div>
          </section>
          <div className="pt-2">
            <ListFile data={file.data} id={id} subid={subid} handleFileClick={handleFileClick} fileUrl={fileUrl} api="item" fileID={selectedFileId}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;