import React from "react";
import Model from "./components/visor/Model";
import Visor2D from "./components/visor/Visor2D";
import ModelViewer from "./components/visor/Testes";

const Visor = ({
  externalIds = null,
  testMode = false,
  dataUrl,
  roomsUrl,
  modelUrl,
  backgroundColor = "#f0f0f0",
  level = "none",
}) => {
  /**/
  /**/
  return (
    <Model
      externalIds={externalIds}
      testMode={testMode}
      dataUrl={dataUrl}
      roomsUrl={roomsUrl}
      modelUrl={modelUrl}
      backgroundColor={backgroundColor}
      level={level}
    />
  );
};

export default Visor;
