import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import NavBrand from "./NavBrand";

export default function Navbar(): JSX.Element {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <NavBrand />
      </Toolbar>
    </AppBar>
  );
}