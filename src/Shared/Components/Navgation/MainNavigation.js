import React from "react";
import { useState } from "react";

import MainHeader from "./MainHeader";
import "./MainNavigation.css";

import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";
import "./MainNavigation.css";

const MainNavigation = () => {
  const [isDrawerIsOpen, setIsDrawerIsOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerIsOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerIsOpen(false);
  };

  return (
    <>
      {isDrawerIsOpen && <Backdrop onClick={closeDrawer} />}
      {isDrawerIsOpen && (
        <SideDrawer onClick={closeDrawer} show={isDrawerIsOpen}>
          <nav className="main-navigation__drawer-nav">
            <NavLinks />
          </nav>
        </SideDrawer>
      )}
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawer}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">Your Places</h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
