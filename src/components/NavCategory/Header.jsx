import { Bell, MagnifyingGlass, Plus } from "@phosphor-icons/react/dist/ssr";
import NotificationPopup from "../NotificationPopup";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import TambahDokumen from "../Tambah/TambahDokumen";
import TambahFolder from "../Tambah/TambahFolder";
import TambahSubFolder from "../Tambah/TambahSubFolder";

const Header = ({
  judul,
  add,
  subid,
  id,
  coba,
  api,
  direct,
  donthassubfolder,
  searchfile,
  filteron,
  setFilter,
  keyword,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showTambahDokumen, setShowTambahDokumen] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [filterActive, setFilterActive] = useState("Semua");
  const [hasNotification, setHasNotification] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [searchValue, setSearchValue] = useState(
    decodeURI(keyword) !== "undefined" ? decodeURI(keyword) : ""
  );
  const searchRef = useRef();
  const router = useRouter();
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null); 
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  let jwt;

  let cobaId = judul?.id;
  const years = Array.from({ length: 6 }, (_, index) => currentYear - index);
  useEffect(() => {
    const getTokenAndCheckNotification = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const token = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/token`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );
        jwt = token.data.accessToken;

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/checkIfHaveNotification`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        setHasNotification(response.data.hasNotification);
        setUnreadCount(response.data.unreadCount);
      } catch (error) {
        console.error("Error fetching token or checking notification:", error);
      }
    };

    getTokenAndCheckNotification();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutsideNotification);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideNotification);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideNotification);
    };
  }, [showNotifications]);

  const handleSearch = (event) => {
    const keyword = searchRef.current.value;

    if (!keyword || keyword.trim() === "") return;

    if (event.key === "Enter") {
      event.preventDefault();
      if (typeof judul === "string") {
        router.push(`/search${judul}/${keyword}`);
      } else if (judul && judul.type_name) {
        router.push(`/searchSub${coba}/${cobaId}/${keyword}`);
      } else if (judul && judul.subtype_name) {
        router.push(`/searchFile${searchfile}/${subid}/${id}/${keyword}`);
      }
    }
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleTambahDokumenClick = () => {
    setShowTambahDokumen(!showTambahDokumen);
  };

  const handleCloseTambahDokumen = () => {
    setShowTambahDokumen(false);
  };

  const handleCloseNotification = () => {
    setShowNotifications(false);
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
  const handleClickOutsideNotification = (event) => {
    if (notificationRef.current && !notificationRef.current.contains(event.target)) {
      handleCloseNotification();
    }
  };

  const updateFilter = (filter) => {
    setFilter(filter);
    setFilterActive(filter);
    setShowFilterDropdown(false);
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleCancelSearch = () => {
    setSearchValue("");
    searchRef.current.value = "";
    if (subid != null && id != null) {
      router.push(`/file${direct}/${subid}/${id}`);
    } else if (id != null) {
      router.push(`/${direct}/${id}`);
    } else {
      router.push(`/${direct}`);
    }
  };

  let contentToDisplay;
  if (showTambahDokumen) {
    if (
      (id != null && subid != null) ||
      (id != null && donthassubfolder === "true") ||
      (id == null && donthassubfolder === "true")
    ) {
      contentToDisplay = (
        <TambahDokumen
          id={id}
          subid={subid}
          api={api}
          direct={direct}
          onClose={handleCloseTambahDokumen}
        />
      );
    } else if (id == null) {
      contentToDisplay = (
        <TambahFolder
          direct={direct}
          api={api}
          onClose={handleCloseTambahDokumen}
        />
      );
    } else if (id != null) {
      contentToDisplay = (
        <TambahSubFolder
          id={id}
          direct={direct}
          api={api}
          onClose={handleCloseTambahDokumen}
        />
      );
    }
  }

  return (
    <div className="flex-row flex justify-between text-2xl text-gray-700">
      <div className="self-center font-bold">
        {typeof judul === "string"
          ? judul
          : judul?.subtype_name || judul?.type_name}
      </div>
      <div className="flex-row flex gap-3">
        {filteron ? (
          <button
            onClick={handleClickFilter}
            type="button"
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-normal text-gray-700 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            {filterActive}
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
        ) : null}
        {showFilterDropdown && (
          <div
          ref={dropdownRef}
            style={{
              position: "absolute",
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
            }}
            className="bg-white shadow-lg rounded-lg p-2 max-h-40 overflow-y-auto"
          >
            <ul className="text-sm font-normal text-gray-700">
              {["Semua", ...years].map((year) => (
                <li
                  key={year}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => updateFilter(year)}
                >
                  {year}
                </li>
              ))}
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
            placeholder={
              decodeURI(keyword) !== "undefined" ? decodeURI(keyword) : "Search"
            }
            type="text"
            name="search"
            ref={searchRef}
            value={searchValue}
            onChange={handleInputChange}
            onKeyDown={handleSearch}
          />
          {searchValue && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-2"
              onClick={handleCancelSearch}
            >
              <span className="text-gray-500">&times;</span>
            </button>
          )}
        </label>
        {add === "true" && (
          <div className="hover:scale-105 self-center text-blue-600">
            <button
              className="flex items-center"
              onClick={handleTambahDokumenClick}
            >
              <Plus size={35} weight="fill" />
            </button>
          </div>
        )}
        <div>
          <button onClick={handleNotificationClick}>
            <Bell size={27} weight="fill" />
            {hasNotification && unreadCount > 0 && (
              <span className="absolute top-4 right-8 inline-block w-3.5 h-3.5 bg-red-600 rounded-full"></span>
            )}
          </button>
          <div className="h-0">
            {showNotifications && (
                <div ref={notificationRef}>
                  <NotificationPopup
                    notifications={notifications}
                    onClose={handleCloseNotification}
                  />
                </div>
            )}
          </div>
        </div>
        {contentToDisplay}
      </div>
    </div>
  );
};

export default Header;

