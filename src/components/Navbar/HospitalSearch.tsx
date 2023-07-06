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
import { auth } from "@/firebase/firebase";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useAuthState } from "react-firebase-hooks/auth";
import useFetchHospitals from "@/hook/useFetchHospitals";

type HospitalSearchProps = {};

// type Hospital = {
//   id: string;
//   name: string;
//   address: string;
//   city: string;
//   ownership: string;
//   phone: string;
//   email: string;
//   createdAt: Date;
// };

const HospitalSearch: React.FC<HospitalSearchProps> = () => {
  const [city, setCity] = useState("");
  // const [hospitals, setHospitals] = useState<Array<Hospital>>([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  // const [messages, setMessages] = useState("");
  const {
    loading,
    message,
    hospitals,
    fetchMoreHospitals,
    fetchPreviousHospitals,
    handleSearchHospital,
  } = useFetchHospitals();

  const [user] = useAuthState(auth);

  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  // const handleSearch = async () => {
  //   //check if user has entered a city
  //   if (city.trim() === "") {
  //     setMessages("Please enter a city");
  //     setTimeout(() => {
  //       setMessages("");
  //     }, 3000);
  //     return;
  //   }
  //   setLoading(true);
  //   // query the database for hospitals in the city
  //   try {
  //     const hospitalsQuery = query(
  //       collection(db, "hospitals"),
  //       where("city", "==", city),
  //       orderBy("name", "asc"),
  //       limit(perPage)
  //     );
  //     const hospitalQuerySnapshot = await getDocs(hospitalsQuery);
  //     //if there is a hospital in the city, display the hospital
  //     const hospitalsData = hospitalQuerySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setHospitals((prev) => [...prev, ...hospitalsData] as Array<Hospital>);
  //     setLoading(false);
  //     //if there is no hospital in the city, display a message
  //     if (hospitalsQuery === null) {
  //       setMessages("No hospital in the city");
  //       setTimeout(() => {
  //         setMessages("");
  //       }, 3000);
  //       return;
  //     }

  //   } catch (error: any) {
  //     console.log(error.message);
  //   }
  //   setLoading(false);
  //   //reset the city input field
  //   setCity("");
  //   setMessages("Please enter a city");

  // };

  // const handleLoadMore = async () => {
  //   const lastDoc = hospitals[hospitals.length - 1];
  //   console.log("lastDoc", lastDoc);
  //   setLoading(true);
  //   const hospitalsQuery = query(
  //     collection(db, "hospitals"),
  //     where("city", "==", city),
  //     orderBy("name"),
  //     startAfter(lastDoc),
  //     limit(perPage)
  //   );
  //   const hospitalQuerySnapshot = await getDocs(hospitalsQuery);
  //   const hospitalsData = hospitalQuerySnapshot.docs.map((doc) => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   }));

  //   setHospitals((prev) => [...prev, ...hospitalsData] as Array<Hospital>);
  //   setLoading(false);
  // };

  return (
    <>
      <div className="p-10 text-center mt-10 ">
        <Popup
          trigger={
            <button className="bg-btn-blue py-1 px-2 sm:px-4 rounded-md text-sm font-medium hover:text-btn-blue hover:bg-white hover:border-2 hover:border-btn-blue border-2 border-transparent transition duration-300 ease-in-out">
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
            {/* Display hospitals list with prev and next button. Let it be nested in flexbox and grid system. Make it mobile responsive */}
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

// {/* Prev and Next button div */}
// <div className="mt-5 flex items-center justify-center">
// <button
//   className="bg-btn-blue p-2 mr-5 sm:px-4 rounded text-sm font-medium hover:text-btn-blue hover:bg-white hover:border-2 hover:border-btn-blue border-2 border-transparent transition duration-300 ease-in-out"
//   onClick={prevPage}
// >
//   <BiChevronLeft />
// </button>
// <button
//   className="bg-btn-blue p-2 sm:px-4 rounded text-sm font-medium hover:text-btn-blue hover:bg-white hover:border-2 hover:border-btn-blue border-2 border-transparent transition duration-300 ease-in-out"
//   onClick={nextPage}
// >
//   <BiChevronRight />
// </button>
// </div>

// try {
//   const hospitalsQuery = query(
//     collection(db, "hospitals"),
//     where("city", "==", city)
//   );
//   const hospitalQuerySnapshot = await getDocs(hospitalsQuery);
//   const hospitalsData = hospitalQuerySnapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));
//   setHospitals((prev) => [...prev, ...hospitalsData] as Array<Hospital>);
//   console.log(hospitalsData);
//   setLoading(false);
// } catch (error: any) {
//   setError(error.message);
//   setLoading(false);
// }

// {hospitals.length > 0 ? (
//   hospitals.map((hospital) => (
//     // display hospital list with full details like name, address, city, ownership, phone, email, createdBy, createdAt with share button and export button. let it be in a card format nested in a flexbox and grid sytem. make it mobile responsive.
//     <div
//       key={hospital.id}
//       className="border-2 border-gray-300 rounded-md p-2 mt-2 bg-gray-dark max-w-fit-content"
//     >
//       <div className="flex items-center justify-center">
//         <div>
//           <p className="font-bold text-btn-blue text-xl sm:text-sm">
//             {hospital.name}
//           </p>
//           <p className="text-gray-light text-sm p-1 flex-shrink-0">
//             {hospital.address}
//           </p>
//           <p className="text-gray-light text-sm">{hospital.city}</p>
//           <p className="text-gray-light text-sm">
//             {hospital.ownership}
//           </p>
//           <p className="text-gray-light text-sm">
//             {hospital.phone}
//           </p>
//           <p className="text-gray-light text-sm">
//             {hospital.email}
//           </p>
//         </div>
//         <div className="flex flex-row">
//           <button className="bg-btn-blue px-1 py-2 mr-2 sm:px-4 rounded text-sm font-medium hover:text-btn-blue hover:bg-white hover:border-2 hover:border-btn-blue border-2 border-transparent transition duration-300 ease-in-out">
//             <BiShareAlt />
//           </button>
//           <button className="bg-btn-blue p-2 sm:px-4 rounded text-sm font-medium hover:text-btn-blue hover:bg-white hover:border-2 hover:border-btn-blue border-2 border-transparent transition duration-300 ease-in-out">
//             <BiExport />
//           </button>
//         </div>
//       </div>
//     </div>
//   ))
// ) : (
//   <p className="text-center text-xl">
//     No Hospitals Found In This Area
//   </p>
// )}

// {hospitals.slice(1, 5).map((hospital) => (
//   <div
//     key={hospital.id}
//     className="border-2 border-gray-300 rounded-md p-2 mt-2 bg-gray-dark max-w-fit-content"
//   >
//     <h3 className="font-bold text-btn-blue text-xl sm:text-sm">
//       {hospital.name}
//     </h3>
//     <p className="text-gray-light text-sm p-1 flex-shrink-0">
//       {hospital.address}
//     </p>
//     <p className="text-gray-light text-sm">{hospital.city}</p>
//     <p className="text-gray-light text-sm">{hospital.ownership}</p>
//     <p className="text-gray-light text-sm">{hospital.phone}</p>
//     <p className="text-gray-light text-sm">{hospital.email}</p>
//     <div className="flex flex-row">
//       <button className="bg-btn-blue px-1 py-2 mr-2 sm:px-4 rounded text-sm font-medium hover:text-btn-blue hover:bg-white hover:border-2 hover:border-btn-blue border-2 border-transparent transition duration-300 ease-in-out">
//         <BiShareAlt />
//       </button>
//       <button className="bg-btn-blue p-2 sm:px-4 rounded text-sm font-medium hover:text-btn-blue hover:bg-white hover:border-2 hover:border-btn-blue border-2 border-transparent transition duration-300 ease-in-out">
//         <BiExport />
//       </button>
//     </div>
//   </div>
// ))}
// <div className="flex items-center justify-center mt-5">
//   <button
//

//     onClick={() => {}}
//     disabled={false}
//   >
//     Prev
//   </button>
//   <button
//     className="bg-btn-blue p-2 sm:px-4 rounded text-sm font-medium hover:text-btn-blue hover:bg-white hover:border-2 hover:border-btn-blue border-2 border-transparent transition duration-300 ease-in-out"
//     onClick={() => {}}
//     disabled={false}
//   >
//     Next
//   </button>
// </div>
