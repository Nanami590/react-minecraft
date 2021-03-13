import create from "zustand";

import { CUBE_TYPES } from "../enums";


const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));
const setLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value)); 


const initialState = [
    {pos: [0, 0, 0], type: CUBE_TYPES.WOOD},
    {pos: [0, 0, 0], type: CUBE_TYPES.DIRT},
    {pos: [0, 0, 0], type: CUBE_TYPES.GLASS},
    {pos: [0, 0, 0], type: CUBE_TYPES.GRASS},
    {pos: [0, 0, 0], type: CUBE_TYPES.LOG},
];

export const useStore = create((set) => ({
    cubes: getLocalStorage("world") || initialState,
    addCubes: (x ,y ,z, type) => set(state => ({ cubes: [...state.cubes, {pos: [x, y, z], type}] })),
    removeCubes: (x, y, z) => set(state => state.cubes.filter(cube => cube.x !== x || cube.y !== y || cube.z !== z)),
    textures: CUBE_TYPES.WOOD,
    setTexture: (texture) => set(_ => ({ texture })),
    saveWorld: () => set((state => { setLocalStorage("world", state.cubes); }))
}));
