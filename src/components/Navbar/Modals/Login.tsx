import { FiEyeOff, FiEye } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { useState, useEffect } from "react";
import { authModalAtom } from "@/atoms/authModalAtom";
import { useSetRecoilState } from "recoil";
import { auth } from "@/firebase/firebase";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  getAuth,
  signInWithPopup,
  TwitterAuthProvider,
} from "firebase/auth";

type LoginProps = {
  showPassword: boolean;
  togglePassword: () => void;
};

const Login: React.FC<LoginProps> = () => {
  const setAuthModal = useSetRecoilState(authModalAtom);

  const router = useRouter();

  const handleClick = (type: "login" | "register" | "forgotPassword") => {
    setAuthModal((prev) => ({ ...prev, type }));
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [inputs, setInputs] = useState({ email: "", password: "" });

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  //State for social media login
  const [socialMediaLogin, setSocialMediaLogin] = useState(false);

  const providerGoogle = new GoogleAuthProvider();

  const handleGoogleLogin = async () => {
    //set social media login state to disable input fields validation
    setSocialMediaLogin(true);
    try {
      const auth = getAuth();
      const result = await signInWithPopup(auth, providerGoogle);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      token && console.log(token);
      console.log(user);
      router.push("/");
    } catch (error: any) {
      alert(error.message);
    }
  };

  // const providerFacebook = new FacebookAuthProvider();
  // const handleFacebookLogin = async () => {
  //   try {
  //     const auth = getAuth();
  //     const result = await signInWithPopup(auth, providerFacebook);
  //     const credential = FacebookAuthProvider.credentialFromResult(result);
  //     const token = credential?.accessToken;
  //     const user = result.user;
  //     token && console.log(token);
  //     console.log(user);
  //     router.push("/");
  //   } catch (error: any) {
  //     alert(error.message);
  //   }
  // };

  const providerTwitter = new TwitterAuthProvider();
  const handleTwitterLogin = async () => {
    //set social media login state to disable input fields validation
    setSocialMediaLogin(true);
    try {
      const auth = getAuth();
      const result = await signInWithPopup(auth, providerTwitter);
      const credential = TwitterAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      token && console.log(token);
      console.log(user);
      router.push("/");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Check if nnot social media login, then validate input fields
    if (!socialMediaLogin) {
      if (!inputs.email || !inputs.password) {
        alert("Please fill in all fields");
        return;
      } else if (inputs.password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
      }
    }
    try {
      const newUser = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser) return;
      router.push("/");
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (error) alert(error.message);
  }, [error]);

  return (
    <form className="space-y-6 px-6 pb-4'" onSubmit={handleLogin}>
      <h3 className="text-xl font-medium text-white">Sign In</h3>
      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium block mb-2 text-gray-dark"
        >
          Email
        </label>
        <input
          onChange={handleInputChange}
          type="email"
          name="email"
          id="email"
          className="
            border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white
        "
          placeholder="name@example.com"
        />
      </div>
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
            onChange={handleInputChange}
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
      <button
        type="submit"
        className="w-full text-white focus:ring-blue-300 font-medium rounded-lg
                text-sm px-5 py-2.5 text-center bg-btn-blue hover:bg-btn-blue-hover"
      >
        {loading ? "Loading..." : "Log In"}
      </button>
      {/* Social Media Log In */}
      <div className="flex items-center justify-center">
        <div className="w-full border-t-2 border-gray-500"></div>
        <div className="text-gray-700 text-sm mx-4">Or</div>
        <div className="w-full border-t-2 border-gray-500"></div>
      </div>
      <div className="flex items-center justify-center space-x-4">
        <button
          className="bg-white text-black px-2 py-1 sm:px-4 rounded-md text-sm font-medium hover:text-btn-blue-hover hover:bg-white hover:border-2 hover:border-btn-blue-hover border-2 border-transparent transition duration-300 ease-in-out"
          onClick={handleGoogleLogin}
        >
          <FcGoogle className="h-5 w-5 mr-2" />
          Google
        </button>
        <button
          className="bg-white text-black px-2 py-1 sm:px-4 rounded-md text-sm font-medium hover:text-btn-blue-hover hover:bg-white hover:border-2 hover:border-btn-blue-hover border-2 border-transparent transition duration-300 ease-in-out"
          onClick={handleTwitterLogin}
        >
          <FaTwitter className="h-5 w-5 mr-2" />
          Twitter
        </button>
      </div>
      <button
        className="flex w-full justify-end"
        onClick={() => handleClick("forgotPassword")}
      >
        <a className="text-sm block text-btn-blue hover:underline w-full text-right">
          Forgot Password?
        </a>
      </button>
      <div className="text-sm font-medium text-gray-700">
        Not Registered?{" "}
        <a
          href="#"
          className="text-blue-700 hover:underline"
          onClick={() => handleClick("register")}
        >
          Create an account
        </a>
      </div>
    </form>
  );
};
export default Login;
