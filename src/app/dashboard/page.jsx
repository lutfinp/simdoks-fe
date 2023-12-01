import SideBar from "@/components/SideBar";

export default function Page() {
    return (
      <div className="flex flex-row gap-4">
        <div className="text-gray-700 h-screen w-[249px]">
          <SideBar/>
        </div>
        <div className="w-full bg-gray-50">
          <p className="text-center">Dashboard</p>
        </div>
      </div>
    )
  }