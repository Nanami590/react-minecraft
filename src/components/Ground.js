import React from "react";
import { usePlane } from "use-cannon";
import { TextureLoader, RepeatWrapping } from "three";

import { useStore } from "../hooks";

import grass from "../images/grass.jpg";


export const Ground = (props) => {
  const [ addCube, activeTexture ] = useStore((state) => [ state.addCube, state.texture ]);
  const [ ref ] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));

  const texture = new TextureLoader().load(grass);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(100, 100);

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
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial
        map={texture}
        attach="material"
      />
    </mesh>
  );
}
