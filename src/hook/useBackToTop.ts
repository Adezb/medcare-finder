
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
    typeof window.addEventListener("scroll", scrollToTop);
    return () =>  window.removeEventListener("scroll", scrollToTop);
   });

   const backToTop = () => {
   typeof window.scrollTo({ top: 0, behavior: "smooth" });
   };

  typeof window.addEventListener("scroll", scrollToTop);

    return { isScrollVisible, backToTop };
    

}

export default useBackToTop;