import React from "react";
import PaginationReminder from "../Utilities/PaginationReminder";
import Image from "next/image";

const Announc = ({
  data,
  totalPageReminder,
  pageReminder,
  setPageReminder,
}) => {
  const hitungTanggal = data[0]?.untilDate;
  const tanggal = new Date(hitungTanggal);

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "id-ID",
      options
    );
    return formattedDate;
  };

  return (
    <div className="flex gap-1 flex-col py-3 px-4 w-full h-[120px] text-sm bg-red-100 rounded-md text-red-700">
      <b className="flex flex-row gap-1">
        <Image src="/assets/bullhorn.png" alt="logo" width={20} height={20} />
        PERHATIAN
      </b>
      <div className="items-center justify-between">
        <div>
          Terdapat <b>{data[0]?.totalFiles} Dokumen</b> yang akan kadaluarsa
          pada tanggal <b>{formatDate(tanggal.setDate(tanggal.getDate() - 1))}</b>. Dokumen tersebut
          akan dihapus otomatis, anda dapat menemukan daftar dokumen yang akan
          dihapus pada menu <b>'Histori'</b>.
        </div>
        <div>
          <PaginationReminder
            totalPageReminder={totalPageReminder}
            pageReminder={pageReminder}
            setPageReminder={setPageReminder}
          />
        </div>
      </div>
    </div>
  );
};

export default Announc;
