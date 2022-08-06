import { Box, Container, Typography } from "@mui/material";
import React from "react";
import "./styles.scss";

/**
 * Footer should be rendered on the bottom of every route.
 */
export default function Footer(): JSX.Element {
  return (
    <Box id="page-footer" py={5} mt={5}>
      <Container>
        <Typography>
          NOBIN handles all encryption in the browser.
        </Typography>
      </Container>
    </Box>
  );
}