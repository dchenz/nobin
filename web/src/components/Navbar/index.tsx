import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import NavBrand from "./NavBrand";

/**
 * Navbar should be rendered on the top of every route.
 * It includes the logo on the far-left which links to the homepage.
 */
export default function Navbar(): JSX.Element {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <NavBrand />
      </Toolbar>
    </AppBar>
  );
}