"use client";
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const imagePathLogo = "/assets/simdoks_logodantulisan.png";
const imagePathAsset = "/assets/asset_login.png";

const FormLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const Auth = async (e) => {
    e.preventDefault();
    try {
      console.log("Mengirim permintaan login:", username, password);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`,
        {
          username,
          password,
        },
        {
          withCredentials : true
        }
      );

      console.log("Login berhasil!", response.data);
      // Set cookie dengan nama 'token' dan isi dari response.data.accessToken
      Cookies.set("token", response.data.accessToken);
      window.location.href = "./dashboard";
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setMsg(error.response.data.message);
        alert("Gagal melakukan login! " + msg);
      } else {
        setMsg("Terjadi kesalahan yang tidak terduga.");
        alert("Gagal melakukan login!" + msg);
      }
    }
  };

  return (
    <div className="flex h-screen">
      <div
        className="flex-1 bg-cover bg-center h-screen flex items-center justify-center"
        style={{ backgroundImage: "url('/assets/Login.jpg')" }}
      >
        <div className="absolute left-4 bottom-4" style={{ zIndex: 2 }}>
          <img src={imagePathAsset} alt="asset_login" className="w-72 h-auto" />
        </div>
        <div
          className="w-full max-w-xl p-20 bg-white bg-opacity-30 rounded-l-[30px] shadow-md"
          style={{ zIndex: 3 }}
        >
          <h1 className="text-2xl font-bold mb-4 text-white mt-14">
            Selamat Datang
          </h1>
          <p className="text-sm text-white mb-10">
            Masukan username dan password anda untuk login
          </p>
          <form onSubmit={Auth}>
            <div className="relative mb-2">
              <label htmlFor="Username" className="text-white mb-2 block">
                Username
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md mb-2"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="relavite mb-8">
              <label htmlFor="Password" className="text-white mb-2 block">
                Password
              </label>
              <input
                type="password"
                className="w-full p-2 border rounded-md mb-4"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded-md mb-16 hover:bg-white hover:text-black"
            >
              Masuk
            </button>
          </form>
        </div>
        <div className="w-full max-w-xl p-40 bg-white rounded-r-[30px] shadow-md">
          <div className="relative mb-78">
            <img src={imagePathLogo} alt="simdoks_logo" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormLogin;
