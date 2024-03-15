import React from "react";
import Allfile from "./Allfile";

const ListFile = ({ data, id, subid, handleFileClick, fileUrl, fileId, api }) => {
  return (
    <>    
        <Allfile data={data} id={id} subid={subid}  handleFileClick={handleFileClick} fileUrl={fileUrl} fileId={fileId} api={api}/>
    </>
  );
};

export default ListFile;