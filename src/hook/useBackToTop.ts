"use client";
import { useEffect, useState } from "react";


function useBackToTop() {
    const [isScrollVisible, setIsScrollVisible] = useState(false);


    useEffect(() => {
        globalThis.window.addEventListener("scroll", scrollToTop);
        return () =>  globalThis.window.removeEventListener("scroll", scrollToTop);
       });

   const scrollToTop = () => {
    if (!isScrollVisible && window.scrollY > 400) {
        setIsScrollVisible(true);
    } else if (isScrollVisible && window.scrollY <= 400) {
        setIsScrollVisible(false);
    }
   };


   const backToTop = () => {
    globalThis.window.scrollTo({ top: 0, behavior: "smooth" });
   };

   globalThis.window.addEventListener("scroll", scrollToTop) as any;

    return { isScrollVisible, backToTop };
    

}

export default useBackToTop;