"use client";

import React, { useState, useEffect } from "react";
import SideBar from "@/components/SideBar";
import NavCategory from "@/components/NavCategory";
import ListFolder from "@/components/ListFolder";
import ListFile from "@/components/ListFile";
import axios from "axios";
import { set } from "date-fns";

const Page = ({ params: { id } }) => {
  let jwt;

  const [folsubbarang, setFolsubbarang] = useState([]);
  const [folbarang, setFolbarang] = useState("");
  const [file, setFile] = useState("");
  const [foltypeId, setFoltypeId] = useState("");
  const [selectedFileId, setSelectedFileId] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [filter, setFilter] = useState("all");

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

    const folderBarang = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/itemType/${id}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setFolbarang(folderBarang);
    setFoltypeId(folderBarang.data.id);

    const folderSubbarang = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/itemSubtypes`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setFolsubbarang(folderSubbarang);

    if(filter == "all"){
      const file = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/items`,
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/items`,
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
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/getitem/year?typeId=${id}&years=${filter}`,
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/item/${selectedFileId}`,
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
  if (foltypeId == 1) {
    return (
      <div className="flex flex-row gap-2">
        <div className="text-gray-700 h-screen w-[249px]">
          <SideBar activePage="barang" />
        </div>
        <div className="w-full bg-gray-50">
          <div className="ml-[32px] mr-[32px] my-4 flex flex-col gap-3">
            <section>
              <div>
                <NavCategory
                  judul={folbarang.data}
                  id={id}
                  vardumb="Barang"
                  api="barangSub"
                  direct="subbarang"
                  add={true}
                />
              </div>
            </section>
            <div className="pt-2">
              <ListFolder data={folsubbarang.data} id={id} file="barang" />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row gap-2">
        <div className="text-gray-700 h-screen w-[249px]">
          <SideBar activePage="barang" />
        </div>
        <div className="w-full bg-gray-50">
          <div className="ml-[32px] mr-[32px] my-4 flex flex-col gap-3">
            <section>
              <div>
                <NavCategory
                  judul={folbarang.data}
                  add="true"
                  filteron="true"
                  setFilter={setFilter}
                  id={id}
                  api="item"
                  vardumb="FileBarang"
                  direct="subbarang"
                  donthassubfolder="true"
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
                api="item"
                fileID={selectedFileId}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Page;
