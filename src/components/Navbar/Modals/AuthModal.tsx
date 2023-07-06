"use client";
import { IoIosClose } from "react-icons/io";
import Login from "./Login";
import Signup from "./Signup";
import ResetPassword from "./ResetPassword";
import { useRecoilValue } from "recoil";
import { authModalAtom } from "@/atoms/authModalAtom";
import useCloseModal from "@/hook/useCloseModal";

type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
  const authModal = useRecoilValue(authModalAtom);
  const closeModal = useCloseModal();
  return (
    <>
      <div
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-slate-100 bg-opacity-60"
        onClick={closeModal}
      ></div>
      <div className="w-full sm:w-[450px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  flex justify-center items-center">
        <div className="relative w-full h-full mx-auto flex items-center justify-center">
          <div className="bg-white rounded-lg shadow relative w-full bg-gradient-to-b from-sky-blue to-slate-300 mx-6">
            <div className="flex justify-end p-2">
              <button
                type="button"
                className="bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white text-white"
                onClick={closeModal}
              >
                <IoIosClose className="h-5 w-5" />
              </button>
            </div>

            {authModal.type === "login" ? (
              <Login
                showPassword={false}
                togglePassword={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            ) : authModal.type === "register" ? (
              <Signup
                showPassword={false}
                togglePassword={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            ) : (
              <ResetPassword />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default AuthModal;
