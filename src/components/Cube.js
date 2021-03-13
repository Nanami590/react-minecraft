import React from "react";
import { useBox } from "use-cannon";
import * as textures from "../textures"; 


export const Cube = ({position, type, ...props}) => {
    const [ref] = useBox(() => ({
        type: "Static",
        position,
        ...props
    }));

    return (
        <mesh castShadow ref={ref}>
            {[...Array(6)].map((_, index) => (
                <meshStandardMaterial
                    key={index}
                    map={textures[type]}
                    attachArray={"material"}
                />
            ))}
            <boxBufferGeometry attach="geometry" />
        </mesh>
    )
};
