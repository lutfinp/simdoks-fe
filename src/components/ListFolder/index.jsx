import React from "react";
import Allfolder from "./Allfolder";

const ListFolder = ({
  data,
  id,
  sub,
  file,
  handleFileClick,
  selectedFileId,
  api,
  direct
}) => {
  return (
    <>
      <Allfolder
        data={data}
        id={id}
        sub={sub}
        file={file}
        handleFileClick={handleFileClick}
        selectedFileIdFileId={selectedFileId}
        api={api}
        direct={direct} 
      />
    </>
  );
};

export default ListFolder;
