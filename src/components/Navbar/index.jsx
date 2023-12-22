import React from "react";
import Header from "./Header";

const Navbar = ({ data }) => {
  return (
    <>
      <Header name={data} />
    </>
  );
};

export default Navbar;
