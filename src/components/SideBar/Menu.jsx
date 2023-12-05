import {
  House,
  Clock,
  Tray,
  SealCheck,
  UsersThree,
  Files,
  CurrencyDollar,
  StackOverflowLogo,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

const Menu = () => {
  return (
    <div className=" text-xs">
      <div className="flex">
        <div className="ml-4 mt-2 flex flex-row gap-2">
          <Image src="/assets/simdoks_logo.png" width={53} height={59.74} />
          <Image src="/assets/simdoks_tulisan.png" width={130} height={24.75} />
        </div>
      </div>
      <div className="ml-2 mt-4 flex flex-col gap-1">
        <Link
          href="#"
          className=" flex flex-row gap-2 p-2 mr-2 hover:bg-blue-800 rounded-lg transition-all hover:text-white"
        >
          <House size={20} weight="fill" />
          <p className="self-center">Dashboard</p>
        </Link>

        <Link
          href="#"
          className=" flex flex-row gap-2 p-2 mr-2 hover:bg-blue-800 rounded-lg transition-all hover:text-white"
        >
          <Clock size={20} weight="fill" />
          <p className="self-center">Histori</p>
        </Link>

        <Link
          href="#"
          className=" flex flex-row gap-2 p-2 mr-2 hover:bg-blue-800 rounded-lg transition-all hover:text-white"
        >
          <SealCheck size={20} weight="fill" />
          <p className="self-center">Akreditasi</p>
        </Link>

        <Link
          href="#"
          className=" flex flex-row gap-2 p-2 mr-2 hover:bg-blue-800 rounded-lg transition-all hover:text-white"
        >
          <Tray size={20} weight="fill" />
          <p className="self-center">Barang</p>
        </Link>

        <Link
          href="#"
          className=" flex flex-row gap-2 p-2 mr-2 hover:bg-blue-800 rounded-lg transition-all hover:text-white"
        >
          <UsersThree size={20} weight="fill" />
          <p className="self-center">Kepegawaian</p>
        </Link>

        <Link
          href="#"
          className=" flex flex-row gap-2 p-2 mr-2 hover:bg-blue-800 rounded-lg transition-all hover:text-white"
        >
          <Tray size={20} weight="fill" />
          <p className="self-center">Program</p>
        </Link>

        <Link href="#" className=" flex flex-row gap-2 p-2 mr-2 hover:bg-blue-800 rounded-lg transition-all hover:text-white">
          <Files size={20} weight="fill" />
          <p className="self-center">Surat</p>
        </Link>

        <Link href="#" className=" flex flex-row gap-2 p-2 mr-2 hover:bg-blue-800 rounded-lg transition-all hover:text-white">
          <CurrencyDollar size={20} weight="bold" />
          <p className="self-center">Keuangan</p>
        </Link>

        <Link
          href="#"
          className=" flex flex-row gap-2 p-2 mr-2 hover:bg-blue-800 rounded-lg transition-all hover:text-white"
        >
          <StackOverflowLogo size={20} weight="bold" />
          <p className="mt-1">Tugas</p>
        </Link>

        <Link
          href="#"
          className="p-2 mr-2 mt-5 bg-red-600 text-white hover:bg-red-900 rounded-lg transition-all"
        >
          <p className="text-center">Logout</p>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
