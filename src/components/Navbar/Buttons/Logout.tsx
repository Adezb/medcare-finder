import React from "react";
import { auth } from "@/firebase/firebase";
import { useSignOut } from "react-firebase-hooks/auth";
import { FiLogOut } from "react-icons/fi";

type LogoutProps = {};

const Logout: React.FC<LogoutProps> = () => {
  const [signOut, loading, error] = useSignOut(auth);

  const handleLogout = () => {
    signOut();
  };

  return (
    <button
      className="bg-gray-mid py-1.5 px-3 cursor-pointer rounded text-white hover:bg-gray-light hover:text-btn-blue "
      onClick={handleLogout}
    >
      <FiLogOut title="Log Out" />
    </button>
  );
};
export default Logout;
