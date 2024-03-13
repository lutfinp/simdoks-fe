import React from "react";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

const Hasdok = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row justify-between mt-4">
        <p className=" text-xl font-bold text-blue-800 self-center">Hapus</p>
        <label className="relative">
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <MagnifyingGlass className="text-gray-500" size={16} />
          </span>
          <input
            className=" w-[384px] placeholder:text-gray-500 bg-white border border-gray-300 rounded-md py-2 pl-9 pr-3 text-xs focus:outline-none text-gray-500"
            placeholder="Search"
            type="text"
            name="search"
          />
        </label>
      </div>
      {/* <div className="flex items-center justify-center w-full h-[83px] bg-red-100 rounded-md text-center">
        search not found
      </div> */}
      <table className="w-full outline outline-2 outline-gray-300 rounded-md">
        <thead className="text-sm text-gray-700 font-semibold bg-blue-100">
          <tr>
            <th className="text-center p-3 border-r-2 border-gray-300">NO.</th>
            <th className="text-left p-3 border-r-2 border-gray-300">
              NAMA DOKUMEN
            </th>
            <th className="p-3 border-r-2 border-gray-300">
              TANGGAL PENGHAPUSAN
            </th>
            <th className="p-3 border-r-2 border-gray-300">
              SISTEM PENGHAPUSAN
            </th>
          </tr>
        </thead>
        <tbody className="text-xs text-gray-700">
          <tr className=" bg-gray-50 odd:bg-white">
            <td className="text-center p-3 border-r-2 border-gray-300">1</td>
            <td className="p-3 border-r-2 border-gray-300">
              Lorem ipsum dolor sit amet
            </td>
            <td className="text-center p-3 border-r-2 border-gray-300">
              29 November 2020
            </td>
            <td className="text-center p-3">
              <div className="flex items-center justify-center">
                <div className="bg-purple-100 w-[100px] h-[24px] flex items-center justify-center rounded-md text-purple-800">
                  Otomatis
                </div>
              </div>
            </td>
          </tr>
          <tr className=" bg-gray-50 odd:bg-white">
            <td className="text-center p-3 border-r-2 border-gray-300">2</td>
            <td className="p-3 border-r-2 border-gray-300">
              Lorem ipsum dolor sit amet
            </td>
            <td className="text-center p-3 border-r-2 border-gray-300">
              29 November 2020
            </td>
            <td className="text-center p-3">
              <div className="flex items-center justify-center">
                <div className="bg-purple-100 w-[100px] h-[24px] flex items-center justify-center rounded-md text-purple-800">
                  Otomatis
                </div>
              </div>
            </td>
          </tr>
          <tr className=" bg-gray-50 odd:bg-white">
            <td className="text-center p-3 border-r-2 border-gray-300">3</td>
            <td className="p-3 border-r-2 border-gray-300">
              Lorem ipsum dolor sit amet
            </td>
            <td className="text-center p-3 border-r-2 border-gray-300">
              29 November 2020
            </td>
            <td className="text-center p-3">
              <div className="flex items-center justify-center">
                <div className="bg-purple-100 w-[100px] h-[24px] flex items-center justify-center rounded-md text-purple-800">
                  Otomatis
                </div>
              </div>
            </td>
          </tr>
          <tr className=" bg-gray-50 odd:bg-white">
            <td className="text-center p-3 border-r-2 border-gray-300">4</td>
            <td className="p-3 border-r-2 border-gray-300">
              Lorem ipsum dolor sit amet
            </td>
            <td className="text-center p-3 border-r-2 border-gray-300">
              29 November 2020
            </td>
            <td className="text-center p-3">
              <div className="flex items-center justify-center">
                <div className="bg-purple-100 w-[100px] h-[24px] flex items-center justify-center rounded-md text-purple-800">
                  Otomatis
                </div>
              </div>
            </td>
          </tr>
          <tr className=" bg-gray-50 odd:bg-white">
            <td className="text-center p-3 border-r-2 border-gray-300">5</td>
            <td className="p-3 border-r-2 border-gray-300">
              Lorem ipsum dolor sit amet
            </td>
            <td className="text-center p-3 border-r-2 border-gray-300">
              29 November 2020
            </td>
            <td className="text-center p-3">
              <div className="flex items-center justify-center">
                <div className="bg-yellow-100 w-[100px] h-[24px] flex items-center justify-center rounded-md text-yellow-800">
                  Manual
                </div>
              </div>
            </td>
          </tr>
          <tr className=" bg-gray-50 odd:bg-white">
            <td className="text-center p-3 border-r-2 border-gray-300">6</td>
            <td className="p-3 border-r-2 border-gray-300">
              Lorem ipsum dolor sit amet
            </td>
            <td className="text-center p-3 border-r-2 border-gray-300">
              29 November 2020
            </td>
            <td className="text-center p-3">
              <div className="flex items-center justify-center">
                <div className="bg-yellow-100 w-[100px] h-[24px] flex items-center justify-center rounded-md text-yellow-800">
                  Manual
                </div>
              </div>
            </td>
          </tr>
          <tr className=" bg-gray-50 odd:bg-white">
            <td className="text-center p-3 border-r-2 border-gray-300">7</td>
            <td className="p-3 border-r-2 border-gray-300">
              Lorem ipsum dolor sit amet
            </td>
            <td className="text-center p-3 border-r-2 border-gray-300">
              29 November 2020
            </td>
            <td className="text-center p-3">
              <div className="flex items-center justify-center">
                <div className="bg-yellow-100 w-[100px] h-[24px] flex items-center justify-center rounded-md text-yellow-800">
                  Manual
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Hasdok;
