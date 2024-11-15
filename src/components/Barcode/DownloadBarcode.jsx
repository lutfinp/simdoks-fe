import React, { useRef } from "react";
import QRCode from "react-qr-code";
import domtoimage from "dom-to-image-more";

const DownloadBarcode = ({ onClose, fileUrlBarcode, fileName }) => {
  const barcodeRef = useRef(null);

  const onClickDownloadBarcode = () => {
    if (barcodeRef.current) {
      domtoimage.toJpeg(barcodeRef.current, { quality: 0.95, bgcolor: '#FFFFFF', width: 400, height: 400, style: { padding: '70px'}})
        .then(function (dataUrl) {
          const link = document.createElement('a');
          link.href = dataUrl;
          const baseFileName = fileName.split('.')[0];  
          link.download = `${baseFileName}.jpeg`;
          link.click();
        })
        .catch(function (error) {
          console.error('Failed to convert image:', error);
        });
    }
    onClose();
  };
  const onClickShareToWhatsApp = () => {

    const lokal = fileUrlBarcode.replaceAll(" ", "%20");
    const fileUrlBarcodeString = String(lokal);
    const encodedFileUrl = encodeURIComponent(fileUrlBarcodeString);
    const encodedFileName = encodeURIComponent(`*${fileName}*`);
    
    const whatsappUrl = `https://wa.me/?text=${encodedFileName}%0A${encodedFileUrl}`;
    
    window.open(whatsappUrl, "_blank");

  };  


  

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-md">
      <div className="bg-white p-8 rounded-2xl shadow-md relative">
        <div className="absolute top-0 right-0 mr-4">
          <button onClick={onClose}>
            <img
              src="/assets/close.png"
              alt="Close"
              className="h-8 w-8"
            />
          </button>
        </div>
        <div className="flex flex-col justify-center items-center w-[400px] h-[400px] bg-white " ref={barcodeRef} >
          <QRCode value={fileUrlBarcode} size={256}/>
          <p style={{marginTop:'10px', alignItems:'center', fontSize: '30px', fontWeight: 'bold'}}>{fileName}</p>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-blue-500 text-white  px-4 rounded"
            onClick={onClickDownloadBarcode}
          >
            Download Barcode
          </button>
          <button
            className="bg-green-500 text-white py-2 px-10 rounded"
            onClick={onClickShareToWhatsApp}
          >
            Share to WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadBarcode;
