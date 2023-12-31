import { Bell, MagnifyingGlass, Plus } from "@phosphor-icons/react/dist/ssr";

const Header = ({ judul, add }) => {
  return (
    <div className="flex-row flex justify-between text-2xl  text-gray-700">
      <div className="self-center font-bold">
        {typeof judul === "string" ? judul : judul?.type_name}
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
          />
        </label>
        {add ? (
          <div className="hover:scale-105 self-center text-blue-600">
            <button className="flex items-center">
              <Plus size={35} weight="fill" />
            </button>
          </div>
        ) : null}
        <div className="hover:scale-105 self-center">
          <button className="flex items-center">
            <Bell size={30} weight="fill" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
