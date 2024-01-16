import React from "react";
import Allfile from "./Allfile";

const ListFile = ({ data, id, subid }) => {
  return (
    <>    
        <Allfile data={data} id={id} subid={subid}/>
    </>
  );
};

export default ListFile;