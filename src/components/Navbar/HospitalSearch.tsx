"use client";
import { useState, ChangeEvent } from "react";
import HospitalEntryForm from "./Modals/HospitalEntryForm";
// import SearchInput from "./SearchInput/SearchInput";
import {
  BiShareAlt,
  BiExport,
  BiChevronLeft,
  BiChevronRight,
} from "react-icons/bi";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import useFetchHospitals from "@/hook/useFetchHospitals";

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
      <div className="p-10 text-center mt-10 ">
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
            className="border-2 border-gray-300 rounded-md p-2"
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
            {hospitals.length > 0 ? (
              hospitals.map((hospital) => (
                <div
                  key={hospital.id}
                  className="border-2 border-gray-300 rounded-md mt-2 p-1 sm:p-3 bg-gray-dark max-w-full sm:max-w-sm"
                >
                  <div className="flex flex-row items-end justify-start">
                    <div className="flex flex-col items-start">
                      <p className="font-bold text-btn-blue text-xl sm:text-sm p-1 ">
                        {hospital.name}
                      </p>
                      <p className="text-gray-light text-sm ">
                        {hospital.address}
                      </p>
                      <p className="text-gray-light text-sm">{hospital.city}</p>
                      <p className="text-gray-light text-sm">
                        {hospital.ownership}
                      </p>
                      <p className="text-gray-light text-sm">
                        {hospital.phone}
                      </p>
                      <p className="text-gray-light text-sm">
                        {hospital.email}
                      </p>
                    </div>
                    <div className="flex flex-row ml-2">
                      <button className="bg-btn-blue px-1 py-2 mr-2 sm:px-4 rounded text-sm font-medium hover:text-btn-blue hover:bg-white hover:border-2 hover:border-btn-blue border-2 border-transparent transition duration-300 ease-in-out">
                        <BiShareAlt />
                      </button>
                      <button className="bg-btn-blue p-2 sm:px-4 rounded text-sm font-medium hover:text-btn-blue hover:bg-white hover:border-2 hover:border-btn-blue border-2 border-transparent transition duration-300 ease-in-out">
                        <BiExport />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Span message with border, background and text color
              <span></span>
            )}
            {/* Display Previous and Next button after showing list of hospitals */}
            {hospitals.length > 0 && (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default HospitalSearch;
