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
import { FormControlLabel, Checkbox, Slider } from "@material-ui/core";

const WSphere = (props) => {
  const [openWSphere, setOpenWSphere] = useState(false);
  const [rotateX, setRotateX] = useState(false);
  const [rotateY, setRotateY] = useState(false);
  const [rotateZ, setRotateZ] = useState(false);
  const handleClick = () => {
    setOpenWSphere(!openWSphere);
  };

  const handleRemoveSphere = () => {
    props.onSetMediaSphere(null);
    setOpenWSphere(false);
  };

  const handleColorSet = (color) => {
    const sphereArgs = { ...props.wSphere, color };
    props.onSetMediaSphere(sphereArgs);
  };

  const handleScaleChange = (e, newValue) => {
    const currentScale = [newValue, newValue, newValue];
    const newScale = { ...props.wSphere, scale: [...currentScale] };
    props.onSetMediaSphere(newScale);
  };

  const handleXrotation = () => {};
  const handleYrotation = () => {};

  const handleZrotation = () => {};
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
        <List component="div" className="details-section" disablePadding>
          <ListItem>
            <ListItemIcon>
              <FormControlLabel
                className="custom-label"
                control={
                  <Checkbox
                    className="custom-checkbox"
                    checked={rotateX}
                    onChange={handleXrotation}
                    name="x-rotation"
                  />
                }
              />
            </ListItemIcon>
            <ListItemText primary="X-rotation" />
          </ListItem>
        </List>
        <List component="div" disablePadding>
          <ListItem>
            <ListItemIcon>
              <ColorPickerPopover
                visible
                color={props.wSphere.color}
                setColor={handleColorSet}
              />
            </ListItemIcon>
            <ListItemText primary="Color" />
          </ListItem>
        </List>
        <List component="div" disablePadding>
          <ListItem>
            <ListItemText primary="Scale" />
            <Slider
              className="scale-slider"
              value={props.wSphere.scale[0]}
              valueLabelDisplay="auto"
              step={0.1}
              min={0}
              max={10}
              onChange={handleScaleChange}
            />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};

WSphere.propTypes = {
  onSetMediaSphere: PropTypes.func.isRequired,
  wSphere: PropTypes.object,
};

export default WSphere;
