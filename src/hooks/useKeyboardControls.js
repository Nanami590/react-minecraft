import { useState, useEffect } from "react";
import { useStore } from "./useStore";

import { CUBE_TEXTURES, ACTION_KEYS } from "../enums";


const actionByKey = (key) => {
  const keys = {
    KeyW: ACTION_KEYS.KEY_W,
    KeyS: ACTION_KEYS.KEY_S,
    KeyA: ACTION_KEYS.KEY_A,
    KeyD: ACTION_KEYS.KEY_D,
    Space: ACTION_KEYS.SPACE
  };

  return keys[key];
};

const textureByKey = (key) => {
  const keys = {
    Digit1: CUBE_TEXTURES.DIRT,
    Digit2: CUBE_TEXTURES.GRASS,
    Digit3: CUBE_TEXTURES.GLASS,
    Digit4: CUBE_TEXTURES.WOOD,
    Digit5: CUBE_TEXTURES.LOG,
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
