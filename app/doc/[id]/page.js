/* eslint-disable @next/next/no-img-element */
"use client";

import Login from "@/components/Login";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { hatch } from "ldrs";
import Image from "next/image";
import rowDocIcon from "../../../public/Row-Doc.svg";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import "../../../style.css";
import { BsPersonFillUp } from "react-icons/bs";
import TextEditor from "@/components/TextEditor";
import { useStore } from "@/hooks/useStore";
import { IoArrowBackOutline } from "react-icons/io5";

const Doc = ({ params }) => {
  const { data: session, status } = useSession();
  const { id } = params;

  const { mode, setIsToast } = useStore();

  const [userDoc, setUserDoc] = useState(null);
  const [loading, setLoading] = useState(true);

  hatch.register();

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user?.email) return;

    const fetchUserDoc = async () => {
      try {
        const docRef = doc(db, "userDocs", session.user.email, "docs", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserDoc(docSnap.data());
        } else {
          console.error("No document found!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDoc();
  }, [session, id, status]);

  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center h-[100vh] my-auto">
        <l-hatch size="28" stroke="4" speed="3.5" color="#008CFF"></l-hatch>
      </div>
    );
  }

  if (!session) return <Login />;

  return (
    <div className={`${mode ? "dark" : "light"}`}>
      <header className="flex sticky top-0 z-50 w-full shadow-md dark:bg-[#212121] bg-white justify-between items-center px-4 py-3">
        <div className="flex items-center">
          <Link
            className="hover:bg-gray-500/10 dark:hover:bg-white/5 ml-0  mr-1 lg:mr-3 rounded-full p-2"
            onClick={() => setIsToast(true)}
            href={"/"}
          >
            <IoArrowBackOutline className="dark:text-white  text-gray-600 w-6 h-6 lg:w-6 lg:h-6" />
          </Link>
          <div className="flex items-center">
            <Image width={30} height={30} alt="logo" src={rowDocIcon} />
          </div>
          <div className="flex-grow ml-2 px-2">
            <h1 className="font-bold dark:text-gray-500">{userDoc.fileName}</h1>
            <div className="flex items-center text-sm space-x-1 -ml-2 h-8 text-gray-600">
              <h1 className="ml-2">Autosave: </h1>
              <p className="text-green-400 font-semibold">ON</p>
              {/* <p className="option">File</p>
              <p className="option">Edit</p>
              <p className="option">View</p>
              <p className="option">Insert</p>
              <p className="option">Format</p>
              <p className="option">Tools</p> */}
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <div className="hidden md:flex lg:flex text-white px-4 py-2 items-center space-x-2 rounded-lg bg-blue-600 hover:shadow-lg">
            <BsPersonFillUp className="w-6 h-6 text-white" />

            <p>SHARE</p>
          </div>

          <img
            loading="lazy"
            className="md:block cursor-pointer w-8 h-8 rounded-full ml-2 object-cover"
            src={session?.user?.image}
            alt="profile-image"
            onClick={signOut}
          />
        </div>
      </header>

      <TextEditor id={id} session={session} />
    </div>
  );
};

export default Doc;
