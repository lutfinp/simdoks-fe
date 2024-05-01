"use client";

import React, { useEffect, useState } from "react";
import Hapus from "@/components/Hapus";
import SideBar from "@/components/SideBar";
import Update from "@/components/Update";
import axios from "axios";

const Page = () => {
  let jwt;
  const [updok, setUpdok] = useState("");
  const [deldok, setDeldok] = useState("");
  const [totalPage, setTotalPage] = useState("");
  const [pageUpdate, setPageUpdate] = useState(1);
  const [pageHapus, setPageHapus] = useState(1);
  const [filterUpload, setFilterUpload] = useState("asc");
  const [filterDelete, setFilterDelete] = useState("asc");

  useEffect(() => {
    getToken();
  }, [pageUpdate, pageHapus, filterUpload, filterDelete]);

  const getToken = async () => {
    const token = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/token`,
      {
        withCredentials: true,
      }
    );
    jwt = token.data.accessToken;

    if (filterUpload == "desc" || "asc") {
      const historyUpload = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/historyUpload?page=${pageUpdate}&pageSize=10&order=${filterUpload}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setUpdok(historyUpload);
    } else {
      const historyUpload = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/last7DaysUploads?page=${pageUpdate}&pageSize=10&order=asc`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setUpdok(historyUpload);
    }

    if (filterDelete == "desc" || "asc") {
      const historyDelete = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/historyDeletes?page=${pageHapus}&pageSize=10&order=${filterDelete}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setDeldok(historyDelete);

    } else {
      const historyDelete = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/last7DaysDeletes?page=${pageUpdate}&pageSize=10&order=asc`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setUpdok(historyDelete);
    }

    const allPage = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/totalPages?pageSize=10`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setTotalPage(allPage);
  };

  return (
    <div className="flex flex-row gap-2">
      <div className="text-gray-700 h-screen w-[249px]">
        <SideBar activePage="histori" />
      </div>
      <div className="w-full bg-gray-50 divide-y-2">
        <Update
          data={updok.data}
          total={totalPage.data}
          pageUpdate={pageUpdate}
          setPageUpdate={setPageUpdate}
          setFilterUpload={setFilterUpload}
        />
        <Hapus
          data={deldok.data}
          total={totalPage.data}
          pageHapus={pageHapus}
          setPageHapus={setPageHapus}
          setFilterDelete={setFilterDelete}
        />
      </div>
    </div>
  );
};

export default Page;
