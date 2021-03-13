import { useState, useEffect } from "react";
import { useStore } from "./useStore";


const actionByKey = (key) => {
  const keys = {
    KeyW: "moveForward",
    KeyS: "moveBackward",
    KeyA: "moveLeft",
    KeyD: "moveRight",
    Space: "jump",
  };

  return keys[key];
};

const textureByKey = (key) => {
  const keys = {
    Digit1: "dirt",
    Digit2: "grass",
    Digit3: "glass",
    Digit4: "wood",
    Digit5: "log",
  };

  return keys[key];
};


const initialMovementState = {
  moveForward: false,
  moveBackward: false,
  moveLeft: false,
  moveRight: false,
  jump: false
};

export const useKeyboardControls = () => {
  const [ movement, setMovement ] = useState(initialMovementState);

  const setTexture = useStore((state) => state.setTexture);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if(actionByKey(event.code)) {
        setMovement((state) => ({ ...state, [actionByKey(event.code)]: true}));
      }

      if(textureByKey(event.code)) {
        setTexture(textureByKey(event.code));
      }
    };

    const handleKeyUp = (event) => {
      if(actionByKey(event.code)) {
        setMovement((state) => ({ ...state, [actionByKey(event.code)]: false}));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    }
  }, [])

  return movement;
};
