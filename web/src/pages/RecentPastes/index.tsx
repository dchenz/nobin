import { KeyboardArrowRight } from "@mui/icons-material";
import { Container, Grid, Table, TableBody, TableCell, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import IconButton from "../../components/IconButton";
import { PageRoutes } from "../../shared/Routes";

/**
 * This component shows a table of pastes created in the
 * current session using the cached edit keys in sessionStorage.
 */
export default function RecentPastes(): JSX.Element {
  const [pasteIds, setPasteIds] = useState<string[]>([]);

  useEffect(() => {
    const pastesThisSession = [];
    for (const key of Object.keys(sessionStorage)) {
      if (key.startsWith("edit-")) {
        pastesThisSession.push(key.slice(5));
      }
    }
    setPasteIds(pastesThisSession);
  }, []);

  return (
    <Container>
      <Grid container py={3}>
        <Grid item md={12} p={1} width="100%">
          <Table>
            <TableBody>
              {
                pasteIds.map((id, k) =>
                  <TableRow key={k}>
                    <TableCell>
                      {id}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        tooltip="View paste"
                        href={`${PageRoutes.viewPasteRoot}/${id}`}
                      >
                        <KeyboardArrowRight />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              }
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Container>
  );
}