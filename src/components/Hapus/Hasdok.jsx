import React from "react";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import PaginationHapus from "../Utilities/PaginationHapus";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const Hasdok = ({
  data,
  total,
  pageHapus,
  setPageHapus,
  setFilterDelete,
  setSearchDelete,
  setKeywordDelete,
}) => {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef(null);
  const searchRef = useRef();

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "id-ID",
      options
    );
    return formattedDate;
  };

  const handleClickFilter = (event) => {
    const rect = event.target.getBoundingClientRect();
    setDropdownPosition({
      top: rect.top + window.scrollY + rect.height,
      left: rect.left + window.scrollX,
    });
    setShowFilterDropdown(!showFilterDropdown);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowFilterDropdown(false);
    }
  };

  const handleClickAsc = () => {
    setFilterDelete("asc");
  };

  const handleClickDsc = () => {
    setFilterDelete("desc");
  };

  const handleClickWeek = () => {
    setFilterDelete("week");
  };

  const handleSearch = (event) => {
    const keyword = searchRef.current.value;

    if (!keyword || keyword.trim() == "") return;

    if (event.key === "Enter") {
      event.preventDefault();
      {
        setSearchDelete((prevState) => prevState + 1);
        setKeywordDelete(keyword);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row justify-between mt-4">
          <p className="text-xl font-bold text-blue-800 self-center">Delete</p>
          <div className="flex flex-row gap-2">
            <button
              onClick={handleClickFilter}
              type="button"
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-normal text-gray-700 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
            >
              Filter
              <svg
                className={`ml-1 h-5 w-5 transition-transform ${
                  showFilterDropdown ? "transform rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {showFilterDropdown && (
              <div
                style={{
                  position: "absolute",
                  top: `${dropdownPosition.top}px`,
                  left: `${dropdownPosition.left}px`,
                }}
                className="bg-white shadow-lg rounded-lg p-2"
              >
                <ul className="text-sm font-normal text-gray-700">
                  <li
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleClickDsc}
                  >
                    Terbaru
                  </li>
                  <li
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleClickAsc}
                  >
                    Terlama
                  </li>
                  <li
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleClickWeek}
                  >
                    7 Hari Terakhir
                  </li>
                </ul>
              </div>
            )}
            <label className="relative">
              <span className="sr-only">Search</span>
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <MagnifyingGlass className="text-gray-500" size={16} />
              </span>
              <input
                className="w-[384px] placeholder:text-gray-500 bg-white border border-gray-300 rounded-md py-2 pl-9 pr-3 text-xs focus:outline-none text-gray-500"
                placeholder="Search"
                type="text"
                name="search"
                ref={searchRef}
                onKeyDown={handleSearch}
              />
            </label>
          </div>
        </div>
        {/* <div className="flex items-center justify-center w-full h-[83px] bg-red-100 rounded-md text-center">
        search not found
      </div> */}
        {data && data.length > 0 ? (
          <table className="w-full outline outline-2 outline-gray-300 rounded-md">
            <thead className="text-sm text-gray-700 font-semibold bg-blue-100">
              <tr>
                <th className="text-center p-3 border-r-2 border-gray-300">
                  NO.
                </th>
                <th className="text-left p-3 border-r-2 border-gray-300">
                  NAMA DOKUMEN
                </th>
                <th className="p-3 border-r-2 border-gray-300">
                  TANGGAL PENGHAPUSAN
                </th>
                <th className="p-3">SISTEM PENGHAPUSAN</th>
              </tr>
            </thead>
            <tbody className="text-xs text-gray-700">
              {data?.map((hapus, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="text-center p-3 border-r-2 border-gray-300">
                  {(index + 1)+(pageHapus-1)*7}.
                  </td>
                  <td className="p-3 border-r-2 border-gray-300">
                    {hapus.file_name}
                  </td>
                  <td className="text-center p-3 border-r-2 border-gray-300">
                    {formatDate(hapus.createdAt)}
                  </td>
                  <td className="text-center p-3">
                    <div className="flex items-center justify-center">
                      {hapus.deletion_system == "Manual" ? (
                        <div className="bg-yellow-100 w-[100px] h-[24px] flex items-center justify-center rounded-md text-yellow-800 text-xs font-medium">
                          {hapus.deletion_system}
                        </div>
                      ) : (
                        <div className="bg-purple-100 w-[100px] h-[24px] flex items-center justify-center rounded-md text-purple-800 text-xs font-medium">
                          {hapus.deletion_system}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="bg-white outline outline-2 outline-gray-300 rounded-md h-[310px] flex items-center justify-center">
            <div>
              <Image
                className="mt-2"
                src="/assets/dihapus.png"
                alt="Tidak ada dokumen yang akan dihapus"
                width={400}
                height={173}
              />
            </div>
          </div>
        )}
      </div>
      {data && data.length > 0 ? (
        <div className="flex justify-end">
          <PaginationHapus
            total={total}
            pageHapus={pageHapus}
            setPageHapus={setPageHapus}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Hasdok;
