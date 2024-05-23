"use client";

import React, { useState, useEffect } from "react";
import SideBar from "@/components/SideBar";
import NavCategory from "@/components/NavCategory";
import ListFile from "@/components/ListFile";
import axios from "axios";

const Page = ({ params: { subid, id } }) => {
  let jwt;

  const [file, setFile] = useState("");
  const [folsubakre, setFolsubakre] = useState("");
  const [folakre, setFolakre] = useState("");
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
    const folderAkre = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/itemType/${id}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setFolakre(folderAkre);

    const info = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const username = info?.data.username;
    if (username == "barang") {
      setAccess("true");
    }

    if (filter == "all") {
      const file = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/items`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setFile(file);
    } else if (filter == "Semua") {
      const Filter = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/items`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setFile(Filter);
    } else {
      const Filter = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/getitem/year?typeId=${id}&subtypeId=${subid}&years=${filter}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setFile(Filter);
    }

    const folderSubAkre = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/itemSubtype/${subid}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setFolsubakre(folderSubAkre);

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
                judul={folsubakre.data}
                add={access}
                filteron="true"
                setFilter={setFilter}
                subid={subid}
                id={id}
                api="item"
                searchfile="Barang"
                direct="barang"
              />
            </div>
          </section>
          <div className="pt-2">
            <ListFile
              data={file.data}
              id={id}
              subid={subid}
              handleFileClick={handleFileClick}
              fileName={fileName}
              fileUrl={fileUrl}
              api="item"
              fileID={selectedFileId}
              direct="barang"
              access={access}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
