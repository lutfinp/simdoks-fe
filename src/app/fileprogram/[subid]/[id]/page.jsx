"use client";

import React, { useState, useEffect } from "react";
import SideBar from "@/components/SideBar";
import NavCategory from "@/components/NavCategory";
import ListFile from "@/components/ListFile/index.jsx";
import axios from "axios";

const Page = ({ params: { subid, id } }) => {
  let jwt;

  const [file, setFile] = useState("");
  const [folsubprogram, setFolsubprogram] = useState("");
  const [folprogram, setFolprogram] = useState("");
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
    const folderProgram = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/programType/${id}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setFolprogram(folderProgram);

    const info = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const username = info?.data.username;
    if (username == "program") {
      setAccess("true");
    }

    if(filter == "all"){
      const file = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/programs`,
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/programs`,
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
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/programs/filter?typeId=${id}&subtypeId=${subid}&years=${filter}`,
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );
          setFile(Filter);
    }


    const folderSubProgram = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/programSubtype/${subid}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setFolsubprogram(folderSubProgram);

    if (selectedFileId) {
      const fileUrlResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/program/${selectedFileId}`,
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
        <SideBar activePage="program" />
      </div>
      <div className="w-full bg-gray-50">
        <div className="ml-[32px] mr-[32px] my-4 flex flex-col gap-3">
          <section>
            <div>
              <NavCategory
                judul={folsubprogram.data}
                add={access}
                filteron="true"
                setFilter={setFilter}
                id={id}
                subid={subid}
                searchfile="Program"
                api="program"
                direct="program"
              />
            </div>
          </section>
          <div className="pt-2">
            <ListFile
              data={file.data}
              id={id}
              subid={subid}
              handleFileClick={handleFileClick}
              fileUrl={fileUrl}
              fileName={fileName}
              api="program"
              direct="program"
              fileID={selectedFileId}
              access={access}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
