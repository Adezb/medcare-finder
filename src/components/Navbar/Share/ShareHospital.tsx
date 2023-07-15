import React from "react";
import { FaWhatsapp, FaFacebook, FaTwitter } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { BiShareAlt } from "react-icons/bi";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

type ShareHospitalProps = {};

const ShareHospital: React.FC<ShareHospitalProps> = () => {
  return (
    <div className="flex flex-row gap-3 bg-gray-transparent-light px-4 py-2 rounded-md ">
      <BiShareAlt size={30} className="text-gray-light" />
      <WhatsappShareButton
        url={`https://medcare-finder-app.vercel.app`}
        title="Medcare Finder App"
        className="bg-btn-blue px-1 py-2 sm:px-4 rounded text-sm font-medium hover:text-btn-blue hover:bg-white hover:border-2 hover:border-btn-blue border-2 border-transparent transition duration-300 ease-in-out"
      >
        <FaWhatsapp size={18} color="green" />
      </WhatsappShareButton>

      <FacebookShareButton
        url={`https://medcare-finder-app.vercel.app`}
        quote="Medcare Finder App"
        className="bg-btn-blue px-1 py-2 sm:px-4 rounded text-sm font-medium hover:text-btn-blue hover:bg-white hover:border-2 hover:border-btn-blue border-2 border-transparent transition duration-300 ease-in-out"
      >
        <FaFacebook size={18} color="blue" />
      </FacebookShareButton>

      <TwitterShareButton
        url={`https://medcare-finder-app.vercel.app`}
        title="Medcare Finder App"
        className="bg-btn-blue px-1 py-2 sm:px-4 rounded text-sm font-medium hover:text-btn-blue hover:bg-white hover:border-2 hover:border-btn-blue border-2 border-transparent transition duration-300 ease-in-out"
      >
        <FaTwitter size={18} color="skyblue" />
      </TwitterShareButton>

      <EmailShareButton
        url={`https://medcare-finder-app.vercel.app`}
        className="bg-btn-blue px-1 py-2 sm:px-4 rounded text-sm font-medium hover:text-btn-blue hover:bg-white hover:border-2 hover:border-btn-blue border-2 border-transparent transition duration-300 ease-in-out"
      >
        <AiOutlineMail size={18} className="text-gray-light" />
      </EmailShareButton>
    </div>
  );
};
export default ShareHospital;
