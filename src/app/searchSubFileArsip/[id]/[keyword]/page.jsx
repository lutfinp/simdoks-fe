"use client";

import React, { useState, useEffect } from "react";
import SideBar from "@/components/SideBar";
import NavCategory from "@/components/NavCategory";
import ListFile from "@/components/ListFile";
import axios from "axios";

const Page = ({ params: { id, keyword } }) => {
  let jwt;
  const [folarsip, setFolarsip] = useState("");
  const [file, setFile] = useState("");
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

    const folderArsip = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/archiveType/${id}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setFolarsip(folderArsip);


        

    const file = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/archives/search?typeId=${id}&search=${keyword}`,
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
        <SideBar activePage="arsip" />
      </div>
      <div className="w-full bg-gray-50">
        <div className="ml-[32px] mr-[32px] my-4 flex flex-col gap-3">
          <section>
            <div>
            <NavCategory judul={folarsip.data} id={id} vardumb="FileArsip" api="archive" direct="arsip" add={true}/>
            </div>
          </section>
          <div className="pt-2">
            <ListFile data={file.data} id={id} handleFileClick={handleFileClick} fileUrl={fileUrl} api="archive" fileID={selectedFileId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
