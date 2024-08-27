import { useEffect, useState } from "react";

export function useLocalStorageState(initialState, key){
    const [value, setValue] = useState(()=>{
        const storedVal = localStorage.getItem(key);
        return storedVal ? JSON.parse(storedVal) : initialState;
    });

    useEffect(()=>{
        localStorage.setItem("value", JSON.stringify(value));
    },[value]);

    return [value, setValue];
}