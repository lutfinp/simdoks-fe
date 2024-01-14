"use client";

import React, { useState, useEffect } from "react";
import SideBar from "@/components/SideBar";
import NavCategory from "@/components/NavCategory";
import ListFolder from "@/components/ListFolder";
import axios from "axios";

const Page = ({ params: { id, keyword } }) => {
  console.log(id, keyword);
  let jwt;
  const [folsubakre, setFolsubakre] = useState("");
  const [folakre, setFolakre] = useState("");

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

    const folderAkre = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/accreditationType/${id}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setFolakre(folderAkre);

    const folderSubAkre = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/accreditationSubtypes/search?typeId=${id}&search=${keyword}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setFolsubakre(folderSubAkre);
  };
  return (
    <div className="flex flex-row gap-2">
      <div className="text-gray-700 h-screen w-[249px]">
        <SideBar activePage="akreditasi" />
      </div>
      <div className="w-full bg-gray-50">
        <div className="ml-[32px] mr-[32px] my-4 flex flex-col gap-3">
          <section>
            <div>
              <NavCategory judul={folakre.data} vardumb="Akre" />
            </div>
          </section>
          <div className="pt-2">
            <ListFolder data={folsubakre.data} id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
