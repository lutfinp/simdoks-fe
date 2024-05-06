import React from "react";

const Announc = ({ total, date }) => {
  return (
    <div className="flex items-center justify-center w-full h-[120px] text-sm font-bold bg-red-100 rounded-md text-center">
      Terdapat {total} Dokumen yang akan kadaluarsa pada tanggal {date}.
      Dokumen tersebut akan dihapus otomatis pada tanggal {date}. Anda
      dapat menemukan daftar dokumen yang akan dihapus pada menu 'Histori'.
    </div>
  );
};

export default Announc;
