import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const TambahDokumen = ({ onClose, id, subid }) => {
  let jwt;

  const [nama, setNama] = useState("");
  const [startDate, setStartDate] = useState("");
  const [file, setFile] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    console.log(subid, id);
    e.preventDefault();
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

      const formData = new FormData();
      formData.append("nama", nama);
      formData.append("startDate", startDate);
      formData.append("typeId", id);
      formData.append("subtypeId", subid);
      formData.append("file", file);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/accreditation`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log("Document added successfully:", response.data);
      window.location.href = `/fileakreditasi/${subid}/${id}`;
      onClose();
    } catch (error) {
      console.log("Error adding document:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-md">
      <div className="bg-white p-8 rounded-2xl shadow-md">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Tambah Dokumen</h1>
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
              name="nama"
              onChange={(e) => setNama(e.target.value)}
            />
          </label>
          <label className="block mb-4 font-bold">
            Tambah Dokumen
            <input
              className="border rounded w-full py-2 px-3"
              type="file"
              name="file"
              onChange={handleFileChange}
            />
          </label>
          <label className="block mb-4">
            Start Date:
            <input
              className="border rounded w-full py-2 px-3"
              type="date"
              name="startDate"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>

          <div className="flex justify-center mt-8">
            <button
              className="flex justify-center bg-blue-500 text-white py-2 px-4 rounded"
              type="submit"
            >
              Tambahkan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahDokumen;
