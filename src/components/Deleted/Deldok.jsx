import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Pagination7Days from "../Utilities/Pagination7Days";
import {useState, useRef, useEffect} from "react";

const Deldok = ({
  data,
  pageHapus,
  setPageHapus,
  totalPage,
  setSearchDelete,
  setKeywordDelete,
}) => {
  const searchRef = useRef();
  const [searchValue, setSearchValue] = useState('');

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "id-ID",
      options
    );
    return formattedDate;
  };

  const handleSearch = (event) => {
    const keyword = searchRef.current.value;

    if (!keyword || keyword.trim() == "") return;

    if (event.key === "Enter") {
      event.preventDefault();
      {
        setSearchDelete((prevState) => prevState + 1);
        setKeywordDelete(keyword);
      }
    }
  };
  const handleCancelSearch = () => {
    setSearchValue('');
    searchRef.current.value = '';
    setSearchDelete(0);
    setKeywordDelete('');
  };


  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row justify-between mt-4">
        <p className=" text-xl font-bold text-blue-800 self-center">
          Dokumen akan terhapus
        </p>
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
            ref={searchRef}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearch}
          />
             {searchRef.current && searchRef.current.value && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-2"
              onClick={handleCancelSearch}
            >
              <span className="text-gray-500">&times;</span>
            </button>
          )}
        </label>
      </div>
      {data && data.length > 0 ? (
        <table className="w-full outline outline-2 outline-gray-300 rounded-md">
          <thead className="text-sm text-gray-700 font-semibold bg-blue-100">
            <tr>
              <th className="text-center p-3 border-r-2 border-gray-300">
                NO.
              </th>
              <th className="text-left p-3 border-r-2 border-gray-300">
                NAMA DOKUMEN
              </th>
              <th className="p-3 border-r-2 border-gray-300">BERLAKU MULAI</th>
              <th className="p-3">BERLAKU HINGGA</th>
            </tr>
          </thead>
          <tbody className="text-xs text-gray-700">
            {data?.map((hapus, index) => {
              return (
                <tr key={index} className=" bg-gray-50 odd:bg-white">
                  <td className="text-center p-3 border-r-2 border-gray-300">
                  {index + 1 + (pageHapus - 1) * 7}.
                  </td>
                  <td className="p-3 border-r-2 border-gray-300">
                    {hapus.file_name}
                  </td>
                  <td className="text-center p-3 border-r-2 border-gray-300">
                    {formatDate(hapus.start_date)}
                  </td>
                  <td className="text-center p-3">
                    {formatDate(hapus.end_date)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="bg-white outline outline-2 outline-gray-300 rounded-md h-[310px] flex items-center justify-center">
          <div>
            <Image
              className="mt-2"
              src="/assets/Frame52.png"
              alt="Tidak ada dokumen yang akan terhapus"
              width={400}
              height={173}
            />
          </div>
        </div>
      )}
      {data && data.length > 0 ? (
        <div className="flex justify-end">
          <Pagination7Days
            pageHapus={pageHapus}
            setPageHapus={setPageHapus}
            totalPage={totalPage}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Deldok;
