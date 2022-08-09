import { Box, Button, Popover, Typography } from "@mui/material";
import React from "react";

type ConfirmDeleteProps = {
  anchorEl: HTMLElement | null
  open: boolean
  onClose: () => void
  onConfirm: () => void
  onCancel: () => void
}

/**
 * ConfirmDelete displays a prompt with a message and two buttons
 * asking the user to confirm or cancel a certain action.
 */
export default function ConfirmDelete(props: ConfirmDeleteProps): JSX.Element {
  return (
    <Popover
      anchorEl={props.anchorEl}
      open={props.open}
      onClose={props.onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
    >
      <Box p={2} textAlign="center">
        <Typography>
          Confirm delete?
        </Typography>
        <Button onClick={props.onConfirm}>
          OK
        </Button>
        <Button onClick={props.onCancel}>
          Cancel
        </Button>
      </Box>
    </Popover>
  );
}