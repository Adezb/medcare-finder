"use client";
import { useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { setTimeout } from "timers";
import { useRouter } from "next/navigation";

type HospitalEntryFormProps = {};

const HospitalEntryForm: React.FC<HospitalEntryFormProps> = ({}) => {
  const [inputs, setInputs] = useState({
    name: "",
    address: "",
    city: "",
    ownership: "",
    phone: "",
    email: "",
  });

  const handleChangInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [user] = useAuthState(auth);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState("");

  const handleAddHospital = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // validate the hospital name
    const format = /[!@#$%^*()_+\=\[\]{};':"\\|,.<>\/?]+/;
    if (format.test(inputs.name)) {
      setMessages("Hospital name cannot contain special characters");
      // clear the message after 3 seconds
      setTimeout(() => {
        setMessages("");
      }, 5000);

      return;
    }
    // check if hospital already exists
    const hospitalDocRef = doc(db, "hospitals", inputs.name);
    const hospitalDocSnap = await getDoc(hospitalDocRef);
    if (hospitalDocSnap.exists()) {
      alert(`${inputs.name} already exists`);
      return;
    }

    setLoading(true);

    // check if user is logged in before creating hospital
    if (!user) {
      alert("You must be logged in to create a hospital");
      setLoading(false);
      router.push("/auth");
      return;
    }
    // if user is logged in, create the hospital document
    try {
      await setDoc(hospitalDocRef, {
        name: inputs.name,
        address: inputs.address,
        city: inputs.city,
        ownership: inputs.ownership,
        phone: inputs.phone,
        email: inputs.email,
        createdBy: user.uid,
        createdAt: new Date(),
      });
      //set success message and clear message after 3 seconds
      setMessages(`${inputs.name} created successfully. Press ESC to close`);
      // clear the input fields
      setInputs({
        name: "",
        address: "",
        city: "",
        ownership: "",
        phone: "",
        email: "",
      });
      setTimeout(() => {
        setMessages("");
      }, 5000);
    } catch (error: any) {
      setMessages(error.message);
    }
    setLoading(false);
  };

  // const closeModal = useCloseModal();

  // if (!isVisible) return null;

  return (
    <>
      <form className="space-y-5 px-1 pb-5 " onSubmit={handleAddHospital}>
        <h3 className="text-xl font-medium text-gray-dark">
          New Hospital Entry
        </h3>
        <div>
          {/* Hospital Name */}
          <input
            required
            onChange={handleChangInput}
            type="name"
            name="name"
            id="name"
            className="
                   border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5
                   bg-gray-600 border-gray-500 placeholder-gray-400 text-white
               "
            placeholder=" Hospital Name"
          />
          {/* set message and clear messages*/}
        </div>

        <div>
          {/* Hospital Address */}
          <input
            required
            onChange={handleChangInput}
            type="text"
            name="address"
            id="address"
            className="
                   border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5
                   bg-gray-600 border-gray-500 placeholder-gray-400 text-white
               "
            placeholder="Address"
          />
        </div>

        <div>
          {/* Hospital City */}
          <input
            required
            onChange={handleChangInput}
            type="text"
            name="city"
            id="city"
            className="
                   border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5
                   bg-gray-600 border-gray-500 placeholder-gray-400 text-white
               "
            placeholder="City"
          />
        </div>
        <div>
          {/* Hospital Ownership*/}
          <input
            required
            onChange={handleChangInput}
            type="text"
            name="ownership"
            id="ownership"
            className="
                   border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5
                   bg-gray-600 border-gray-500 placeholder-gray-400 text-white
               "
            placeholder="Ownership e.g Private, Public"
          />
        </div>
        <div>
          {/* Hospital Phone*/}
          <input
            required
            onChange={handleChangInput}
            type="text"
            name="phone"
            id="phone"
            className="
                   border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5
                   bg-gray-600 border-gray-500 placeholder-gray-400 text-white
               "
            placeholder="Phone number"
          />
        </div>
        <div>
          {/* Hospital email*/}
          <input
            required
            onChange={handleChangInput}
            type="text"
            name="email"
            id="email"
            className="
                   border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5
                   bg-gray-600 border-gray-500 placeholder-gray-400 text-white
               "
            placeholder="Email"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full text-white focus:ring-blue-300 font-medium rounded-lg
                       text-sm px-5 py-2.5 text-center bg-btn-blue hover:bg-btn-blue-hover"
        >
          {/* Show loading state or button name and set success message or error message if there is error */}
          {loading ? "Loading..." : "Add Hospital"}
        </button>
        {messages && (
          <div className="text-center text-blue-700 bg-gray-300 p-2 rounded-lg">
            {messages}
          </div>
        )}
      </form>
    </>
  );
};
export default HospitalEntryForm;
