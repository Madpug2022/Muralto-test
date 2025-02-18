// @ts-ignore
import { Visor } from "@madpug2022/muralto";
import "./App.css";

function App() {
  return (
    <>
      <Visor
        roomsUrl={"/Muralto/rooms.glb"}
        modelUrl={"/Muralto/compresedMuralto.glb"}
        dataUrl={"/Muralto/props.json"}
        testMode={true}
      />
    </>
  );
}

export default App;
