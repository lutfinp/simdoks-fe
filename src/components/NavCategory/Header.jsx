import { Bell, MagnifyingGlass, Plus } from "@phosphor-icons/react/dist/ssr";
import NotificationPopup from "../Notification";
import { useState } from "react";
import TambahDokumen from "../Tambah/TambahDokumen";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import TambahFolder from "../Tambah/tambahFolder";
import TambahSubFolder from "../Tambah/tambahSubFolder";

const Header = ({ judul, add, subid, id, coba, api, direct, donthassubfolder, searchfile}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showTambahDokumen, setShowTambahDokumen] = useState(false);
  const searchRef = useRef();
  const router = useRouter();
  let cobaId = judul?.id;

    const handleSearch = (event) => {
      const keyword = searchRef.current.value;

      if (!keyword || keyword.trim() == "") return;

      if (event.key === "Enter") {
        event.preventDefault();
        if (typeof judul === "string") {
          // Jika `judul` adalah string, arahkan ke rute '/search<judul>/<keyword>'
          router.push(`/search${judul}/${keyword}`);
        } 
        // Kondisi kedua: Cek apakah `judul` memiliki properti `subtype_name`
        else if (judul && judul.type_name) {
          // Jika `judul` memiliki `subtype_name`, arahkan ke rute '/searchSub<coba>/<cobaId>/<keyword>'
          router.push(`/searchSub${coba}/${cobaId}/${keyword}`);
        }
        else if (judul && judul.subtype_name)
        {
          router.push(`/searchFile${searchfile}/${subid}/${id}/${keyword}`);
        }
      
    };
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

  let contentToDisplay;
  if (showTambahDokumen) {
    if ((id != null && subid != null)||(id != null && donthassubfolder =="true")||(id == null && donthassubfolder =="true")) {
      console.log("id: ",id ,"subid: ", subid);
      contentToDisplay = (
        <TambahDokumen
          id={id} //folder
          subid={subid} //sub folder
          api={api} //endpoint
          direct={direct} //window
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
    <div className="flex-row flex justify-between text-2xl  text-gray-700">
      <div className="self-center font-bold">
        {typeof judul === "string"
          ? judul
          : judul?.subtype_name || judul?.type_name}
      </div>
      <div className="flex-row flex gap-3">
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
        {add ? (
          <div className="hover:scale-105 self-center text-blue-600">
            <button
              className="flex items-center"
              onClick={handleTambahDokumenClick}
            >
              <Plus size={35} weight="fill" />
            </button>
          </div>
        ) : null}
        <div>
          <button
            className="self-center hover:scale-105 mt-[6px]"
            onClick={handleNotificationClick}
          >
            <Bell size={27} weight="fill" />
          </button>
          <div className="h-0">
            {showNotifications && (
              <NotificationPopup
                notifications={notifications}
                onClose={handleCloseNotification}
              />
            )}
          </div>
        </div>
        {contentToDisplay}
      </div>
    </div>
  );
};

export default Header;
