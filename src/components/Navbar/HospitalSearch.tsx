"use client";
import { useState, ChangeEvent } from "react";
import HospitalEntryForm from "./Modals/HospitalEntryForm";
import About from "./About/About";
import {
  BiShareAlt,
  BiExport,
  BiChevronLeft,
  BiChevronRight,
} from "react-icons/bi";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import useFetchHospitals from "@/hook/useFetchHospitals";
import Image from "next/image";

type HospitalSearchProps = {};

const HospitalSearch: React.FC<HospitalSearchProps> = () => {
  const [city, setCity] = useState("");
  const {
    loading,
    message,
    hospitals,
    fetchMoreHospitals,
    fetchPreviousHospitals,
    handleSearchHospital,
  } = useFetchHospitals();

  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="p-10 text-center mt-10">
          <Popup
            trigger={
              <button className="bg-btn-blue p-2 mt-2 sm:px-4 rounded-md text-sm font-medium hover:text-btn-blue hover:bg-white hover:border-2 hover:border-btn-blue border-2 border-transparent transition duration-300 ease-in-out">
                Add New Hospital
              </button>
            }
            modal
            nested
            closeOnEscape={true}
            closeOnDocumentClick={true}
          >
            <HospitalEntryForm />
          </Popup>
          <div className="mt-5">
            <input
              type="text"
              placeholder="Search hospitals by City"
              className="border-2 border-gray-300 rounded-md p-2 focus:outline-none"
              value={city}
              onChange={handleCityChange}
            />
            <button
              className="bg-btn-blue p-2 sm:px-4 rounded text-sm font-medium hover:text-btn-blue hover:bg-white hover:border-2 hover:border-btn-blue border-2 border-transparent transition duration-300 ease-in-out"
              onClick={() => handleSearchHospital(city)}
            >
              Search
            </button>
          </div>
          {message ? (
            <p className="border-2 border-gray-300 rounded-md p-2 mt-2 bg-gray-transparent-dark text-gray-light">
              {message}
            </p>
          ) : null}
          <div className="mt-5 flex items-center justify-center">
            <div className="flex flex-col">
              {hospitals.length > 0 && city !== " "
                ? hospitals.map((hospital) => (
                    <div
                      key={hospital.id}
                      className=" flex flex-col rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 bg-gray-dark-one m-1"
                    >
                      <div className="sm:flex sm:justify-between sm:gap-4">
                        <div>
                          <h3 className="text-lg font-bold sm:text-xl text-btn-blue">
                            {hospital.name}
                          </h3>
                          <p className="mt-1 text-xs font-medium text-white">
                            {hospital.ownership}
                          </p>
                        </div>
                        <div className="hidden sm:block sm:shrink-0">
                          <Image
                            src="/red-cross.png"
                            alt="Red Cross"
                            width={200}
                            height={200}
                            className="h-16 w-16 rounded-lg object-cover shadow-sm"
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="max-w-[40ch] text-sm text-white">
                          {hospital.address}
                        </p>
                        <p className="max-w-[40ch] text-sm text-white">
                          {hospital.city}
                        </p>
                        <p className="max-w-[40ch] text-sm text-white">
                          {hospital.email}
                        </p>
                        <p className="max-w-[40ch] text-sm text-white">
                          {hospital.phone}
                        </p>
                      </div>

                      <div className="mt-6 flex gap-4 sm:gap-6">
                        <div className="flex flex-col-reverse">
                          <button className="bg-btn-blue px-1 py-2 sm:px-4 rounded text-sm font-medium hover:text-btn-blue hover:bg-white hover:border-2 hover:border-btn-blue border-2 border-transparent transition duration-300 ease-in-out">
                            <BiShareAlt />
                          </button>
                        </div>

                        <div className="flex flex-col-reverse">
                          <button className="bg-btn-blue px-1 py-2 sm:px-4 rounded text-sm font-medium hover:text-btn-blue hover:bg-white hover:border-2 hover:border-btn-blue border-2 border-transparent transition duration-300 ease-in-out">
                            <BiExport />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                : // Span message with border, background and text color
                  " "}
              {/* Display Previous and Next button after showing list of hospitals */}
              {/* {hospitals.length > 0 && (
                <div className="mt-5 flex items-center justify-center">
                  <button
                    className="bg-btn-blue p-2 mr-5 sm:px-4 rounded text-sm font-medium hover:text-btn-blue hover:bg-white hover:border-2 hover:border-btn-blue border-2 border-transparent transition duration-300 ease-in-out"
                    onClick={() => fetchPreviousHospitals}
                  >
                    <BiChevronLeft />
                  </button>
                  <button
                    className="bg-btn-blue p-2 sm:px-4 rounded text-sm font-medium hover:text-btn-blue hover:bg-white hover:border-2 hover:border-btn-blue border-2 border-transparent transition duration-300 ease-in-out"
                    onClick={() => fetchMoreHospitals}
                  >
                    <BiChevronRight />
                  </button>
                </div>
              )} */}
            </div>
          </div>
          <div className="mt-2">
            <About />
          </div>
        </div>
      </div>
    </>
  );
};
export default HospitalSearch;
