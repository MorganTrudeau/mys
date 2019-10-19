import React, { useState } from "react";
import {
  Hidden,
  Drawer,
  IconButton,
  Grid,
  Typography,
  Button
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NavContent from "../NavContent/NavContent";

const TopNav = props => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  return (
    <Hidden mdUp implementation="css">
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={toggle}
        edge="start"
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="temporary"
        anchor={"top"}
        open={open}
        onClose={toggle}
        ModalProps={{
          keepMounted: true
        }}
      >
        <NavContent onSelect={toggle} />
      </Drawer>
    </Hidden>
  );
};

export default TopNav;
