"use client";
import HospitalEntryForm from "../Modals/HospitalEntryForm";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { FaHospital } from "react-icons/fa";
import { CSVLink } from "react-csv";
import { BiExport } from "react-icons/bi";
import { auth } from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import useFetchHospitals from "@/hook/useFetchHospitals";

type DashboardProps = {};

const Dashboard: React.FC<DashboardProps> = () => {
  const [user] = useAuthState(auth);
  const { hospitals } = useFetchHospitals("");

  return (
    <header>
      <div>
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left mr-3">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Welcome 🎉 {user?.displayName ? user.displayName : user?.email}
            </h1>
            <p className="mt-1.5 text-md text-gray-light">
              Add a hospital to the database
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
            <Popup
              trigger={
                <button className="bg-btn-blue inline-flex items-center justify-center gap-1.5 px-5 py-3 mt-2  rounded-lg hover:text-btn-blue hover:bg-white hover:border-2 hover:border-btn-blue border-2 border-transparent transition duration-300 ease-in-out">
                  <span className="text-sm font-medium">
                    Add Hospital <FaHospital className="text-center text-lg" />
                  </span>
                </button>
              }
              modal
              nested
              closeOnEscape={true}
              closeOnDocumentClick={true}
            >
              <HospitalEntryForm />
            </Popup>
            {/* Export Hospital and Share Hospital */}
            <button className="bg-gray-transparent-light px-2 py-2 sm:px-4 rounded-md text-sm font-medium border-transparent inline-flex items-center justify-center">
              <CSVLink data={hospitals} filename={"hospitals.csv"}>
                <BiExport size={30} className="sm:text-center text-white" />
                <span className="text-gray-light">Export</span>
              </CSVLink>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Dashboard;
