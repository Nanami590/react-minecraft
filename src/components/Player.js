import React, { useRef, useEffect } from "react";
import { useSphere } from "use-cannon";
import { useThree, useFrame } from "react-three-fiber";
import { Vector3 } from "three";

import { useKeyboardControls } from "../hooks";

import { FPVControls } from "./FirstPersonViewControls";

import { SPEED } from "../enums";


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

        if ( jump && Math.abs(refVelocity.current[1].toFixed(2)) < 0.05) {
            api.velocity.set(refVelocity.current[0], 8, refVelocity.current[2])
        }
    });

    return (
        <>
            <FPVControls />
            <mesh ref={ref} />
        </>
    );
};

