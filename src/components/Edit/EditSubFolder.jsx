import axios from "axios";
import { useState} from "react";

const EditSubFolder = ({ onClose, api, selectedFolderId, direct, subid, id }) => {
  let jwt;
  const [subtypeName, setsubtypeName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subtypeName) {
      alert("Please fill in all fields");
      return;
    } else {
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
        formData.append("typeId", id);
        formData.append("subtypeName", subtypeName);

        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/${api}type/${selectedFolderId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        window.location.href = `/${direct}/${id}`;
        onClose();
      } catch (error) {
        console.log("Error adding document:", error);
      }
    }
  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-md">
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Rename Folder</h1>
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
              Nama Folder
              <input
                className="border rounded w-full py-2 px-3"
                type="text"
                name="subtypeName"
                onChange={(e) => setsubtypeName(e.target.value)}
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
export default EditSubFolder;
