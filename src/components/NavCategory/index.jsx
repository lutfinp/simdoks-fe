import React from "react";
import Header from "./Header";

const NavCategory = ({judul, add, id, subid, vardumb , api, direct}) => {
  return (
    <>
      <Header judul={judul} add={add} id={id} subid={subid} coba={vardumb} api={api} direct={direct}/>
    </>
  );
};

export default NavCategory;
