import React, {useEffect} from "react";

import axios from "axios";

const HapusFolder = ({onConfirm, onCancel, api, selectedFolderId }) => {
    let jwt;
    useEffect(() => {
    }, []);

    const handleConfrim = async() =>{
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
              const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/${api}Type/${selectedFolderId}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                        "Content-Type": "multipart/form-data",
                      },
                      withCredentials: true,
                }
              );
              console.log("Document delete successfully:", response.data);
              onConfirm();
              window.location.reload();

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-md">
        <div className="bg-white p-8 rounded-2xl shadow-md">
            <p>Apakah anda yakin akan menghapus Folder ini?</p>
            <div className="flex justify-center space-x-10 mt-4">
            <button
                className="bg-red-500 text-white py-2 px-4 rounded"
                onClick={onCancel}
            >
                Tidak
            </button>
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={handleConfrim}
            >
                Ya
            </button>
            </div>
        </div>
        </div>
    );
}

export default HapusFolder;