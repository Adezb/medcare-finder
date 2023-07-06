"use client";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { useState, useEffect } from "react";
import { authModalAtom } from "@/atoms/authModalAtom";
import { useSetRecoilState } from "recoil";
import { auth } from "@/firebase/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

// import { useRouter } from "next/navigation";

type SignupProps = {
  showPassword: boolean;
  togglePassword: () => void;
};

const Signup: React.FC<SignupProps> = () => {
  const setAuthModal = useSetRecoilState(authModalAtom);

  // const router = useRouter();

  const handleClick = () => {
    setAuthModal((prev) => ({ ...prev, type: "login" }));
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [inputs, setInputs] = useState({ email: "", name: "", password: "" });
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleChangInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //validate input fields, pasword length and email format
    if (
      inputs.password.length < 6 ||
      !inputs.email.includes("@") ||
      !inputs.email.includes(".")
    ) {
      alert("Invalid email or password");
      return;
    } else if (inputs.name.length < 3) {
      alert("Name must be at least 3 characters");
      return;
    }
    try {
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser) return;
      // go to login modal
      setAuthModal((prev) => ({ ...prev, type: "login" }));
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (error) alert(error.message);
  }, [error]);

  return (
    <form className="space-y-6 px-6 pb-4" onSubmit={handleRegister}>
      <h3 className="text-xl font-medium text-white">Sign Up</h3>
      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium block mb-2 text-gray-dark"
        >
          Email
        </label>
        <input
          required
          onChange={handleChangInput}
          type="email"
          name="email"
          id="email"
          className="
                    border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    bg-gray-600 border-gray-500 placeholder-gray-400 text-white
                "
          placeholder=" name@example.com"
        />
      </div>
      {/* Display Name */}
      <div>
        <label
          htmlFor="name"
          className="text-sm font-medium block mb-2 text-gray-dark"
        >
          Name
        </label>
        <input
          required
          onChange={handleChangInput}
          type="text"
          name="name"
          id="name"
          className="
                    border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    bg-gray-600 border-gray-500 placeholder-gray-400 text-white
                "
          placeholder="John Doe"
        />
      </div>
      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="text-sm font-medium block mb-2 text-gray-dark"
        >
          Password
        </label>
        {/* Input for password with eye icon to show or hide password */}
        <div className="relative">
          {/* Validate password input with length */}
          <input
            onChange={handleChangInput}
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            className="
                    border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    bg-gray-600 border-gray-500 placeholder-gray-400 text-white
                "
            placeholder="********"
          />
          {/* Show password icon */}
          <button
            type="button"
            className="absolute right-2 top-2 bottom-2 text-gray-400 hover:text-gray-500"
            onClick={togglePassword}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full text-white focus:ring-blue-300 font-medium rounded-lg
        text-sm px-5 py-2.5 text-center bg-btn-blue hover:bg-btn-blue-hover"
      >
        {loading ? "Registering..." : "Create Account"}
      </button>
      {/* Already have an account */}
      <div className="text-sm font-medium text-gray-700">
        Already have an account?{" "}
        <a
          href="#"
          className="text-blue-700 hover:underline"
          onClick={handleClick}
        >
          Log In
        </a>
      </div>
    </form>
  );
};
export default Signup;
