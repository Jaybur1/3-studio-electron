import React from "react";

import Model from "./Model/Model";
import UserControls from "./UserControls/UserControls";

const Edit = () => (
  <div className="edit">
    <Model url="models/car.glb" />
    <UserControls />
  </div>
);

export default Edit;
