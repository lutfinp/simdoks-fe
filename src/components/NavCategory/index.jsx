import React from "react";
import Header from "./Header";

const NavCategory = ({judul, add, id, subid}) => {
  return (
    <>
      <Header judul={judul} add={add} id={id} subid={subid}/>
    </>
  );
};

export default NavCategory;
