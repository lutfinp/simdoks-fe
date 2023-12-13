const Catdok = () => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xl font-bold text-blue-800">Kategori dokumen</p>
      <div>
        <table className="w-full outline outline-2 outline-gray-300 rounded-md">
          <thead className="text-sm text-gray-700 font-semibold bg-blue-100">
            <tr>
              <th className="text-center p-3 border-r-2 border-gray-300">NO.</th>
              <th className="text-left p-3 border-r-2 border-gray-300">NAMA KATEGORI DOKUMEN</th>
              <th className="p-3 border-r-2 border-gray-300">TOTAL DOKUMEN</th>
              <th className="p-3 border-r-2 border-gray-300">MASA BERLAKU</th>
              <th className="p-3">SISTEM PENGHAPUSAN</th>
            </tr>
          </thead>
          <tbody className="text-xs text-gray-700">
            <tr className=" bg-gray-50 odd:bg-white">
              <td className="text-center p-3 border-r-2 border-gray-300">1</td>
              <td className="p-3 border-r-2 border-gray-300">Dokumen <b>Akreditasi</b></td>
              <td className="text-center p-3 border-r-2 border-gray-300">123</td>
              <td className="text-center p-3 border-r-2 border-gray-300">5 Tahun</td>
              <td className="text-center p-3">
                <div className="flex items-center justify-center">
                  <div className="bg-yellow-100 w-[100px] h-[24px] flex items-center justify-center rounded-md text-yellow-800">
                    Manual
                  </div>
                </div>
              </td>
            </tr>
            <tr className=" bg-gray-50 odd:bg-white">
              <td className="text-center p-3 border-r-2 border-gray-300">2</td>
              <td className="p-3 border-r-2 border-gray-300">Dokumen <b>Akreditasi</b></td>
              <td className="text-center p-3 border-r-2 border-gray-300">456</td>
              <td className="text-center p-3 border-r-2 border-gray-300">5 Tahun</td>
              <td className="text-center p-3">
                <div className="flex items-center justify-center">
                  <div className="bg-yellow-100 w-[100px] h-[24px] flex items-center justify-center rounded-md text-yellow-800">
                    Manual
                  </div>
                </div>
              </td>
            </tr>
            <tr className=" bg-gray-50 odd:bg-white">
              <td className="text-center p-3 border-r-2 border-gray-300">3</td>
              <td className="p-3 border-r-2 border-gray-300">Dokumen <b>Akreditasi</b></td>
              <td className="text-center p-3 border-r-2 border-gray-300">789</td>
              <td className="text-center p-3 border-r-2 border-gray-300">5 Tahun</td>
              <td className="text-center p-3">
                <div className="flex items-center justify-center">
                  <div className="bg-yellow-100 w-[100px] h-[24px] flex items-center justify-center rounded-md text-yellow-800">
                    Manual
                  </div>
                </div>
              </td>
            </tr>
            <tr className=" bg-gray-50 odd:bg-white">
              <td className="text-center p-3 border-r-2 border-gray-300">4</td>
              <td className="p-3 border-r-2 border-gray-300">Dokumen <b>Akreditasi</b></td>
              <td className="text-center p-3 border-r-2 border-gray-300">789</td>
              <td className="text-center p-3 border-r-2 border-gray-300">5 Tahun</td>
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
              <td className="p-3 border-r-2 border-gray-300">Dokumen <b>Akreditasi</b></td>
              <td className="text-center p-3 border-r-2 border-gray-300">789</td>
              <td className="text-center p-3 border-r-2 border-gray-300">5 Tahun</td>
              <td className="text-center p-3">
                <div className="flex items-center justify-center">
                  <div className="bg-purple-100 w-[100px] h-[24px] flex items-center justify-center rounded-md text-purple-800">
                    Otomatis
                  </div>
                </div>
              </td>
            </tr>
            <tr className=" bg-gray-50 odd:bg-white">
              <td className="text-center p-3 border-r-2 border-gray-300">6</td>
              <td className="p-3 border-r-2 border-gray-300">Dokumen <b>Akreditasi</b></td>
              <td className="text-center p-3 border-r-2 border-gray-300">789</td>
              <td className="text-center p-3 border-r-2 border-gray-300">5 Tahun</td>
              <td className="text-center p-3">
                <div className="flex items-center justify-center">
                  <div className="bg-purple-100 w-[100px] h-[24px] flex items-center justify-center rounded-md text-purple-800">
                    Otomatis
                  </div>
                </div>
              </td>
            </tr>
            <tr className=" bg-gray-50 odd:bg-white">
              <td className="text-center p-3 border-r-2 border-gray-300">7</td>
              <td className="p-3 border-r-2 border-gray-300">Dokumen <b>Akreditasi</b></td>
              <td className="text-center p-3 border-r-2 border-gray-300">789</td>
              <td className="text-center p-3 border-r-2 border-gray-300">5 Tahun</td>
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
      </div>
    </div>
  );
};

export default Catdok;
