"use client";
import React, { useState, useEffect } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import { app } from "./config";
import { useRouter } from "next/navigation";
import dashboard from "./dashboard";
export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, SetConfirmationResult] = useState(null);
  const [otpSent, setOtpSent] = useState(false);

  const auth = getAuth(app);
  const router = useRouter();

  useEffect(() => {
    window.RecaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "normal",
        callback: (response) => {},
        "expired-callback": () => {},
      }
    );
  }, [auth]);

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSentOtp = async () => {
    try {
      const formattedPhoneNumber = `+${phoneNumber.replace(/\D/g, "")}`;
      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhoneNumber,
        window.RecaptchaVerifier
      );
      SetConfirmationResult(confirmation);
      setOtpSent(true);
      setPhoneNumber("");
      alert("OTP has been sent");
    } catch (error) {
      console.error(error);
    }
  };

  const handleOtpSubmit = async () => {
    try {
      await confirmationResult.confirm(otp);
      setOtp("");
      router.push("./dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {!otpSent ? <div id="recaptcha-container"></div> : null}
      {/* <input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder="enter phone number with contry code"
        className="border border-gray-500 p-2 rounded-md"
      />

      <input
        type="text"
        value={otp}
        onChange={handleOtpChange}
        placeholder="enter otp "
        className="border border-gray-500 p-2 rounded-md"
      />

      <button
        onClick={otpSent ? handleOtpSubmit : handleSentOtp}
        className={`bg-${
          otpSent ? "green" : "blue"
        }-500 text-white p-2 rounded-md m-2`}
        style={{ backgroundColor: otpSent ? "green" : "blue" }}
      >
        {otpSent ? "Submit OTP" : "Send OTP"}
      </button> */}

      <form className="space-y-6" action="#" method="POST">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Enter Phone Number (With Country code)
          </label>
          <div className="mt-2">
            <input
              id="tel"
              name="tel"
              onChange={handlePhoneNumberChange}
              type="tel"
              value={phoneNumber}
              autoComplete="tel"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 lg:text-lg sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Enter OTP
            </label>
            {/* <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div> */}
          </div>
          <div className="mt-2">
            <input
              id="OTP"
              name="OTP"
              type="text"
              value={otp}
              onChange={handleOtpChange}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 lg:text-lg sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            onClick={otpSent ? handleOtpSubmit : handleSentOtp}
            className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {otpSent ? "Submit OTP" : "Send OTP"}
          </button>
        </div>
      </form>
    </div>
  );
}
