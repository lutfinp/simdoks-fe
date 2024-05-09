import React from "react";
import Header from "./Header";

const NavCategory = ({judul, add, id, subid, vardumb , api, direct, donthassubfolder, searchfile, filteron, setFilter, keyword}) => {
  return (
    <>
      <Header judul={judul} add={add} id={id} subid={subid} coba={vardumb} api={api} direct={direct} donthassubfolder={donthassubfolder} searchfile={searchfile} filteron={filteron} setFilter={setFilter} keyword={keyword}/>
    </>
  );
};

export default NavCategory;
