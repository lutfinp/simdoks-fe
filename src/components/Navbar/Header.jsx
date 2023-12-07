import { getCategoryResponse } from "@/libs/api-libs";
import { Bell } from "@phosphor-icons/react/dist/ssr";

const Header = async () => {
  const users = await getCategoryResponse("users");

  if (users && users.length > 0) {
    const user = users[0];
    return (
      <div className="flex-row flex justify-between text-2xl font-bold text-gray-700">
        <div>{`Hai, ${user.username}!`}</div>
        <div className="hover:scale-105">
          <button className="self-center">
            <Bell size={27} weight="fill"/>
          </button>
        </div>
      </div>
    );
  }
};

export default Header;
