"use client";
import React, { useState, useEffect } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
type ResetPasswordProps = {};

const ResetPassword: React.FC<ResetPasswordProps> = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await sendPasswordResetEmail(email);
    if (!email) {
      setMessage("Please enter your email address");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }
    if (success) {
      setMessage("Reset link sent to your email");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      setEmail("");
    }
  };

  useEffect(() => {
    if (error) {
      setMessage(error.message);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [error]);

  return (
    <form
      className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8"
      onSubmit={handleResetPassword}
    >
      <h3 className="text-xl font-medium text-white">Reset Password</h3>
      <p className="text-sm text-white ">
        Forgotten your password? Enter your email address below, and we'll send
        you a link to reset your password.
      </p>
      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium block mb-2 text-gray-dark"
        >
          Your Email
        </label>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          className="
                    border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    bg-gray-600 border-gray-500 placeholder-gray-400 text-white
                "
          placeholder="name@example.com"
        />
      </div>
      <button
        type="submit"
        className="w-full text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-btn-blue hover:bg-btn-blue-hover"
      >
        {sending ? "Sending..." : "Reset Password"}
      </button>
      {message && (
        <div className="text-center text-blue-700 bg-gray-300 p-2 rounded-lg">
          {message}
        </div>
      )}
    </form>
  );
};
export default ResetPassword;
