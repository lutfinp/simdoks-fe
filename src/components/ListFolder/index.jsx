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
  access,
  keyword
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
        keyword={keyword}
      />
    </>
  );
};

export default ListFolder;
