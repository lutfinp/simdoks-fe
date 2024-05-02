import React from "react";
import Allfolder from "./Allfolder";

const ListFolder = ({ data, id, sub, file}) => {
  return (
    <>
      <Allfolder data={data} id={id} sub={sub} file={file}/>
    </>
  );
};

export default ListFolder;
