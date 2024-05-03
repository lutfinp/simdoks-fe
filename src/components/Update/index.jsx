import Updok from "./Updok";
import { Bell, MagnifyingGlass, Plus } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react"; 
import NotificationPopup from "../Notification";


const Update = ({ data }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };
  const handleCloseNotification = () => {
    setShowNotifications(false);
  };
  return (
    <div className="ml-[32px] mr-[32px] my-4 flex flex-col">
      <div className="flex-row flex justify-between text-2xl font-bold text-gray-700">
        <div>Histori</div>
        <div className="hover:scale-105">
          <button className="self-center " onClick={handleNotificationClick}>
            <Bell size={27} weight="fill" />
          </button>
        </div>
        {showNotifications && (
              <NotificationPopup
                notifications={notifications}
                onClose={handleCloseNotification}
              />
            )}
      </div>
      <div>
        <Updok data={data} />
      </div>
    </div>
  );
};

export default Update;
