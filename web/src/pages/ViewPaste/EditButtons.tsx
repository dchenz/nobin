import { Check, Close, Delete, Edit } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import ConfirmDelete from "./ConfirmDelete";
import "./styles.scss";

type EditButtonsProps = {
  isEditing: boolean
  setEditing: (_: boolean) => void
  deletePaste: () => void
}

/**
 * EditButtons displays buttons for editing and deleting a paste.
 * In editing mode, it displays buttons for saving and discarding changes.
 */
export default function EditButtons(props: EditButtonsProps): JSX.Element {
  const [confirmAnchor, setConfirmAnchor] = useState<HTMLElement | null>(null);
  const closeConfirmModal = () => setConfirmAnchor(null);
  return (
    <Box className="control-btn-ctn">
      {
        props.isEditing ?
          <Button
            className="control-btn"
            variant="contained"
            color="success"
            onClick={() => props.setEditing(false)}
            startIcon={<Check />}
            disableRipple
          >
            Save
          </Button> :
          <Button
            className="control-btn"
            variant="contained"
            onClick={() => props.setEditing(true)}
            startIcon={<Edit />}
            disableRipple
          >
            Edit
          </Button>
      }
      {
        props.isEditing ?
          <Button
            className="control-btn"
            variant="contained"
            color="error"
            onClick={() => props.setEditing(false)}
            startIcon={<Close />}
            disableRipple
          >
            Cancel
          </Button> :
          <React.Fragment>
            <Button
              className="control-btn"
              variant="contained"
              color="error"
              onClick={(e) => {
                setConfirmAnchor(e.currentTarget);
              }}
              startIcon={<Delete />}
              disableRipple
            >
              Delete
            </Button>
            <ConfirmDelete
              anchorEl={confirmAnchor}
              open={confirmAnchor != null}
              onClose={closeConfirmModal}
              onConfirm={() => {
                props.deletePaste();
                closeConfirmModal();
              }}
              onCancel={closeConfirmModal}
            />
          </React.Fragment>
      }
    </Box>
  );
}