"use client";
import { authModalAtom } from "@/atoms/authModalAtom";
import { useSetRecoilState } from "recoil";
import Image from "next/image";
import Link from "next/link";

type HeroBannerProps = {};

const HeroBanner: React.FC<HeroBannerProps> = () => {
  const setAuthModal = useSetRecoilState(authModalAtom);

  const handleClick = () => {
    setAuthModal((prev) => ({ ...prev, isOpen: true, type: "register" }));
  };
  return (
    <>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 bg-blue-500 text-white px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
          <Image
            src="/doctor-2.jpeg"
            alt="Medical Doctor"
            width={500}
            height={500}
            className="h-full w-full object-cover"
            priority={true}
          />
        </div>
        <div className="lg:py-24">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Find the Best Hospitals Near You
          </h2>
          <h3 className="mt-4 ">
            Discover top-rated hospitals and medical centers in your area.
          </h3>
          <p className="mt-1 bg-gray-dark px-2 py-3 rounded-md">
            Do you own a hospital or you know a hospital that needs to be
            listed? <br />
            <span>
              Sign-up to gain access to add your hospital to our database.
            </span>
          </p>

          <button
            onClick={handleClick}
            className="mt-4 inline-block rounded px-12 py-3 bg-white text-blue-500 hover:bg-blue-100 md:text-xl font-bold shadow-lg text-sm  "
          >
            Sign Up
          </button>
          <p className="mt-2">
            Looking for a hospital?{" "}
            <Link href="/">
              <button className="text-blue-100 hover:text-white">
                Search Now
              </button>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
export default HeroBanner;
