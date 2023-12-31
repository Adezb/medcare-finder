import { authModalAtom } from "@/atoms/authModalAtom";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";


function useCloseModal() {
    const setAuthModal = useSetRecoilState(authModalAtom);
  
    const closeModal = () => {
      setAuthModal((prev) => ({ ...prev, isOpen: false, type: "login" }));
    };
  
    useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeModal();
      };
      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
    }, [useCloseModal]);
  
    return closeModal;
  }

export default useCloseModal;
  