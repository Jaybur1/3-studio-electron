import React, { useState } from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ColorPickerPopover from "../../../ColorPickerPopover/ColorPickerPopover";

const WSphere = (props) => {
  const [openWSphere, setOpenWSphere] = useState(false);

  const handleClick = () => {
    setOpenWSphere(!openWSphere);
  };

  const handleRemoveSphere = () => {
    props.onSetMediaSphere(null);
    setOpenWSphere(false);
  };

  const handleColorSet = (color) => {
    const sphereArgs = {...props.wSphere, color}
    props.onSetMediaSphere(sphereArgs)
  }
  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <HighlightOffIcon onClick={() => handleRemoveSphere()} />
        </ListItemIcon>
        <ListItemText primary="W-SPHERE" />
        {openWSphere ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openWSphere} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button>
            <ListItemIcon>
              <ColorPickerPopover visible color={props.wSphere.color} setColor={handleColorSet}/>
            </ListItemIcon>
            <ListItemText primary="Color" />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};

WSphere.propTypes = {
  onSetMediaSphere: PropTypes.func.isRequired,
  wSphere: PropTypes.object
};

export default WSphere;