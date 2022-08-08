import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";

/**
 * PasteNotFound is displayed when a paste ID cannot be found.
 */
export default function PasteNotFound(): JSX.Element {
  return (
    <Container>
      <Grid container py={3}>
        <Grid item md={12} p={1} width="100%" textAlign="center">
          <h1>Paste not found</h1>
          <Box py={1}>
            <Typography>
              Check the URL and make sure you have the correct ID.
              Otherwise, the paste might have expired.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}