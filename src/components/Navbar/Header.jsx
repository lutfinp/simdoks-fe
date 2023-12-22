import { Bell } from "@phosphor-icons/react/dist/ssr";

const Header = ({ name }) => {
  return (
    <div className="flex-row flex justify-between text-2xl font-bold text-gray-700">
      <div>Hai {name}!</div>
      <div className="hover:scale-105">
        <button className="self-center">
          <Bell size={27} weight="fill" />
        </button>
      </div>
    </div>
  );
};

export default Header;
