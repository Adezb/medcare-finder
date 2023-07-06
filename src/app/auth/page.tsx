"use client";
import Navbar from "@/components/Navbar/Navbar";
import AuthModal from "@/components/Navbar/Modals/AuthModal";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { authModalAtom } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import HeroBanner from "@/components/Navbar/HeroBanner/HeroBanner";

const Page = () => {
  const authModal = useRecoilValue(authModalAtom);
  const [user, loading, error] = useAuthState(auth);
  const [pageLoading, setPageLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
    if (!loading && !user) setPageLoading(false);
  }, [user, router, loading]);

  if (pageLoading) return null;
  return (
    <div className="bg-gradient-to-b from-slate-200 to-slate-300 h-screen relative">
      <div className="max-w-7x1 mx-auto">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-5rem)] select-none mt-10 sm:mt-5 xs:mt-5 ">
          <HeroBanner />
        </div>
        {authModal.isOpen && <AuthModal />}
      </div>
    </div>
  );
};
export default Page;
