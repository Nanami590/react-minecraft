import React, { useState } from "react";
import { useBox } from "use-cannon";
import * as textures from "../textures"; 


export const Cube = ({position, type, ...props}) => {
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

    return (
        <mesh castShadow ref={ref} onPointerMove={toggleCubeHover}>
            {[...Array(6)].map((_, index) => (
                <meshStandardMaterial
                    key={index}
                    map={textures[type]}
                    attachArray={"material"}
                    color={hover === index ? "gray" : "white"}
                />
            ))}
            <boxBufferGeometry attach="geometry" />
        </mesh>
    )
};
