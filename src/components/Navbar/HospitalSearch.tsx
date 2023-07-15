"use client";
import { useState, ChangeEvent } from "react";
import About from "./About/About";
import Dashboard from "./Dashboard/Dashboard";
import ShareHospital from "./Share/ShareHospital";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import useFetchHospitals from "@/hook/useFetchHospitals";
import Image from "next/image";
import { auth } from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

type HospitalSearchProps = {};

const HospitalSearch: React.FC<HospitalSearchProps> = () => {
  const [city, setCity] = useState("");
  const [user] = useAuthState(auth);
  const {
    loading,
    message,
    hospitals,
    fetchMoreHospitals,
    fetchPreviousHospitals,
    handleSearchHospital,
  } = useFetchHospitals(city);

  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCity(e.target.value);
    handleSearchHospital();
  };

  const handleSelectInput = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setCity(e.target.value);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="p-10 text-center mt-10">
          {/* Input tag for hospital search and select tag for city option div */}
          <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center mt-5">
            <input
              type="text"
              placeholder="Find Hospitals by City"
              className="border-2 border-gray-300 rounded-md p-2 sm:mr-2 focus:outline-none"
              value={city}
              onChange={handleCityChange}
            />
            <select
              onChange={handleSelectInput}
              name="city"
              id="city"
              className="border-2 border-gray-300 rounded-md p-2 mt-2 sm:mt-0 bg-gray-transparent-dark text-gray-light focus:outline-none"
            >
              {/* Cities in Nigeria */}
              <option value="">Select City</option>
              <option value="Abuja">Abuja</option>
              <option value="Abia">Abia</option>
              <option value="Adamawa">Adamawa</option>
              <option value="Akwa Ibom">Akwa Ibom</option>
              <option value="Anambra">Anambra</option>
              <option value="Bauchi">Bauchi</option>
              <option value="Bayelsa">Bayelsa</option>
              <option value="Benue">Benue</option>
              <option value="Borno">Borno</option>
              <option value="Cross River">Cross River</option>
              <option value="Delta">Delta</option>
              <option value="Ebonyi">Ebonyi</option>
              <option value="Edo">Edo</option>
              <option value="Ekiti">Ekiti</option>
              <option value="Enugu">Enugu</option>
              <option value="Gombe">Gombe</option>
              <option value="Imo">Imo</option>
              <option value="Jigawa">Jigawa</option>
              <option value="Kaduna">Kaduna</option>
              <option value="Kano">Kano</option>
              <option value="Katsina">Katsina</option>
              <option value="Kebbi">Kebbi</option>
              <option value="Kogi">Kogi</option>
              <option value="Kwara">Kwara</option>
              <option value="Lagos">Lagos</option>
              <option value="Nasarawa">Nasarawa</option>
              <option value="Niger">Niger</option>
              <option value="Ogun">Ogun</option>
              <option value="Ondo">Ondo</option>
              <option value="Osun">Osun</option>
              <option value="Oyo">Oyo</option>
              <option value="Plateau">Plateau</option>
              <option value="Rivers">Rivers</option>
              <option value="Sokoto">Sokoto</option>
              <option value="Taraba">Taraba</option>
              <option value="Yobe">Yobe</option>
              <option value="Zamfara">Zamfara</option>
            </select>
          </div>

          {message ? (
            <p className="border-2 border-gray-300 rounded-md p-2 mt-2 bg-gray-transparent-light text-gray-light">
              {message}
            </p>
          ) : null}
          <div className="mt-5 flex items-center justify-center">
            <div className="flex flex-col">
              {/* User Dashboard with share button, export hospitals button and add hospital button */}
              <>
                {user ? (
                  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 bg-gray-transparent-dark rounded-md">
                    <Dashboard />
                  </div>
                ) : (
                  <p className="text-gray-dark-one text-lg sm:text-sm">
                    Login to share, export and add new hospitals
                  </p>
                )}
              </>

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
                      {/* if user display share hospital component else nothing */}
                      {user ? (
                        <>
                          <ShareHospital />
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  ))
                : // Span message with border, background and text color
                  " "}
              {/* Fetch more hospital on scroll down */}
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
