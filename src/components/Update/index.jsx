import Updok from "./Updok";
import { Bell } from "@phosphor-icons/react/dist/ssr";
import { useState, useEffect, useRef } from "react"; 
import NotificationPopup from "../NotificationPopup";
import axios from "axios";

const Update = ({
  data,
  setPageUpdate,
  pageUpdate,
  totalPageUpload,
  setFilterUpload,
  setSearchUpload,
  setKeywordUpload
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  let jwt;
  const notificationRef = useRef();
  
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
  } , [showNotifications]);
  const handleClickOutsideNotification = (event) => {
    if (notificationRef.current && !notificationRef.current.contains(event.target)) {
      setShowNotifications(false);
    }
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleCloseNotification = () => {
    setShowNotifications(false);
    setSearchVisible(true);
  };
  return (
    <div className="ml-[32px] mr-[32px] my-4 flex flex-col">
      <div className="flex-row flex justify-between text-2xl font-bold text-gray-700">
        <div>Histori</div>
        <div className="">
          <button className="self-center " onClick={handleNotificationClick}>
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
      </div>
      <div>
      <Updok
          data={data}
          pageUpdate={pageUpdate}
          totalPageUpload={totalPageUpload}
          setPageUpdate={setPageUpdate}
          setFilterUpload={setFilterUpload}
          setSearchUpload={setSearchUpload}
          setKeywordUpload={setKeywordUpload}
        />
      </div>
    </div>
  );
};


export default Update;
