"use client";

import React, { useState, useEffect } from "react";
import SideBar from "@/components/SideBar";
import NavCategory from "@/components/NavCategory";
import ListFolder from "@/components/ListFolder";
import axios from "axios";

const Page = ({ params: { id,keyword } }) => {
  let jwt
  const [folsubArsip, setFolsubArsip] = useState("");
  const [folArsip, setFolArsip] = useState("");

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

    const folderArsip = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/archiveType/${id}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setFolArsip(folderArsip);

    const folderSubArsip = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/archiveSubtypes/search?typeId=${id}&search=${keyword}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setFolsubArsip(folderSubArsip);
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
            <NavCategory judul={folArsip.data} id={id} add={true} vardumb="Arsip" api="archiveSub" direct="subarsip" />
            </div>
          </section>
          <div className="pt-2">
            <ListFolder data={folsubArsip.data} id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
