"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

//test
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./config";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { userAgent } from "next/server";
import Login from "./Login";

export default function OTPSec() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const router = useRouter();
  const auth = getAuth(app);

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       router.push("./dashboard");
  //     }
  //   });
  // }, [auth, router]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is already authenticated, do nothing or perform other actions
        console.log("User is already authenticated.");
      } else {
        // User is not authenticated, you can handle this case differently
        console.log("User is not authenticated.");
      }
    });

    // Cleanup function to unsubscribe from the auth state listener when the component unmounts
    return () => unsubscribe();
  }, [auth]);

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Phone Authentication | Firebase
          </h2>
        </div>

        <div className="mt-10  sm:mx-auto sm:w-full sm:max-w-sm">
          <Login />

          <p className="mt-10 text-center text-sm text-gray-500">
            <a
              href="https://firebase.google.com/docs/auth/flutter/phone-auth"
              className="font-semibold leading-6 text-lg text-orange-600 hover:text-black"
            >
              Read the Firebase Documentation
            </a>
          </p>
          <img
            className="mx-auto py-5 h-50 w-auto"
            src="https://www.mememaker.net/static/images/memes/4531655.jpg"
            alt="Your Company"
          />
        </div>
      </div>
    </>
  );
}
