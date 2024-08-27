import { useEffect, useState } from "react";

export function useLocalStorageState(){
    const [watched, setWatched] = useState(()=>{
        const storedVal = localStorage.getItem("watched");
        return JSON.parse(storedVal);
    });

    useEffect(()=>{
        localStorage.setItem("watched", JSON.stringify(watched));
    },[watched]);

    return {watched, setWatched};
}