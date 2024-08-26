"use client";

import React, { useEffect } from "react";
import { FaFolderClosed } from "react-icons/fa6";
import { db } from "@/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useStore } from "@/hooks/useStore";
import DocumentRow from "./DocumentRow";
import { useSession } from "next-auth/react";
import NoDoc from "./NoDoc";

const MyDocs = () => {
  const { docs, setDocs } = useStore();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user?.email) return;

    const q = query(
      collection(db, "userDocs", session.user.email, "docs"),
      orderBy("timestamp", "desc")
    );

    // Set up a real-time listener
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDocs(documents);
      },
      (error) => {
        console.error("Error fetching documents: ", error);
      }
    );

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, [session?.user?.email, status, setDocs]);

  return (
    <section className="bg-white dark:bg-[#222222] h-screen px-10 md:px-0">
      <div className="max-w-3xl md:max-w-2xl lg:max-w-3xl mx-auto py-8 text-sm text-gray-700">
        <div className="flex items-center justify-between pb-5">
          <h2 className="dark:text-gray-500 font-medium flex-grow">
            My Documents
          </h2>
          <div className="flex items-center min-w-[30%] md:min-w-[23%] justify-between md:mr-6">
            <p className="dark:text-gray-500 mr-12">Date Created</p>

            <div>
              <FaFolderClosed className="dark:text-gray-500 w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>
        {docs.length > 0 ? (
          docs.map((doc) => (
            <DocumentRow
              fileName={doc.fileName}
              id={doc.id}
              key={doc.id}
              date={doc.timestamp}
            />
          ))
        ) : (
          <NoDoc />
        )}
      </div>
    </section>
  );
};

export default MyDocs;
