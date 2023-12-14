import { useState,useEffect } from "react";

export function useScrollY(){
    const [scrollY,setScroll] = useState(0);

    const handleScrollY = () =>{
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        setScroll(scrollY);
    }
    
    useEffect(() => {
        handleScrollY();
        window.addEventListener('scroll', handleScrollY);
        return () => {
            window.removeEventListener('scroll', handleScrollY);
        }
    },[]);
    return ([scrollY])
}