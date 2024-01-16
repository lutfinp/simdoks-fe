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

  useEffect(() => {
    getToken();
  }, []);
  const getToken = async () => {
    const token = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/token`,
      {
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

    const file = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/programs`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setFile(file);

    const folderSubProgram = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/accreditationSubtype/${subid}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setFolsubprogram(folderSubProgram);
  };
  return (
    <div className="flex flex-row gap-2">
      <div className="text-gray-700 h-screen w-[249px]">
        <SideBar activePage="Program" />
      </div>
      <div className="w-full bg-gray-50">
        <div className="ml-[32px] mr-[32px] my-4 flex flex-col gap-3">
          <section>
            <div>
              <NavCategory judul={folsubprogram.data} add="true" id={id} subid={subid}/>
            </div>
          </section>
          <div className="pt-2">
            <ListFile data={file.data} id={id} subid={subid} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;