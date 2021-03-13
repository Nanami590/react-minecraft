import React, { useRef, useEffect } from "react";
import { useSphere } from "use-cannon";
import { useThree, useFrame } from "react-three-fiber";
import { Vector3 } from "three";

import { useKeyboardControls } from "../hooks";


const SPEED = 6;

export const Player = (props) => {
    const { camera } = useThree();
    const refVelocity = useRef([0, 0, 0]);
    const [ ref, api ] = useSphere(() => ({ mass: 1, type: "Dynamic", ...props }));
    const { moveForward, moveBackward, moveLeft, moveRight, jump } = useKeyboardControls();

    useEffect(() => {
        api.velocity.subscribe((velocity) => refVelocity.current = velocity);
    }, [api.velocity]);

    useFrame(() => {
        camera.position.copy(ref.current.position);
        
        const direction = new Vector3();
        const frontVector = new Vector3(0, 0, (moveBackward ? 1 : 0) - (moveForward ? 1 : 0));
        const sideVector = new Vector3((moveLeft ? 1 : 0) - (moveRight ? 1 : 0), 0, 0);

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED)
            .applyEuler(camera.rotation);

        api.velocity.set(direction.x, refVelocity.current[1], direction.z);
    });

    return (
        <>
            <mesh ref={ref} />
        </>
    );
};

