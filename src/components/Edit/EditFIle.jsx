import axios from "axios";
import { useState, useRef } from "react";
import ConfirmationPopUp from "../ConfrimEdit/ConfirmationPopUp";
import { generateBarcodeUrl } from "../ConfrimAdd/Untils";


const EditFile = ({onClose, api, selectedFileId, subid, id, direct}) => {
  
  let jwt;
  const [nama, setNama] = useState("");
  const [startDate, setStartDate] = useState("");
  const [file, setFile] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const barcodeRef = useRef(null);
  const [BarcodeUrl, setBarcodeUrl] = useState("");
  const [BarcodeData, setBarcodeData] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nama || !startDate || !file) {
      alert("Please fill in all fields");
      return;
    }
    setShowConfirmation(true);
    generateBarcode();
    };

    const handleConfirmation =  async () =>{
    if(confirm){
      if(id != null && subid != null){
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
  
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/${api}/${selectedFileId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        onClose();
        window.location.href = `/file${direct}/${subid}/${id}`;
      } catch (error) {
        console.log("Error adding document:", error);
      }
    }
    else if(id != null && subid == null)
    {
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
        formData.append("file", file);
  
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/${api}/${selectedFileId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        onClose();
        window.location.href = `/${direct}/${id}`;
      } catch (error) {
        console.log("Error adding document:", error);
      }
    }
    else if(id == null && subid == null){
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
        formData.append("file", file);
  
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/${api}/${selectedFileId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        onClose();
        window.location.href = `/file${direct}`;
      } catch (error) {
        console.log("Error adding document:", error);
      }
    }

};
};

const generateBarcode = () => {
  try {
    setBarcodeData(`http://localhost:8000/file/${api}s/${nama}`);
    const Data = generateBarcodeUrl(BarcodeData);
    setBarcodeUrl(Data);
    console.log("barcode data "+BarcodeData)
    console.log("barcode url "+BarcodeUrl)
  } catch (error) {
    console.error("Error generating dummy barcode:", error);
  }
}; 

return(
    <div>
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-md">
      <div className="bg-white p-8 rounded-2xl shadow-md">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Edit Dokumen</h1>
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
            Edit Dokumen
            <input
              className="border rounded w-full py-2 px-3"
              type="file"
              name="file"
              onChange={handleFileChange}
            />
          </label>
          <label className="block mb-4">
            Awal Berlaku DOkumen
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
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
    {showConfirmation && (
      <ConfirmationPopUp
        onConfirm={handleConfirmation}
        onCancel={() => setShowConfirmation(false)}
        BarcodeUrl={BarcodeUrl}
        barcodeRef={barcodeRef}
      />
    )}
    </div>
);
};
export default EditFile;