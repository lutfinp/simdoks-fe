import React from "react";
import {
  FolderNotchOpen,
  DotsThreeOutlineVertical,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

const Allfolder = ({ data, id, file, sub }) => {
    const truncateTitle = (title) => {
      if (title.length > 20) {
        return title.slice(0, 20) + "...";
      }
      return title;
    };
    console.log(file)
  return (
    <div className="flex-row flex flex-wrap gap-3">
      {data?.map((folder, index) => {
        if (id != null) {
          if (folder.typeId == id) {
            return (
              <Link
                key={index}
                href={`/file${file}/${folder.id}/${id}`}
                className="transition-all hover:cursor-pointer"
              >
                <div className="h-[217px] w-[240px] bg-white flex items-center justify-center">
                  <div className="flex-col flex">
                    <Image
                      className="mt-4"
                      src="/assets/foldersub.png"
                      alt="logo"
                      width={180}
                      height={70}
                    />
                    <div className="w-full mb-7 h-[30px] bg-gray-100 rounded-md">
                      <div className="flex flex-row p-1 text-sm font-semibold text-gray-700 justify-between">
                        <p>{truncateTitle(folder.subtype_name)}</p>
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
        } else {
          return (
            <Link
              key={index}
              href={`/${sub}/${folder.id}`}
              className="transition-all hover:cursor-pointer"
            >
              <div className="h-[217px] w-[240px] bg-white flex items-center justify-center">
                <div className="flex-col flex">
                  <Image
                    className="mt-4"
                    src="/assets/foldersub.png"
                    alt="logo"
                    width={180}
                    height={70}
                  />
                  <div className="w-full mb-7 h-[30px] bg-gray-100 rounded-md">
                    <div className="flex flex-row p-1 text-sm font-semibold text-gray-700 justify-between">
                      <p>{truncateTitle(folder.type_name)}</p>
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
      })}
    </div>
  );
};

export default Allfolder;
