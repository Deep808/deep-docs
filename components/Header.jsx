/* eslint-disable @next/next/no-img-element */
"use client";

// import { IconButton } from "@material-tailwind/react";
// import { IoMdMenu } from "react-icons/io";
import { CiLight } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { GoMoon } from "react-icons/go";
import Image from "next/image";
import dlogo from "../public/Deep-Docs-Logo.svg";

import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useStore } from "@/hooks/useStore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import SearchInput from "./SearchInput";
import { IoMdClose } from "react-icons/io";
import useThemeMode from "@/hooks/useThemeMode";

const Header = () => {
  const { data: session, status } = useSession();

  const { mode, setMode } = useStore();

  const [isSearchBar, setIsSearchBar] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useThemeMode(db, getDoc, setMode, doc);

  const handleMode = async () => {
    if (!session?.user?.uid) return;

    const userDocRef = doc(db, "usersThemeMode", session?.user?.uid);

    try {
      const newMode = !mode;

      await setDoc(userDocRef, { darkMode: newMode }, { merge: true });

      setMode(newMode);
    } catch (error) {
      console.log("Error updating Mode!", error);
    }
  };

  return (
    <header className="sticky dark:bg-[#212121] top-0 z-50 flex justify-between md:justify-start lg:justify-start items-center w-full px-4 py-4 shadow-md bg-white">
      {/* <div>
        <IconButton
          ripple="dark"
          className="block md:hidden lg:hidden w-20 h-20 border-0"
          color="blue"
          variant="text"
        >
          <IoMdMenu className="block md:hidden lg:hidden w-6 h-6 md:w-8 md:h-8 text-gray-700" />
        </IconButton>
      </div> */}
      <div className="flex items-center">
        <Image
          className="block md:block lg:block"
          width={35}
          height={35}
          alt="logo"
          src={dlogo}
        />

        <h1 className="hidden dark:text-white md:inline-flex ml-2 font-semibold text-gray-700 text-xl">
          Docs
        </h1>
      </div>

      <div className="flex w-full justify-between">
        <div className="relative md:mx-20 flex-grow-0 w-[60%] md:flex-grow ml-4 mr-4 flex items-center dark:bg-gray-800/60 bg-gray-100 text-gray-600 rounded-lg focus-within:text-gray-600 focus-within:shadow-md">
          <div className="px-4">
            <IoIosSearch className="w-6 h-6 text-gray-700" />
          </div>
          <input
            onMouseDown={() => setIsSearchBar(false)}
            onClick={() => setIsSearchBar(!isSearchBar)}
            className="text-sm md:text-base flex-grow-0 w-[60%]  md:flex-grow dark:text-white bg-transparent outline-none"
            placeholder="Search..."
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {isSearchBar && (
            <SearchInput
              setIsSearchBar={setIsSearchBar}
              searchInput={searchInput}
            />
          )}
          {isSearchBar && (
            <div className="absolute right-0 cursor-pointer hover:bg-gray-500/10 rounded-full p-2">
              <IoMdClose
                onClick={() => setIsSearchBar(!isSearchBar)}
                className="w-6 h-6"
              />
            </div>
          )}
        </div>
        <div className="flex items-center">
          <div
            className="lg:hover:bg-gray-300 rounded-full p-2"
            onClick={handleMode}
          >
            {mode ? (
              <GoMoon className="w-6 h-6 text-gray-600 cursor-pointer" />
            ) : (
              <CiLight className="w-6 h-6 text-gray-600 cursor-pointer" />
            )}
          </div>

          <img
            loading="lazy"
            className="md:block cursor-pointer w-8 h-8 rounded-full ml-2 object-cover"
            src={
              session.user.image
                ? session?.user?.image
                : "../public/profile-icon.png"
            }
            alt="profile-image"
            onClick={signOut}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
