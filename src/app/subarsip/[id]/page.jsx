"use client";

import React, { useState, useEffect } from "react";
import SideBar from "@/components/SideBar";
import NavCategory from "@/components/NavCategory";
import ListFolder from "@/components/ListFolder";
import ListFile from "@/components/ListFile";
import axios from "axios";

const Page = ({ params: { id } }) => {
  let jwt;

  const [folsubarsip, setFolsubarsip] = useState([]);
  const [folarsip, setFolarsip] = useState("");
  const [file, setFile] = useState("");
  const [foltypeId, setFoltypeId] = useState("");
  const [selectedFileId, setSelectedFileId] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedFolderId, setSelectedFolderId] = useState("");

  const handleFileClick = (event, fileId) => {
    event.preventDefault();
    setSelectedFileId(fileId);
  };
  const handleFolderClick = (event, folderId) => {
      event.preventDefault();
      setSelectedFolderId(folderId);
    };

    useEffect(() => {
      getToken();
    }, [selectedFileId, filter, selectedFolderId]);

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
      setFoltypeId(folderArsip.data.id);

      const folderSubarsip = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/archiveSubtypes`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setFolsubarsip(folderSubarsip);

      if (filter == "all") {
        const file = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/archives`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        setFile(file);
      } else if (filter == "Semua") {
        const Filter = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/archives`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        setFile(Filter);
      } else {
        const Filter = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/getarchive/year?typeId=${id}&years=${filter}`,
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
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/archive/${selectedFileId}`,
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
    if (foltypeId == 2) {
      return (
        <div className="flex flex-row gap-2">
          <div className="text-gray-700 h-screen w-[249px]">
            <SideBar activePage="arsip" />
          </div>
          <div className="w-full bg-gray-50">
            <div className="ml-[32px] mr-[32px] my-4 flex flex-col gap-3">
              <section>
                <div>
                  <NavCategory
                    judul={folarsip.data}
                    id={id}
                    vardumb="Arsip"
                    api="archiveSub"
                    direct="subarsip"
                    add={true}
                  />
                </div>
              </section>
              <div className="pt-2">
                <ListFolder
                  data={folsubarsip.data}
                  id={id}
                  file="arsip"
                  handleFolderClick={handleFolderClick}
                  api="archiveSub"
                  fileID={selectedFolderId}
                  direct="subarsip"
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-row gap-2">
          <div className="text-gray-700 h-screen w-[249px]">
            <SideBar activePage="arsip" />
          </div>
          <div className="w-full bg-gray-50">
            <div className="ml-[32px] mr-[32px] my-4 flex flex-col gap-3">
              <section>
                <div>
                  <NavCategory
                    judul={folarsip.data}
                    add="true"
                    id={id}
                    filteron="true"
                    setFilter={setFilter}
                    api="archive"
                    vardumb="FileArsip"
                    direct="subarsip"
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
                  api="archive"
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
