"use client";
import Link from "next/link";
import { authModalAtom } from "@/atoms/authModalAtom";
import { useSetRecoilState } from "recoil";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const setAuthModal = useSetRecoilState(authModalAtom);

  const handleClick = () => {
    setAuthModal((prev) => ({ ...prev, isOpen: true }));
  };

  return (
    <nav className=" fixed top-0 flex items-center justify-between sm:px-12 px-2 md:px-24 bg-gray-dark w-full h-[70px] shrink-5 ">
      <Link
        href="/"
        className=" font-bold flex items-center justify-center h-20 text-white"
      >
        <span className="text-btn-blue text-lg mr-1">MedCare</span> Finder
      </Link>
      <div className="flex items-center">
        <button
          className="bg-btn-blue py-1 px-2 sm:px-4 rounded-md text-sm font-medium hover:text-btn-blue hover:bg-white hover:border-2 hover:border-btn-blue border-2 border-transparent transition duration-300 ease-in-out "
          onClick={handleClick}
        >
          Sign In
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
