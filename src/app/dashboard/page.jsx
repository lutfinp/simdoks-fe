"use client"

import Category from "@/components/Category";
import Deleted from "@/components/Deleted";
import Navbar from "@/components/Navbar";
import Reminder from "@/components/Reminder";
import SideBar from "@/components/SideBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function Page() {
  const [name, setName] = useState("")
  const [token, setToken] = useState("")

  useEffect(() => {
    refreshToken()
  },[])

  const refreshToken = async() => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/token`, {
        headers:{
          
        }
      })
      console.log(response.data.accessToken)
      setToken(response.data.accessToken)
      
    } catch (error) {
      
    }
  }

  return (
    <div className="flex flex-row gap-2">
      <div className="text-gray-700 h-screen w-[249px]">
        <SideBar activePage="dashboard" />
      </div>
      <div className="w-full bg-gray-50">
        <div className="ml-[32px] mr-[32px] my-4 flex flex-col gap-3">
          <div>
            <Navbar />
          </div>
          <div>
            <Reminder />
          </div>
          <div className="flex flex-col gap-7 divide-y-2">
            <div>
              <Category />
            </div>
            <div>
              <Deleted />
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
