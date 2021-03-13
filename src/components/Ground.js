import React, { useMemo } from "react";
import { usePlane } from "use-cannon";
import { TextureLoader, RepeatWrapping } from "three";

import { useStore } from "../hooks";

import grass from "../images/grass.jpg";


export const Ground = (props) => {
  const [ addCube, activeTexture ] = useStore((state) => [ state.addCube, state.texture ]);
  const [ ref ] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));

  const texture = useMemo(() => {
    const returnedTexture = new TextureLoader().load(grass);
    returnedTexture.wrapS = RepeatWrapping;
    returnedTexture.wrapT = RepeatWrapping;
    returnedTexture.repeat.set(50, 50);
    
    return returnedTexture;
  }, []);

  const groundClick = (event) => {
    event.stopPropagation();

    const [ x, y, z ] = Object.values(event.point).map(coord => Math.ceil(coord));
    addCube(x, y, z, activeTexture);
  };

  return (
    <mesh
      ref={ref}
      receiveShadow
      onClick={groundClick}
    >
      <planeBufferGeometry attach={"geometry"} args={[50, 50]} />
      <meshStandardMaterial map={texture} attach={"material"} />
    </mesh>
  );
}
