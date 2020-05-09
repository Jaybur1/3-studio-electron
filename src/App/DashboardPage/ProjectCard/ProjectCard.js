import React from "react";
import PropTypes from "prop-types";

import {
  Card,
  CardContent,
  Typography,
  Divider,
  Button
} from "@material-ui/core";
import CameraIcon from "@material-ui/icons/Camera";

import SwipePictures from "../../UI/SwipePictures/SwipePictures";

import "./ProjectCard.scss";

const ProjectCard = props => (
  <div className="project-card">
    <Card classes={{ root: "single-card" }}>
      <SwipePictures pictures={props.screenshots.slice(0, 3)} />
      <CardContent classes={{ root: "content-area" }}>
        <Typography gutterBottom variant="h5" component="h2">
          {props.name}
        </Typography>
        <Typography
          variant="body2"
          component="p"
          classes={{ root: "project-description" }}
        >
          {props.description}
        </Typography>
        <div className="section">
          <Typography variant="caption" component="p">
            Created:
          </Typography>
          <Typography variant="caption" component="p">
            Updated:
          </Typography>
        </div>
        <Divider variant="fullWidth" classes={{ root: "horizontal-divider" }} />
        <span className="gradient-button">
          <Button
            classes={{ root: "open-in-studio" }}
            variant="contained"
            color="primary"
            startIcon={<CameraIcon />}
            // onClick={fileExporter}
          >
            Open in Studio
          </Button>
        </span>
      </CardContent>
    </Card>
  </div>
);

ProjectCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  screenshots: PropTypes.array.isRequired
};

export default ProjectCard;
