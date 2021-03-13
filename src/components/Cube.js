import React, { useState } from "react";
import { useBox } from "use-cannon";

import * as textures from "../textures"; 

import { CUBE_TEXTURES } from "../enums";

import { useStore } from "../hooks";


export const Cube = ({position, texture, ...props}) => {
    const [ addCube, removeCube, activeTexture ] = useStore((state) => [state.addCube, state.removeCube, state.texture]);
    const [ hover, setHover ] = useState(null);

    const [ ref ] = useBox(() => ({
        type: "Static",
        position,
        ...props
    }));

    const getClickedFace = (event) => Math.floor(event.faceIndex / 2);

    const toggleCubeHover = (event) => {
        event.stopPropagation();
        
        setHover(getClickedFace(event));
    };

    const removeHover = () => { setHover(null); };

    const clickOnCube = (event) => {
        event.stopPropagation();

        const clickedFace = getClickedFace(event);
        const { x, y, z } = ref.current.position;

        switch (clickedFace) {
            case 0: event.altKey ? removeCube(x, y, z) : addCube(x + 1, y, z, activeTexture); return;
            case 1: event.altKey ? removeCube(x, y, z) : addCube(x - 1, y, z, activeTexture); return;
            case 2: event.altKey ? removeCube(x, y, z) : addCube(x, y + 1, z, activeTexture); return;
            case 3: event.altKey ? removeCube(x, y, z) : addCube(x, y - 1, z, activeTexture); return;
            case 4: event.altKey ? removeCube(x, y, z) : addCube(x, y, z + 1, activeTexture); return;
            case 5: event.altKey ? removeCube(x, y, z) : addCube(x, y, z - 1, activeTexture); return;
            default: return;
        }
    };

    return (
        <mesh
            ref={ref}
            castShadow
            onClick={clickOnCube}
            onPointerOut={removeHover}
            onPointerMove={toggleCubeHover}
        >
            {[...Array(6)].map((_, index) => (
                <meshStandardMaterial
                    key={index}
                    transparent={true}
                    map={textures[texture]}
                    attachArray={"material"}
                    color={hover === index ? "gray" : "white"}
                    opacity={texture === CUBE_TEXTURES.GLASS ? 0.7 : 1}
                />
            ))}
            <boxBufferGeometry attach="geometry" />
        </mesh>
    )
};
