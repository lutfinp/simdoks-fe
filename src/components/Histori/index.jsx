import Hisdok from "./Hisdok";
import { Bell } from "@phosphor-icons/react/dist/ssr";

const Histori = () => {
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
        <Hisdok />
      </div>
    </div>
  );
};

export default Histori;
