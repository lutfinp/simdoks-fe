import React from "react";
import Allfile from "./Allfile";

const ListFile = ({ data, id, subid, handleFileClick, fileUrl, selectedFileId, api}) => {
  return (
    <>    
        <Allfile data={data} id={id} subid={subid}  handleFileClick={handleFileClick} fileUrl={fileUrl} selectedFileIdFileId={selectedFileId} api={api} />
    </>
  );
};

export default ListFile;