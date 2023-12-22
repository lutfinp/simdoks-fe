import Updok from "./Updok";
import { Bell } from "@phosphor-icons/react/dist/ssr";

const Update = ({ data }) => {
  return (
    <div className="ml-[32px] mr-[32px] my-4 flex flex-col">
      <div className="flex-row flex justify-between text-2xl font-bold text-gray-700">
        <div>Histori</div>
        <div className="hover:scale-105">
          <button className="self-center">
            <Bell size={27} weight="fill" />
          </button>
        </div>
      </div>
      <div>
        <Updok data={data} />
      </div>
    </div>
  );
};

export default Update;
