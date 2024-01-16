import React, { useEffect } from "react";
import {
  FolderNotchOpen,
  DotsThreeOutlineVertical,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";



const openNewTab = (url) => {
  const newTab = window.open(url, "_blank");
  if (newTab) {
    newTab.focus();
  }
};

const Allfile = ({ data, id, subid }) => {
    const truncateTitle = (title) => {
        if (title.length > 18) {
          return title.slice(0, 15) + "...";
        }
        return title;
      };
  return (
    <div className="flex-row flex flex-wrap gap-3">
      {data?.map((akreditasi, index) => {
        if (id != null) {
          if (akreditasi.typeId == id && akreditasi.subtypeId == subid) {
            return (
              <Link key={index} href="#" className="transition-all hover:cursor-pointer">
                <div className="h-[217px] w-[230px] bg-white flex items-center justify-center">
                  <div className="flex-col flex">
                    <Image
                      className="mt-4"
                      src="/assets/files.png"
                      alt="logo"
                      width={120}
                      height={50}
                    />
                    <div className="w-full mb-7 h-[30px] bg-gray-100 rounded-md">
                      <div className="flex flex-row p-1 text-sm font-semibold text-gray-700 justify-between">
                        <p>{truncateTitle(akreditasi.file_name)}</p>
                        <DotsThreeOutlineVertical
                          className="hover:text-yellow-600 cursor-pointer"
                          size={20}
                          weight="fill"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          }
        } 
      })}
    </div>
  );
};

export default Allfile;
