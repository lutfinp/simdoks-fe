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
  direct,
  access
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
        access={access}
      />
    </>
  );
};

export default ListFolder;
