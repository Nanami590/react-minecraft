import React from "react";
import { Canvas } from "react-three-fiber";
import { Sky } from "drei";
import { Physics } from "use-cannon";

import { Ground, Player, Cube } from "./components";

function App() {
  return (
    <Canvas shadowMap sRGB>
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={0.25}/>
      <pointLight castShadow intensity={0.7} position={[100, 100, 100]} />
      <Physics>
        <Ground position={[0, 0.5, 0]} />
        <Player position={[0, 3, 10]} />
        <Cube position={[0, 1, 0]} type={"wood"}/>
      </Physics>
    </Canvas>
  );
}

export default App;
