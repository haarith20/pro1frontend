import React from "react";
import TheNavbar from "./TheNavbar.js";

const TheNav = (props) => {
  //Rendering the Navbar
  return (
    <header>
      <TheNavbar onShowCart={props.onShowCart} />
    </header>
  );
  //END
};

export default TheNav;
