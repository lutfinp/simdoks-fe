import QRCode from "react-qr-code";

const DownloadBarcode = ({ onClose, fileUrlBarcode }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-md">
      <div className="bg-white p-8 rounded-2xl shadow-md relative">
      <div className="absolute top-0 right-0 mr-4 ">
          <button onClick={onClose}>
            <img
              src="/assets/close.png"
              alt="logo_close"
              className="h-8 w-12\"
            />
          </button>
        </div>
        <div className="flex justify-center space-x-10 mt-4">
          <QRCode value={fileUrlBarcode} />
         
        </div>
        <div className="flex justify-center mt-8">

        <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={onClose}
          >
            Download Barcode
          </button>
        </div>
      </div>
    </div>
  );
};
export default DownloadBarcode;