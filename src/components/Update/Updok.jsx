import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

const Updok = ({ data }) => {
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "id-ID",
      options
    );
    return formattedDate;
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row justify-between mt-4">
        <p className=" text-xl font-bold text-blue-800 self-center">Upload</p>
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
            <th className="p-3 border-r-2 border-gray-300">BERLAKU MULAI</th>
            <th className="p-3 border-r-2 border-gray-300">BERLAKU HINGGA</th>
            <th className="p-3">TANGGAL UPLOAD</th>
          </tr>
        </thead>
        <tbody className="text-xs text-gray-700">
          {data?.map((upload, index) => {
            return (
              <tr key={index} className=" bg-gray-50 odd:bg-white">
                <td className="text-center p-3 border-r-2 border-gray-300">
                  {upload.id}
                </td>
                <td className="p-3 border-r-2 border-gray-300">
                  {upload.file_name}
                </td>
                <td className="text-center p-3 border-r-2 border-gray-300">
                  {formatDate(upload.start_date)}
                </td>
                <td className="text-center p-3 border-r-2 border-gray-300">
                  {upload.expired_date == null ? "-" : `${upload.expired_date}`}
                </td>
                <td className="text-center p-3">{formatDate(upload.uploaded_at)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Updok;
