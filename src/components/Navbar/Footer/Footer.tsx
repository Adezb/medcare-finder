"use client";
import Link from "next/link";
import { BsArrowUpCircle } from "react-icons/bs";
import useBackToTop from "@/hook/useBackToTop";

const Footer = () => {
  return (
    <footer className="bg-gray-dark mt-auto">
      <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
        {/* <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
          <button className="inline-block rounded-full bg-white p-2 text-btn-blue shadow transition hover:bg-gray-light sm:p-3 lg:p-4">
            <span className="sr-only">Back to top</span>
            <BsArrowUpCircle className="h-6 w-6" aria-hidden="true" />
          </button>
        </div> */}
        <div className="lg:flex lg:items-end lg:justify-between">
          <div>
            <div className="flex justify-center lg:justify-start">
              <Link href="/" className="h-[22px] flex-1 font-bold text-white">
                <span className="text-btn-blue text-lg mr-1">MedCare</span>{" "}
                Finder
              </Link>
            </div>
            <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-light lg:text-left">
              MedCare Finder is a web application that helps you find the
              nearest hospital in your area. It also provides you with the
              information about the hospital such as the contact number, the
              address, the email , and the city located.
            </p>
          </div>
          <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12">
            <li>
              <Link
                href="/"
                className="text-white transition hover:text-gray-light"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-white transition hover:text-gray-light"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-white transition hover:text-gray-light"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <p className="mt-12 text-center text-sm text-gray-light lg:text-right">
          Copyright &copy; {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
