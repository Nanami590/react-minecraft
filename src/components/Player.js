import React from "react";
import { useSphere } from "use-cannon";
import { useThree, useFrame } from "react-three-fiber";

import { useKeyboardControls } from "../hooks";


export const Player = (props) => {
    const { moveForward, moveBackward, moveLeft, moveRight, jump } = useKeyboardControls();
    const { camera } = useThree();
    const [ref] = useSphere( () => ({
        mass: 1,
        type: "Dynamic",
        ...props
    }));

    console.log('moving', moveForward, moveBackward, moveLeft, moveRight, jump);

    useFrame(() => { camera.position.copy(ref.current.position); });

    return (
        <>
            <mesh ref={ref} />
        </>
    );
};

