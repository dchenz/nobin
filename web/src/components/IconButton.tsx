/* eslint-disable react/prop-types */
import MUIIconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import React, { forwardRef } from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const IconButton = forwardRef(({ tooltip, external, ...props }: any, ref): JSX.Element => {

  const btn = (
    <MUIIconButton
      {...props}
      to={external ? undefined : props.href}
      ref={ref}
      color={props.color ?? "secondary"}
      target={external ? "_blank" : props.target}
      rel={external ? "noopener noreferrer" : props.rel}
      component={Link}
    >
      {props.children}
    </MUIIconButton>
  );

  if (tooltip) {
    return (
      <Tooltip title={tooltip}>
        {btn}
      </Tooltip>
    );
  }

  return btn;
});

IconButton.displayName = "IconButton";

export default IconButton;