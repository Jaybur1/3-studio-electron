import React, { useState, useEffect, Suspense, Fragment } from "react";
import { Canvas, Dom } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

import Controls from "../Controls/Controls";
import Environment from "../Enivronment/Environment";
import Bridge from "../Bridge/Bridge";

import createModel from "../../../../../helpers/createModel";
import orthoViewPositions from "../../../../../helpers/orthoViewsPositions";

const Model = props => {
  // ! State ------------------------------------------------- //
  // ? Model, bounding box, zoom, center states //
  const [model, setModel] = useState(null);
  const [box, setBox] = useState();
  const [fov, setFov] = useState(45);
  const [far, setFar] = useState(0);
  const [near, setNear] = useState(0);
  const [sizeBounding, setSizeBounding] = useState({ x: 0, y: 0, z: 0 });

  // ? Environment & background states //
  const [environment, setEnvironment] = useState(null);
  const [bgSolid, setBgSolid] = useState(true);
  const [bgEnvironment, setBgEnvironment] = useState(false);
  const [mapEnvironment, setMapEnvironment] = useState(true);
  const [bgColor, setBgColor] = useState("262326");

  // ? Lights states //
  // Ambient
  const [ambient, setAmbient] = useState(true);
  const [ambientColor, setAmbientColor] = useState("ffffff");
  const [ambientIntensity, setAmbientIntensity] = useState(0.3);

  // Hemisphere
  const [hemisphere, setHemisphere] = useState(true);
  const [hemisphereColor, setHemisphereColor] = useState("ffffff");
  const [hemisphereIntensity, setHemisphereIntensity] = useState(1);

  // Directional
  const [directional, setDirectional] = useState(true);
  const [directionalColor, setDirectionalColor] = useState("ffffff");
  const [directionalIntensity, setDirectionalIntensity] = useState(
    0.8 * Math.PI
  );
  const [directionalPosition, setDirectionalPosition] = useState([
    0.5,
    0,
    0.86
  ]);

  // ? Additional helpers and controls states //
  const [showAxis, setShowAxis] = useState(true);
  const [showBoundingBox, setShowBoundingBox] = useState(true);
  const [allowOrbitControls, setAllowOrbitControls] = useState(true);
  const [autoRotate, setAutoRotate] = useState(false);

  // ? Cameras
  const [perspective, setPerspective] = useState(true);
  const [ortho, setOrtho] = useState(null);

  // ! ------------------------------------------------- //
  // ? Load model with materials
  useEffect(() => {
    new GLTFLoader().load(props.url, gltf =>
      createModel(gltf, setBox, setFar, setModel, setSizeBounding, setNear)
    );
  }, [props.url]);

  // ? Fallback case
  const fallbackElement = (
    <Dom>
      <div></div>
    </Dom>
  );

  const generateOrthoCamera = side => {
    setPerspective(false);
    setOrtho(orthoViewPositions()[side]);
    setFov(30);
  };

  const generatePerspectiveCamera = () => {
    setPerspective(true);
    setOrtho(null);
    setFov(45);
  };

  // ? Canvas output
  const canvasElement = model ? (
    <Fragment>
      <Canvas
        camera={{
          position: perspective
            ? [-sizeBounding.x, sizeBounding.y, sizeBounding.z]
            : ortho,
          fov,
          far,
          near
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.outputEncoding = THREE.sRGBEncoding;
          gl.gammaFactor = 2.2;
        }}
      >
        <primitive object={model} />
        {directional && (
          <directionalLight
            intensity={directionalIntensity}
            color={`#${directionalColor}`}
            position={directionalPosition}
          />
        )}
        {hemisphere && (
          <hemisphereLight
            intensity={hemisphereIntensity}
            color={`#${hemisphereColor}`}
          />
        )}
        {ambient && (
          <ambientLight
            intensity={ambientIntensity}
            color={`#${ambientColor}`}
          />
        )}
        <Suspense fallback={fallbackElement}>
          <Environment
            bgEnvironment={bgEnvironment}
            bgSolid={bgSolid}
            bgColor={bgColor}
            mapEnvironment={mapEnvironment}
          />
          <Bridge />
        </Suspense>
        {allowOrbitControls && <Controls autoRotate={autoRotate} />}
        {showAxis && (
          <axesHelper
            scale={[
              0.75 * sizeBounding.x,
              0.75 * sizeBounding.y,
              0.75 * sizeBounding.z
            ]}
          />
        )}
        {showBoundingBox && <boxHelper object={box} />}
      </Canvas>
    </Fragment>
  ) : null;

  return <div>{canvasElement}</div>;
};

export default Model;
