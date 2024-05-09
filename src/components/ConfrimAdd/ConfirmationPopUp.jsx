import React, { useEffect } from "react";
import QRCode from "react-qr-code";

const ConfirmationPopUp = ({ onConfirm, onCancel, BarcodeUrl }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-md">
      <div className="bg-white p-8 rounded-2xl shadow-md">
        <p>Apakah anda yakin akan menambah File ini?</p>
        <QRCode value={BarcodeUrl} className="w-40 h-40 mx-auto mt-4" />
        <div className="flex justify-center space-x-10 mt-4">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded"
            onClick={onCancel}
          >
            Tidak
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={onConfirm}
          >
            Ya
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopUp;
