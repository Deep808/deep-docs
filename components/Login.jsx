"use client";

import Image from "next/image";
import React from "react";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Image width={150} height={150} alt="logo" src="/Deep-Docs-Logo.svg" />
      <p
        className="block w-auto rounded-md px-6 py-2 text-lg my-4 font-semibold hover:text-blue-500 border border-blue-500 hover:shadow-lg transition-all ease-linear duration-100"
        onClick={signIn}
      >
        Sign In
      </p>
      <div className="absolute bottom-3">
        <p className="text-[1em] text-center font-extrabold">
          Sign in to create your personalized docs.
        </p>
        <p className="text-black/50 text-center text-[.8em]">
          {`Don't worry, your data is safe with us. We take your privacy seriously.`}
        </p>
      </div>
    </div>
  );
};

export default Login;
