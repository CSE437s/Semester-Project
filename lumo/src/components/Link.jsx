import React from "react";
import { Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Link(props) {
  return <MuiLink component={RouterLink} {...props} />;
}

export default Link;
