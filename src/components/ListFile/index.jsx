import React from "react";
import Allfile from "./Allfile";

const ListFile = ({
  data,
  id,
  subid,
  handleFileClick,
  fileUrl,
  fileName,
  selectedFileId,
  api,
  direct,
  access,
  keyword
}) => {
  return (
    <>
      <Allfile
        data={data}
        id={id}
        subid={subid}
        handleFileClick={handleFileClick}
        fileUrl={fileUrl}
        fileName={fileName}
        selectedFileIdFileId={selectedFileId}
        api={api}
        direct={direct}
        access={access}
        keyword={keyword}
      />
    </>
  );
};

export default ListFile;
