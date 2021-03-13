import React from "react";
import { Canvas } from "react-three-fiber";
import { Sky } from "drei";
import { Physics } from "use-cannon";
import { nanoid } from "nanoid";


import { useStore, useInterval } from "./hooks";

import { Ground, Player, Cube } from "./components";


function App() {
  const [ cubes, saveWorld ] = useStore((state) => [state.cubes, state.saveWorld]);

  useInterval(() => { saveWorld(cubes); console.log("World saved.") }, 60000);

  return (
    <Canvas shadowMap sRGB>
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={0.25}/>
      <pointLight castShadow intensity={0.7} position={[100, 100, 100]} />
      <Physics>
        <Ground position={[0, 0.5, 0]} />
        <Player position={[0, 20, -20]} />

        {cubes.map(({pos, texture}) => (
          <Cube key={nanoid()} position={pos} texture={texture}/>
        ))}

      </Physics>
    </Canvas>
  );
}

export default App;
