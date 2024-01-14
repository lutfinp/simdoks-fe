import React from "react";
import Header from "./Header";

const NavCategory = ({judul, add, vardumb}) => {
  return (
    <>
      <Header judul={judul} add={add} coba={vardumb}/>
    </>
  );
};

export default NavCategory;
