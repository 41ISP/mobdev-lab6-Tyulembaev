import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface CatState{
    catsId: string[],
    addCat: (id:string) => void,
    removeCat : (id:string) => void
    isLikedCat: (id:string) => boolean,
}

export const useCatStore = create<CatState>()(
    persist(
        (set,get) => ({
        catsId: [],

        addCat: (id) => set((state) => ({catsId: [...state.catsId, id]})),
        removeCat: (id) => set((state) => ({catsId: state.catsId.filter(item => item !== id)})),
        isLikedCat : (id) => {
            const {catsId} = get()
            console.log(id)
            console.log(catsId.includes(id))
            return catsId.includes(id);
        }
    }),
    {name:'catStore', version:1, storage:createJSONStorage(()=> AsyncStorage)},
));