import React, { useState, useRef, useEffect } from "react";
import { DotsThreeOutlineVertical } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import HapusFile from "../Deleted/HapusFile";
import EditFile from "../Edit/EditFile";
import DownloadBarcode from "../Barcode/DownloadBarcode";

const Allfile = ({
  data,
  id,
  subid,
  handleFileClick,
  fileUrl,
  fileName,
  api,
  direct,
  access,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFileId, setSelectedFileId] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showConfirmationEdit, setShowConfirmationEdit] = useState(false);
  const [fileUrlBarcode, setFileUrlBarcode] = useState("");
  const dropdownRef = useRef(null);
  const [showConfirmationDownloadBarcode, setShowConfirmationDownloadBarcode] =
    useState(false);
  let permission;

  const handleDotsClick = (event, file, fileId) => {
    event.preventDefault();
    setSelectedFileId(fileId);
    const rect = event.target.getBoundingClientRect();
    setDropdownPosition({
      top: rect.top + window.scrollY + rect.height,
      left: rect.left + window.scrollX,
    });
    setSelectedFile(file);
    setShowDropdown(!showDropdown);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  const handleClickDelete = () => {
    setShowDropdown(false);
    setShowConfirmation(true);
  };
  const handleClickEdit = () => {
    setShowDropdown(false);
    setShowConfirmationEdit(true);
  };
  const handleClikcDownloadBarcode = () => {
    setShowDropdown(false);
    setFileUrlBarcode(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${fileUrl}`);
    setShowConfirmationDownloadBarcode(true);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const truncateTitle = (title) => {
    if (title.length > 18) {
      return title.slice(0, 15) + "...";
    }
    return title;
  };

  if (access == "true") {
    const MyCustomDotsComponent = (
      <DotsThreeOutlineVertical
        className="hover:text-yellow-600 cursor-pointer"
        size={20}
        weight="fill"
        onClick={(e) => handleDotsClick(e, folder, folder.id)}
      />
    );
    permission = MyCustomDotsComponent;
  } else {
    permission = null;
  }

  return (
    <div className="flex-row flex flex-wrap gap-3">
      {data?.map((file, index) => {
        if (id != null || id == null) {
          if (file.typeId == id && file.subtypeId == subid) {
            const newUrl = fileUrl
              ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${fileUrl}`
              : undefined;
            return (
              <div
                className="h-[217px] w-[230px] bg-white flex items-center justify-center"
                onClick={(e) => handleFileClick(e, file.id)}
              >
                <Link
                  key={index}
                  href={
                    fileUrl && fileUrl !== "http://localhost:8000/"
                      ? newUrl
                      : "#"
                  }
                  className={`transition-all ${
                    fileUrl && fileUrl !== "http://localhost:8000/"
                      ? "hover:cursor-pointer"
                      : ""
                  }`}
                >
                  <div className="flex-col flex">
                    <Image
                      className="mt-4"
                      src="/assets/files.png"
                      alt="logo"
                      width={120}
                      height={50}
                    />
                    <div className="w-full mb-7 h-[30px] bg-gray-100 rounded-md">
                      <div className="flex flex-row p-1 text-sm font-semibold text-gray-700 justify-between">
                        <p>{truncateTitle(file.file_name)}</p>
                        {permission}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          }
        }
      })}
      {showDropdown && (
        <div
          style={{
            position: "absolute",
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
          }}
          ref={dropdownRef}
          className="bg-white shadow-lg rounded-lg p-2"
        >
          <ul>
            <li
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={handleClickEdit}
            >
              Edit Dokumen
            </li>
            <li
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={handleClickDelete}
            >
              Hapus Dokumen
            </li>
            <li
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={handleClikcDownloadBarcode}
            >
              Download Barcode
            </li>
          </ul>
        </div>
      )}
      {showConfirmation && (
        <HapusFile
          api={api}
          selectedFileId={selectedFileId}
          onConfirm={() => {
            setShowConfirmation(false);
          }}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
      {showConfirmationEdit && (
        <EditFile
          id={id}
          subid={subid}
          api={api}
          selectedFileId={selectedFileId}
          direct={direct}
          onClose={() => {
            setShowConfirmationEdit(false);
          }}
        />
      )}
      {showConfirmationDownloadBarcode && (
        <DownloadBarcode
          fileUrlBarcode={fileUrlBarcode}
          fileName={fileName}
          onClose={() => {
            setShowConfirmationDownloadBarcode(false);
          }}
        />
      )}
    </div>
  );
};

export default Allfile;
