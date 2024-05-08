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
  const [filterUpload, setFilterUpload] = useState("desc");
  const [filterDelete, setFilterDelete] = useState("desc");
  const [searchUpload, setSearchUpload] = useState(0);
  const [searchDelete, setSearchDelete] = useState(0);
  const [keywordDelete, setKeywordDelete] = useState("");
  const [keywordUpload, setKeywordUpload] = useState("");

  useEffect(() => {
    getToken();
  }, [
    pageUpdate,
    pageHapus,
    filterUpload,
    filterDelete,
    searchUpload,
    searchDelete,
  ]);

  const getToken = async () => {
    const token = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/token`,
      {
        withCredentials: true,
      }
    );
    jwt = token.data.accessToken;
    
    if (searchUpload == 0) {
      if (filterUpload == "week") {
        const historyUpload = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/last7DaysUploads?page=${pageUpdate}&pageSize=7&order=desc`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        setUpdok(historyUpload);
      } else {
        const historyUpload = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/historyUpload?page=${pageUpdate}&pageSize=7&order=${filterUpload}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        setUpdok(historyUpload);
      }
    } else {
      const historyUpload = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/searchHistoryUploads?search=${keywordUpload}&order=${filterUpload}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setUpdok(historyUpload);
    }
    
    if (searchDelete == 0) {
      if (filterDelete == "week") {
        const historyDelete = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/last7DaysDeletes?page=${pageHapus}&pageSize=7&order=asc`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        setDeldok(historyDelete);
      } else {
        const historyDelete = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/historyDelete?page=${pageHapus}&pageSize=7&order=${filterDelete}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        setDeldok(historyDelete);
      }
    } else {
      const historyDelete = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/searchHistoryDeletes?search=${keywordDelete}&order=${filterDelete}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setDeldok(historyDelete);
    }

    const allPage = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/totalPages?pageSize=7`,
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
          setSearchUpload={setSearchUpload}
          setKeywordUpload={setKeywordUpload}
        />
        <Hapus
          data={deldok.data}
          total={totalPage.data}
          pageHapus={pageHapus}
          setPageHapus={setPageHapus}
          setFilterDelete={setFilterDelete}
          setSearchDelete={setSearchDelete}
          setKeywordDelete={setKeywordDelete}
        />
      </div>
    </div>
  );
};

export default Page;
