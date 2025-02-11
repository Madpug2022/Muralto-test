import React from "react";
import Model from "./components/visor/Model";

const Visor = ({ externalIds, testMode }) => {
  return <Model externalIds={externalIds} testMode={testMode} />;
};

export default Visor;
