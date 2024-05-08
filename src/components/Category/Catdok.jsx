const Catdok = ({ data }) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xl font-bold text-blue-800">Kategori dokumen</p>
      <div>
        <table className="w-full outline outline-2 outline-gray-300 rounded-md">
          <thead className="text-sm text-gray-700 font-semibold bg-blue-100">
            <tr>
              <th className="text-center p-3 border-r-2 border-gray-300">
                NO.
              </th>
              <th className="text-left p-3 border-r-2 border-gray-300">
                NAMA KATEGORI DOKUMEN
              </th>
              <th className="p-3 border-r-2 border-gray-300">TOTAL DOKUMEN</th>
              <th className="p-3 border-r-2 border-gray-300">MASA BERLAKU</th>
              <th className="p-3">SISTEM PENGHAPUSAN</th>
            </tr>
          </thead>
          <tbody className="text-xs text-gray-700">
            {data?.map((category, index) => {
              return (
                <tr key={index} className=" bg-gray-50 odd:bg-white">
                  <td className="text-center p-3 border-r-2 border-gray-300">
                    {index + 1}.
                  </td>
                  <td className="p-3 border-r-2 border-gray-300">
                    Dokumen <b>{category.category_name}</b>
                  </td>
                  <td className="text-center p-3 border-r-2 border-gray-300">
                    {category.file_total}
                  </td>
                  <td className="text-center p-3 border-r-2 border-gray-300">
                    {category.validity_period == null
                      ? "-"
                      : `${category.validity_period} Tahun`}
                  </td>
                  <td className="text-center p-3">
                    <div className="flex items-center justify-center">
                      {category.deletion_system == "Manual" ? (
                        <div className="bg-yellow-100 w-[100px] h-[24px] flex items-center justify-center rounded-md text-yellow-800 text-xs font-medium">
                          {category.deletion_system}
                        </div>
                      ) : (
                        <div className="bg-purple-100 w-[100px] h-[24px] flex items-center justify-center rounded-md text-purple-800 text-xs font-medium">
                          {category.deletion_system}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Catdok;
