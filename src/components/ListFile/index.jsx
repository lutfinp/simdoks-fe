import React from "react";
import Allfile from "./Allfile";

const ListFile = ({ data, id, subid, handleFileClick, fileUrl, fileName, selectedFileId, api, direct, access}) => {
  return (
    <>    
        <Allfile data={data} id={id} subid={subid}  handleFileClick={handleFileClick} fileUrl={fileUrl} fileName={fileName} selectedFileIdFileId={selectedFileId} api={api} direct={direct} access={access} />
    </>
  );
};

export default ListFile;