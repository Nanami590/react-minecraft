import React, { useState } from "react";
import { useBox } from "use-cannon";

import * as textures from "../textures"; 

import { CUBE_TEXTURES } from "../enums";


export const Cube = ({position, texture, ...props}) => {
    const [hover, setHover] = useState(null);

    const [ref] = useBox(() => ({
        type: "Static",
        position,
        ...props
    }));

    const toggleCubeHover = (event) => {
        event.stopPropagation();
        
        setHover(Math.floor(event.faceIndex / 2));
    };

    const removeHover = () => { setHover(null); };

    return (
        <mesh castShadow ref={ref} onPointerMove={toggleCubeHover} onPointerOut={removeHover}>
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
