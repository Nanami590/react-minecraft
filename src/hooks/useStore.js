import create from "zustand";

import { CUBE_TEXTURES } from "../enums";


const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));
const setLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value)); 


const initialState = [
    {pos: [1, 1, 0], texture: CUBE_TEXTURES.WOOD},
    {pos: [2, 1, 0], texture: CUBE_TEXTURES.DIRT},
    {pos: [-1, 1, 0], texture: CUBE_TEXTURES.GLASS},
    {pos: [0, 1, 0], texture: CUBE_TEXTURES.GRASS},
    {pos: [-2, 1, 0], texture: CUBE_TEXTURES.LOG},
];

export const useStore = create((set) => ({
    cubes: getLocalStorage("world") || initialState,
    addCubes: (x ,y ,z, texture) => set(state => ({ cubes: [...state.cubes, {pos: [x, y, z], texture}] })),
    removeCubes: (x, y, z) => set(state => state.cubes.filter(cube => cube.x !== x || cube.y !== y || cube.z !== z)),
    textures: CUBE_TEXTURES.WOOD,
    setTexture: (texture) => set(_ => ({ texture })),
    saveWorld: () => set((state => { setLocalStorage("world", state.cubes); }))
}));
