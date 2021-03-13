import create from "zustand";

import { CUBE_TEXTURES } from "../enums";


const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));
const setLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value)); 


export const useStore = create((set) => ({
    cubes: getLocalStorage("world") || [],
    addCube: (x ,y ,z, texture) => set(state => ({ cubes: [...state.cubes, {pos: [x, y, z], texture}] })),
    removeCube: (x, y, z) => set(state => ({cubes: state.cubes.filter(({pos}) => pos[0] !== x || pos[1] !== y || pos[2] !== z)})),
    texture: CUBE_TEXTURES.WOOD,
    setTexture: (texture) => set(_ => ({ texture })),
    saveWorld: () => set((state => { setLocalStorage("world", state.cubes); }))
}));
