import Hapus from "@/components/Hapus";
import Histori from "@/components/Histori";
import SideBar from "@/components/SideBar";


const Page = () => {
  return (
    <div className="flex flex-row gap-2">
      <div className="text-gray-700 h-screen w-[249px]">
        <SideBar activePage="histori" />
      </div>
      <div className="w-full bg-gray-50 divide-y-2">
        <Histori/>
        <Hapus/>
      </div>
    </div>
  );
};

export default Page;
