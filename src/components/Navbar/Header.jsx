import { Bell } from "@phosphor-icons/react/dist/ssr";
import axios from "axios";

const Header = async () => {
    return (
      <div className="flex-row flex justify-between text-2xl font-bold text-gray-700">
        <div>{`Hai!`}</div>
        <div className="hover:scale-105">
          <button className="self-center">
            <Bell size={27} weight="fill"/>
          </button>
        </div>
      </div>
    );
  }

export default Header;
