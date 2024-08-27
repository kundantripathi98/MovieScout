import { useEffect, useState } from "react";

export function useKey(callback, dependencyVal, condition = true){
    useEffect(()=>{
        if(condition){
            document.addEventListener("keydown", callback);
        }

        return ()=>{
            document.removeEventListener("keydown", callback);
        }
      }, [dependencyVal]);
}