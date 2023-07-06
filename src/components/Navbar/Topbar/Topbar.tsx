"use client";
import { auth } from "@/firebase/firebase";
import { useSetRecoilState } from "recoil";
import { authModalAtom } from "@/atoms/authModalAtom";
import Logout from "../Buttons/Logout";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";

type TopbarProps = {};

const Topbar: React.FC<TopbarProps> = () => {
  const [user] = useAuthState(auth);
  const setAuthModal = useSetRecoilState(authModalAtom);

  return (
    <nav className="fixed top-0 flex h-[70px] w-full shrink-5 items-center bg-gray-dark text-bg-light sm:px-12 px-2 md:px-24 ">
      <div
        className={`flex w-full items-center justify-between max-w-[1200px] mx-auto`}
      >
        <Link href="/" className="h-[22px] flex-1 font-bold">
          <span className="text-btn-blue text-lg mr-1">MedCare</span> Finder
        </Link>

        <div className="flex items-center space-x-4 flex-1 justify-end">
          {!user && (
            <Link
              href="/auth"
              onClick={() =>
                setAuthModal((prev) => ({
                  ...prev,
                  isOpen: true,
                  type: "login",
                }))
              }
            >
              <button className="bg-btn-blue py-1 px-2 cursor-pointer rounded text-sm hover:bg-gray-light hover:text-btn-blue">
                Sign In
              </button>
            </Link>
          )}
          {/* If user is signed in show addhospital modal with Add Hospital button, currentUser photoURL and Logout button */}
          {user && (
            <>
              <div className="cursor-pointer group relative">
                <img
                  src={auth.currentUser?.photoURL || "avatar.png"}
                  alt="profile-image"
                  style={{ width: 30, height: 30 }}
                  className="rounded-full"
                />
                <div className="absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-gray-transparent-dark text-white p-2 rounded shadow-lg z-40 group-hover:scale-100 scale-0 transition-all duration-300 ease-in-out">
                  <p className="text-sm">
                    {user.displayName ? user.displayName : user.email}
                  </p>
                </div>
              </div>
            </>
          )}
          {user && <Logout />}
        </div>
      </div>
    </nav>
  );
};
export default Topbar;
