import { CaretLeft, CaretRight } from "@phosphor-icons/react";

const PaginationUpdate = ({ totalPageUpload, pageUpdate, setPageUpdate }) => {
  const handleNextPage = () => {
    setPageUpdate((prevState) => prevState + 1);
  };

  const handlePrevPage = () => {
    setPageUpdate((prevState) => prevState - 1);
  };

  return (
    <div className="flex justify-center items-center py-4 px-2 gap-4 text-color-primary text-2xl">
      {pageUpdate <= 1 ? null : (
        <button
          onClick={handlePrevPage}
          className="transition-all hover:text-color-accent hover:text-blue-500"
        >
          <CaretLeft size={17} />
        </button>
      )}
      <p className="text-sm">{pageUpdate < 2 ? null : pageUpdate}</p>
      {pageUpdate >= totalPageUpload ? null : (
        <button
          onClick={handleNextPage}
          className="transition-all hover:text-color-accent hover:text-blue-500"
        >
          <CaretRight size={17} />
        </button>
      )}
    </div>
  );
};

export default PaginationUpdate;
