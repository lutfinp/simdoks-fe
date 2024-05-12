import Hasdok from "./Hasdok";

const Hapus = ({
  data,
  totalPageHapus,
  pageHapus,
  setPageHapus,
  setFilterDelete,
  setSearchDelete,
  setKeywordDelete,
}) => {
  return (
    <div className="ml-[32px] mr-[32px] my-4">
      <div>
        <Hasdok
          data={data}
          totalPageHapus={totalPageHapus}
          pageHapus={pageHapus}
          setPageHapus={setPageHapus}
          setFilterDelete={setFilterDelete}
          setSearchDelete={setSearchDelete}
          setKeywordDelete={setKeywordDelete}
        />
      </div>
    </div>
  );
};

export default Hapus;
