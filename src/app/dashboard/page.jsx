import Category from "@/components/Category";
import Navbar from "@/components/Navbar";
import Reminder from "@/components/Reminder";
import SideBar from "@/components/SideBar";

export default function Page() {
  return (
    <div className="flex flex-row gap-2">
      <div className="text-gray-700 h-screen w-[249px]">
        <SideBar />
      </div>
      <div className="w-full bg-gray-50">
        <div className="ml-[32px] mr-[32px] my-4 flex flex-col gap-3">
          <div>
            <Navbar />
          </div>
          <div>
            <Reminder />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xl font-bold text-blue-800">Kategori dokumen</p>
            <div>
              <Category />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
