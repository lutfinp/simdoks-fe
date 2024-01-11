import React from "react";
import Allfolder from "./Allfolder";

const ListFolder = ({ data, id, sub }) => {
  return (
    <>
      <Allfolder data={data} id={id} sub={sub}/>
    </>
  );
};

export default ListFolder;
