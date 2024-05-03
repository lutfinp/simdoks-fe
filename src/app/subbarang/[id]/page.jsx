"use client";

import React, { useState, useEffect } from "react";
import SideBar from "@/components/SideBar";
import NavCategory from "@/components/NavCategory";
import ListFolder from "@/components/ListFolder";
import ListFile from "@/components/ListFile";
import axios from "axios";

const Page = ({ params: { id   } }) => {
  let jwt
  
  const [folsubbarang, setFolsubbarang] = useState([]);
  const [folbarang, setFolbarang] = useState("");
  const [file, setFile] = useState("");
  const [currentType, setCurrentType] = useState("");
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
    setCurrentType(folderBarang.data.current);
 

    const folderSubbarang = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/itemSubtypes`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setFolsubbarang(folderSubbarang);

    const file = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/items`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setFile(file);

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
  if(currentType == true){
  return (
    <div className="flex flex-row gap-2">
      <div className="text-gray-700 h-screen w-[249px]">
        <SideBar activePage="item" />
      </div>
      <div className="w-full bg-gray-50">
        <div className="ml-[32px] mr-[32px] my-4 flex flex-col gap-3">
          <section>
            <div>
              <NavCategory judul={folbarang.data} id={id} vardumb="Barang" api="barangSub" direct="subbarang" add={true} />
            </div>
          </section>
          <div className="pt-2">
            <ListFolder data={folsubbarang.data} id={id} file="barang" />
          </div>
        </div>
      </div>
    </div>
  );
}
else {
  return (
    <div className="flex flex-row gap-2">
      <div className="text-gray-700 h-screen w-[249px]">
        <SideBar activePage="item" />
      </div>
      <div className="w-full bg-gray-50">
        <div className="ml-[32px] mr-[32px] my-4 flex flex-col gap-3">
          <section>
            <div>
              <NavCategory judul={folbarang.data} add="true" id={id} api="item" vardumb="FileBarang" direct="barang" donthassubfolder="true"/>
            </div>
          </section>
          <div className="pt-2">
            <ListFile data={file.data} id={id} handleFileClick={handleFileClick} fileUrl={fileUrl} api="item" fileID={selectedFileId}/>
          </div>
        </div>  
      </div>
    </div>
  );
}
};

export default Page;
