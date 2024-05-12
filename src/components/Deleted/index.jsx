import Deldok from "./Deldok";

const Deleted = ({
  data,
  pageHapus,
  setPageHapus,
  totalPage,
  setSearchDelete,
  setKeywordDelete
}) => {
  return (
    <>
      <Deldok
        data={data}
        totalPage={totalPage}
        pageHapus={pageHapus}
        setPageHapus={setPageHapus}
        setSearchDelete={setSearchDelete}
        setKeywordDelete={setKeywordDelete}
      />
    </>
  );
};

export default Deleted;
