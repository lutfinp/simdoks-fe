import Hasdok from "./Hasdok";

const Hapus = ({ data, total, pageHapus, setPageHapus }) => {
  return (
    <div className="ml-[32px] mr-[32px] my-4">
      <div>
        <Hasdok data={data} total={total} pageHapus={pageHapus} setPageHapus={setPageHapus}/>
      </div>
    </div>
  );
};

export default Hapus;
