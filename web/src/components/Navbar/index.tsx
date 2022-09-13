import { ContentPaste } from "@mui/icons-material";
import { AppBar, Box, Toolbar } from "@mui/material";
import React from "react";
import { PageRoutes } from "../../shared/Routes";
import IconButton from "../IconButton";
import NavBrand from "./NavBrand";

/**
 * Navbar should be rendered on the top of every route.
 * It includes the logo on the far-left which links to the homepage.
 */
export default function Navbar(): JSX.Element {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box py={1}>
          <NavBrand />
        </Box>
        <Box flexGrow={1}></Box>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <IconButton
            tooltip="Recent pastes"
            href={PageRoutes.recentPastes}
          >
            <ContentPaste htmlColor="white" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}