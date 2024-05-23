"use client";
import axios from "axios";
import { useState } from "react";

const Rename = ({ onClose, api, selectedFileId, subid, id, direct }) => {
  let jwt;
  const [nama, setNama] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nama) {
      alert("Please fill in all fields");
      return;
    }
    if (id != null && subid != null) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response_token = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/token`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );
        if (response_token.data && response_token.data.accessToken) {
          jwt = response_token.data.accessToken;
        } else {
          console.error("Invalid response format:", response_token);
          return;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/${api}s/rename?id=${selectedFileId}&nama=${nama}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
            withCredentials: true,
          }
        );
        onClose();
        window.location.href = `/file${direct}/${subid}/${id}`;
      } catch (error) {
        console.log("Error rename document:", error);
      }
    } else if (id != null && subid == null) {
      try {
        const response_token = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/token`,
          {
            withCredentials: true,
          }
        );
        if (response_token.data && response_token.data.accessToken) {
          jwt = response_token.data.accessToken;
        } else {
          console.error("Invalid response format:", response_token);
          return;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/${api}s/rename?id=${selectedFileId}&nama=${nama}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
            withCredentials: true,
          }
        );
        onClose();
        window.location.href = `/${direct}/${id}`;
      } catch (error) {
        console.log("Error rename document:", error);
      }
    } else if (id == null && subid == null) {
      try {
        const response_token = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/token`,
          {
            withCredentials: true,
          }
        );
        if (response_token.data && response_token.data.accessToken) {
          jwt = response_token.data.accessToken;
        } else {
          console.error("Invalid response format:", response_token);
          return;
        }

        console.log("ini jwt : ", jwt);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/${api}s/rename?id=${selectedFileId}&nama=${nama}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
            withCredentials: true,
          }
        );
        onClose();
        window.location.href = `/${direct}`;
      } catch (error) {
        console.log("Error rename document:", error);
      }
    }
  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-md">
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Rename Dokumen</h1>
            <button onClick={onClose}>
              <img
                src="/assets/close.png"
                alt="logo_close"
                className="h-12 w-12"
              />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <label className="block mb-4 font-bold">
              Nama Dokumen
              <input
                className="border rounded w-full py-2 px-3"
                type="text"
                name="typeName"
                onChange={(e) => setNama(e.target.value)}
              />
            </label>
            <div className="flex justify-center mt-8">
              <button
                className="flex justify-center bg-blue-500 text-white py-2 px-4 rounded"
                type="submit"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Rename;
