import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import React, { useMemo } from "react";
import { PasteFull } from "../../shared/types/Paste";

type PasteInfoTableProps = {
  paste: PasteFull
}

/**
 * PasteInfoTable displays the metadata of a paste in table format.
 */
export default function PasteInfoTable({ paste }: PasteInfoTableProps): JSX.Element {

  const [creationTime, expiryTime] = useMemo(() => {
    if (paste.duration == 0) {
      return [
        paste.createdAt.toUTCString(),
        "Never"
      ];
    }
    const expiry = new Date(paste.createdAt);
    expiry.setMinutes(expiry.getMinutes() + paste.duration);
    return [
      paste.createdAt.toUTCString(),
      expiry.toUTCString()
    ];
  }, [paste.createdAt, paste.duration]);

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell variant="head">
            Paste ID
          </TableCell>
          <TableCell>
            {paste.id}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">
            Timestamp
          </TableCell>
          <TableCell>
            {creationTime}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">
            Expires
          </TableCell>
          <TableCell>
            {expiryTime}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}