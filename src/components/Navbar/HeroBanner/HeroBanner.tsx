"use client";
import { authModalAtom } from "@/atoms/authModalAtom";
import { useSetRecoilState } from "recoil";
import Image from "next/image";

type HeroBannerProps = {};

const HeroBanner: React.FC<HeroBannerProps> = () => {
  const setAuthModal = useSetRecoilState(authModalAtom);

  const handleClick = () => {
    setAuthModal((prev) => ({ ...prev, isOpen: true, type: "register" }));
  };
  //return a mobile responsive hero banner image with a caption: "Find The Best Hospitals In Your City"
  return (
    <>
      <div className="flex flex-col-reverse md:flex-row items-center justify-center bg-blue-500 py-10 px-6 md:py-20 md:px-16 text-white mb-10">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Find the Best Hospitals Near You
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Discover top-rated hospitals and medical centers in your area. Sign
            up now to access comprehensive healthcare information.
          </p>
          <div className="flex justify-center md:justify-start">
            <button
              onClick={handleClick}
              className="bg-white text-blue-500 hover:bg-blue-100 rounded-full px-8 py-3 text-lg md:text-xl font-bold shadow-lg"
            >
              Sign Up
            </button>
          </div>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 hidden md:block">
          <Image
            src="/doctor-2.jpeg"
            alt="Medical Doctor"
            width={500}
            height={500}
            loading="lazy"
            className="w-full h-auto"
          />
          {/* <img
            src="doctor-2.jpeg"
            alt="Medical Doctor"
            loading="lazy"
            className="w-full h-auto"
          /> */}
        </div>
      </div>
    </>
  );
};
export default HeroBanner;

{
  /* <div className="relative">
      <img
        src="/doctor-2.jpeg"
        alt="banner"
        style={{
          width: "100vw",
          height: "50vh",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-4xl font-bold text-gray-dark">
          Find The Best Hospitals In Your City
        </h1>
      </div>
    </div> */
}
