import React from "react";
import Model from "./components/visor/Model";

const Visor = ({
  externalIds,
  testMode,
  dataUrl,
  roomsUrl,
  modelUrl,
  backgroundColor,
  level,
}) => {
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
