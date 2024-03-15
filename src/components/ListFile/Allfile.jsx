import React, { useState, useRef, useEffect } from "react";
import {
  FolderNotchOpen,
  DotsThreeOutlineVertical,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import HapusFile from "@/components/DeleteFile/HapusFile";



const Allfile = ({ data, id, subid, handleFileClick, fileUrl, api, fileId }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [selectedFile, setSelectedFile] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const dropdownRef = useRef(null);
  const finalUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${fileUrl}`
  const openFileInNewTab = (finalUrl) => {
    window.open(finalUrl, "_blank");
  };

  const handleDotsClick = (event, file) => {
    event.preventDefault();
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

  
  

  

  return (
    <div className="flex-row flex flex-wrap gap-3">
      {data?.map((file, index) => {
        if (id != null) {
          if (file.typeId == id && file.subtypeId == subid) {
            const newUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${fileUrl}`
            console.log(newUrl)
            return (
        
                <div className="h-[217px] w-[230px] bg-white flex items-center justify-center">
                  <div className="flex-col flex">
                    <Image
                      className="mt-4"
                      src="/assets/files.png"
                      alt="logo"
                      width={120}
                      height={50}
                      onClick={(e) => handleFileClick(e, file.id)}
                    />
                    <Link key={index} href={newUrl} className="transition-all hover:cursor-pointer">
                    <div className="w-full mb-7 h-[30px] bg-gray-100 rounded-md">
                      <div className="flex flex-row p-1 text-sm font-semibold text-gray-700 justify-between">
                        <p>{truncateTitle(file.file_name)}</p>
                        <p>{(file.id)}</p>
                        <DotsThreeOutlineVertical
                          className="hover:text-yellow-600 cursor-pointer"
                          size={20}
                          weight="fill"
                          onClick={(e) => handleDotsClick(e, file)}
                          />
                      </div>
                    </div>
                    </Link>
                  </div>
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
            <li className="p-2 hover:bg-gray-100 cursor-pointer">Edit Dokumen</li>
            <li className="p-2 hover:bg-gray-100 cursor-pointer"onClick={handleClickDelete}>Hapus Dokumen</li>
            <li className="p-2 hover:bg-gray-100 cursor-pointer">Download Barcode</li>
          </ul>
        </div>
      )}
      {showConfirmation && (
        <HapusFile
        api={api}
        fileId={fileId}
          onConfirm={() => {
            setShowConfirmation(false);
          }}
          onCancel={() => setShowConfirmation(false)}
          />)}
    </div>
  );
};


export default Allfile;

