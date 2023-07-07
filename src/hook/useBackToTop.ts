
import { useEffect, useState } from "react";


function useBackToTop() {
    const [isScrollVisible, setIsScrollVisible] = useState(false);

   const scrollToTop = () => {
    if (!isScrollVisible && window.scrollY > 400) {
        setIsScrollVisible(true);
    } else if (isScrollVisible && window.scrollY <= 400) {
        setIsScrollVisible(false);
    }
   };

   useEffect(() => {
    globalThis.window.addEventListener("scroll", scrollToTop);
    return () =>  globalThis.window.removeEventListener("scroll", scrollToTop);
   });

   const backToTop = () => {
    globalThis.window.scrollTo({ top: 0, behavior: "smooth" });
   };

   globalThis.window.addEventListener("scroll", scrollToTop);

    return { isScrollVisible, backToTop };
    

}

export default useBackToTop;