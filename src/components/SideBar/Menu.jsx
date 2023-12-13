import {
  House,
  Clock,
  Tray,
  SealCheck,
  UsersThree,
  Files,
  CurrencyDollar,
  StackOverflowLogo,
  Toolbox,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

const Menu = ({ page }) => {
  return (
    <div className="text-xs fixed">
      <div className="flex">
        <div className="ml-1 mt-2 flex flex-row gap-2">
          <Image src="/assets/Logo.png" width={220} height={100} />
        </div>
      </div>
      <div className="ml-2 mt-4 flex flex-col gap-1">
        <Link
          href="/dashboard"
          className={`flex flex-row gap-2 p-2 mr-2 ${
            page === "dashboard"
              ? "bg-blue-800 text-white"
              : "hover:bg-blue-800 hover:text-white "
          } rounded-lg transition-all`}
        >
          <House size={20} weight="fill" />
          <p className="self-center">Dashboard</p>
        </Link>

        <Link
          href="/histori"
          className={`flex flex-row gap-2 p-2 mr-2 ${
            page === "histori"
              ? "bg-blue-800 text-white"
              : "hover:bg-blue-800 hover:text-white "
          } rounded-lg transition-all`}
        >
          <Clock size={20} weight="fill" />
          <p className="self-center">Histori</p>
        </Link>

        <Link
          href="#"
          className={`flex flex-row gap-2 p-2 mr-2 ${
            page === "akreditasi"
              ? "bg-blue-800 text-white"
              : "hover:bg-blue-800 hover:text-white "
          } rounded-lg transition-all`}
        >
          <SealCheck size={20} weight="fill" />
          <p className="self-center">Akreditasi</p>
        </Link>

        <Link
          href="/barang"
          className={`flex flex-row gap-2 p-2 mr-2 ${
            page === "barang"
              ? "bg-blue-800 text-white"
              : "hover:bg-blue-800 hover:text-white "
          } rounded-lg transition-all`}
        >
          <Toolbox size={20} weight="fill" />
          <p className="self-center">Barang</p>
        </Link>

        <Link
          href="#"
          className={`flex flex-row gap-2 p-2 mr-2 ${
            page === "kepegawaian"
              ? "bg-blue-800 text-white"
              : "hover:bg-blue-800 hover:text-white "
          } rounded-lg transition-all`}
        >
          <UsersThree size={20} weight="fill" />
          <p className="self-center">Kepegawaian</p>
        </Link>

        <Link
          href="#"
          className={`flex flex-row gap-2 p-2 mr-2 ${
            page === "program"
              ? "bg-blue-800 text-white"
              : "hover:bg-blue-800 hover:text-white "
          } rounded-lg transition-all`}
        >
          <Tray size={20} weight="fill" />
          <p className="self-center">Program</p>
        </Link>

        <Link
          href="#"
          className={`flex flex-row gap-2 p-2 mr-2 ${
            page === "surat"
              ? "bg-blue-800 text-white"
              : "hover:bg-blue-800 hover:text-white "
          } rounded-lg transition-all`}
        >
          <Files size={20} weight="fill" />
          <p className="self-center">Surat</p>
        </Link>

        <Link
          href="#"
          className={`flex flex-row gap-2 p-2 mr-2 ${
            page === "keuangan"
              ? "bg-blue-800 text-white"
              : "hover:bg-blue-800 hover:text-white "
          } rounded-lg transition-all`}
        >
          <CurrencyDollar size={20} weight="bold" />
          <p className="self-center">Keuangan</p>
        </Link>

        <Link
          href="#"
          className={`flex flex-row gap-2 p-2 mr-2 ${
            page === "tugas"
              ? "bg-blue-800 text-white"
              : "hover:bg-blue-800 hover:text-white "
          } rounded-lg transition-all`}
        >
          <StackOverflowLogo size={20} weight="bold" />
          <p className="mt-1">Tugas</p>
        </Link>

        <div className="border-t-2 mr-2 border-gray-200 my-[32px]"></div>

        <Link
          href="#"
          className="p-2 mr-2 bg-red-600 text-white hover:bg-red-900 rounded-lg transition-all"
        >
          <p className="text-center">Logout</p>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
