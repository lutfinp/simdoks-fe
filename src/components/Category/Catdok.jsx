const Catdok = () => {
  return (
    <table className="w-full outline outline-2 outline-gray-300 rounded-md">
      <thead className="text-sm text-gray-700 font-semibold bg-blue-100">
        <tr>
          <th className="text-center p-3">NO.</th>
          <th className="text-left p-3">NAMA KATEGORI DOKUMEN</th>
          <th className="p-3">TOTAL DOKUMEN</th>
          <th className="p-3">MASA BERLAKU</th>
          <th className="p-3">SISTEM PENGHAPUSAN</th>
        </tr>
      </thead>
      <tbody className="text-xs text-gray-700">
        <tr className=" bg-gray-50 odd:bg-white">
          <td className="text-center p-3">1</td>
          <td className="p-3">Dokumen Akreditasi</td>
          <td className="text-center p-3">123</td>
          <td className="text-center p-3">5 Tahun</td>
          <td className="text-center p-3">
            <div className="flex items-center justify-center">
              <div className="bg-yellow-100 w-[100px] h-[24px] flex items-center justify-center rounded-md text-yellow-800">
                Manual
              </div>
            </div>
          </td>
        </tr>
        <tr className=" bg-gray-50 odd:bg-white">
          <td className="text-center p-3">2</td>
          <td className="p-3">Dokumen Akreditasi</td>
          <td className="text-center p-3">456</td>
          <td className="text-center p-3">5 Tahun</td>
          <td className="text-center p-3">
            <div className="flex items-center justify-center">
              <div className="bg-yellow-100 w-[100px] h-[24px] flex items-center justify-center rounded-md text-yellow-800">
                Manual
              </div>
            </div>
          </td>
        </tr>
        <tr className=" bg-gray-50 odd:bg-white">
          <td className="text-center p-3">3</td>
          <td className="p-3">Dokumen Akreditasi</td>
          <td className="text-center p-3">789</td>
          <td className="text-center p-3">5 Tahun</td>
          <td className="text-center p-3">
            <div className="flex items-center justify-center">
              <div className="bg-yellow-100 w-[100px] h-[24px] flex items-center justify-center rounded-md text-yellow-800">
                Manual
              </div>
            </div>
          </td>
        </tr>
        <tr className=" bg-gray-50 odd:bg-white">
          <td className="text-center p-3">4</td>
          <td className="p-3">Dokumen Akreditasi</td>
          <td className="text-center p-3">789</td>
          <td className="text-center p-3">5 Tahun</td>
          <td className="text-center p-3">
            <div className="flex items-center justify-center">
              <div className="bg-purple-100 w-[100px] h-[24px] flex items-center justify-center rounded-md text-purple-800">
                Otomatis
              </div>
            </div>
          </td>
        </tr>
        <tr className=" bg-gray-50 odd:bg-white">
          <td className="text-center p-3">5</td>
          <td className="p-3">Dokumen Akreditasi</td>
          <td className="text-center p-3">789</td>
          <td className="text-center p-3">5 Tahun</td>
          <td className="text-center p-3">
            <div className="flex items-center justify-center">
              <div className="bg-purple-100 w-[100px] h-[24px] flex items-center justify-center rounded-md text-purple-800">
                Otomatis
              </div>
            </div>
          </td>
        </tr>
        <tr className=" bg-gray-50 odd:bg-white">
          <td className="text-center p-3">6</td>
          <td className="p-3">Dokumen Akreditasi</td>
          <td className="text-center p-3">789</td>
          <td className="text-center p-3">5 Tahun</td>
          <td className="text-center p-3">
            <div className="flex items-center justify-center">
              <div className="bg-purple-100 w-[100px] h-[24px] flex items-center justify-center rounded-md text-purple-800">
                Otomatis
              </div>
            </div>
          </td>
        </tr>
        <tr className=" bg-gray-50 odd:bg-white">
          <td className="text-center p-3">7</td>
          <td className="p-3">Dokumen Akreditasi</td>
          <td className="text-center p-3">789</td>
          <td className="text-center p-3">5 Tahun</td>
          <td className="text-center p-3">
            <div className="flex items-center justify-center">
              <div className="bg-purple-100 w-[100px] h-[24px] flex items-center justify-center rounded-md text-purple-800">
                Otomatis
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Catdok;
