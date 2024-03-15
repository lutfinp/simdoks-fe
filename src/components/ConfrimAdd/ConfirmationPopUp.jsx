import React, { useEffect } from "react";
import JsBarcode from "jsbarcode";

const ConfirmationPopUp = ({ onConfirm, onCancel ,dummyBarcodeUrl, barcodeRef}) => {
  useEffect(() => {
    const barcodeurl = dummyBarcodeUrl;
    const barcodeElement = barcodeRef.current;
    console.log("Barcode Element:", barcodeElement);
    console.log("Barcode URL:", dummyBarcodeUrl);
    if (barcodeElement) {
      try {
        JsBarcode(barcodeElement, barcodeurl, {
          format: "CODE128",
          displayValue: false,
        });
      } catch (error) {
        console.error("Error rendering barcode:", error);
      }
    }
  }, [dummyBarcodeUrl, barcodeRef]);
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-md">
      <div className="bg-white p-8 rounded-2xl shadow-md">
        <p>Apakah anda yakin akan menambah File atau Folder ini?</p>
        <canvas ref={barcodeRef} className="w-40 h-20 border border-gray-300 mt-4 mx-auto"></canvas>
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