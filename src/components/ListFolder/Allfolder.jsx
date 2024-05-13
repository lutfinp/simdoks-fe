import React from "react";
import { useState, useRef, useEffect } from "react";
import { DotsThreeOutlineVertical } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import HapusFolder from "../Deleted/HapusFolder";
import EditFolder from "../Edit/EditFolder";
import HapusSubFolder from "../Deleted/HapusSubFolder";
import EditSubFolder from "../Edit/EditSubFolder";

const Allfolder = ({ data, id, file, sub, api, direct, access }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [selectedFolder, setSelectedFolder] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showConfirmationEdit, setShowConfirmationEdit] = useState(false);
  const dropdownRef = useRef(null);

  const handleDotsClick = (event, folder, folderId) => {
    event.preventDefault();
    setSelectedFolderId(folderId);
    const rect = event.target.getBoundingClientRect();
    setDropdownPosition({
      top: rect.top + window.scrollY + rect.height,
      left: rect.left + window.scrollX,
    });
    setSelectedFolder(folder);
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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const truncateTitle = (title) => {
    if (title.length > 20) {
      return title.slice(0, 20) + "...";
    }
    return title;
  };

  const manageAccess = (folder) => {
    if (access == "true") {
      return (
        <DotsThreeOutlineVertical
          className="hover:text-yellow-600 cursor-pointer"
          size={20}
          weight="fill"
          onClick={(e) => handleDotsClick(e, folder, folder.id)}
        />
      );
    } else {
      null;
    }
  };

  return (
    <div className="flex-row flex flex-wrap gap-3">
      {data?.map((folder, index) => {
        if (id != null) {
          if (folder.typeId == id) {
            return (
              <Link
                key={index}
                href={`/file${file}/${folder.id}/${id}`}
                className="transition-all hover:cursor-pointer"
              >
                <div className="h-[217px] w-[240px] bg-white flex items-center justify-center">
                  <div className="flex-col flex">
                    <Image
                      className="mt-4"
                      src="/assets/Foldersub.png"
                      alt="logo"
                      width={180}
                      height={70}
                    />
                    <div className="w-full mb-7 h-[30px] bg-gray-100 rounded-md">
                      <div className="flex flex-row p-1 text-sm font-semibold text-gray-700 justify-between">
                        <p>{truncateTitle(folder.subtype_name)}</p>
                        {manageAccess(folder)}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          }
        } else {
          return (
            <Link
              key={index}
              href={`/${sub}/${folder.id}`}
              className="transition-all hover:cursor-pointer"
            >
              <div className="h-[217px] w-[240px] bg-white flex items-center justify-center">
                <div className="flex-col flex">
                  <Image
                    className="mt-4"
                    src="/assets/foldersub.png"
                    alt="logo"
                    width={180}
                    height={70}
                  />
                  <div className="w-full mb-7 h-[30px] bg-gray-100 rounded-md">
                    <div className="flex flex-row p-1 text-sm font-semibold text-gray-700 justify-between">
                      <p>{truncateTitle(folder.type_name)}</p>
                      {manageAccess(folder)}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
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
          </ul>
        </div>
      )}
      {showConfirmation && id == null && (
        <HapusFolder
          direct={direct}
          api={api}
          selectedFolderId={selectedFolderId}
          onConfirm={() => {
            setShowConfirmation(false);
          }}
          onCancel={() => setShowConfirmation(false)}
        />
      )}

      {showConfirmation && id != null && (
        <HapusSubFolder
          direct={direct}
          api={api}
          selectedFolderId={selectedFolderId}
          onConfirm={() => {
            setShowConfirmation(false);
          }}
          onCancel={() => setShowConfirmation(false)}
        />
      )}

      {showConfirmationEdit && id == null && (
        <EditFolder
          direct={direct}
          api={api}
          selectedFolderId={selectedFolderId}
          onClose={() => {
            setShowConfirmationEdit(false);
          }}
        />
      )}

      {showConfirmationEdit && id != null && (
        <EditSubFolder
          direct={direct}
          api={api}
          id={id}
          selectedFolderId={selectedFolderId}
          onClose={() => {
            setShowConfirmationEdit(false);
          }}
        />
      )}
    </div>
  );
};

export default Allfolder;
