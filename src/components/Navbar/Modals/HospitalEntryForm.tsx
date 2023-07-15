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

  const handleSelectInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(inputs);

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
      }, 3000);

      return;
    }
    // check if hospital already exists
    const hospitalDocRef = doc(db, "hospitals", inputs.name);
    const hospitalDocSnap = await getDoc(hospitalDocRef);
    if (hospitalDocSnap.exists()) {
      setMessages(`${inputs.name} already exists`);
      // clear the message after 5 seconds
      setTimeout(() => {
        setMessages("");
      }, 3000);
      return;
    }

    setLoading(true);

    // check if user is logged in before creating hospital
    if (!user) {
      alert("You must be logged in to register a hospital");
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
      setTimeout(() => {
        setMessages(
          `${inputs.name} created successfully. Click outside to close`
        );
      }, 3000);
      // clear the input fields
      setInputs({
        name: "",
        address: "",
        city: "",
        ownership: "",
        phone: "",
        email: "",
      });
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
          Register a Hospital
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
          <select
            required
            onChange={handleSelectInput}
            name="city"
            id="city"
            className="
                   border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5
                   bg-gray-600 border-gray-500 placeholder-gray-400 text-white
               "
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
        <div>
          {/* Hospital Ownership*/}
          <select
            required
            onChange={handleSelectInput}
            name="ownership"
            id="ownership"
            className="
                   border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5
                   bg-gray-600 border-gray-500 placeholder-gray-400 text-white
               "
          >
            <option value="">Select Ownership</option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
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
