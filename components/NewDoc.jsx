"use client";

import { IconButton } from "@material-tailwind/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { useState } from "react";
import { useStore } from "@/hooks/useStore";
import { db } from "@/firebase";
import { useSession } from "next-auth/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import useCreateModal from "@/hooks/useCreateModal";

const NewDoc = () => {
  const { open, setOpen, mode } = useStore();
  const [input, setInput] = useState("");

  const { data: session, status } = useSession();

  const handleOpen = () => setOpen(!open);

  const createDocument = async () => {
    if (!input) {
      return alert("Document Title is Required!");
    }

    try {
      await addDoc(collection(db, "userDocs", session.user.email, "docs"), {
        fileName: input,
        timestamp: serverTimestamp(),
      });
      toast.success(`${input} is created!`, {
        style: {
          background: `${mode ? "#232323" : "#fff"}`,
          color: `${mode ? "#fff" : "#000"}`,
        },
      });

      setInput("");
      handleOpen();
    } catch (error) {
      console.log(error);
    }
  };

  // CREATE MODAL HOOK
  const modal = useCreateModal(
    handleOpen,
    open,
    input,
    setInput,
    createDocument
  );

  return (
    <>
      {modal}
      <Toaster position="bottom-center" reverseOrder={false} />
      <section className="bg-[#F8F9FA] dark:bg-[#222222] pb-10 px-10">
        <div className="max-w-3xl mx-auto">
          <div className="py-6 flex items-center justify-between">
            <h1 className="text-gray-700 text-sm md:text-lg dark:text-gray-500">
              Start a new document
            </h1>
            <div>
              <IconButton
                ripple="dark"
                className="md:ml-20 rounded-full w-20 h-20 border-0"
                color="gray"
                variant="text"
              >
                <BsThreeDotsVertical className="w-6 h-6 text-gray-600" />
              </IconButton>
            </div>
          </div>

          <div className="w-full">
            <div
              onClick={handleOpen}
              className="bg-gray-100 dark:bg-[#212121] mx-auto md:mx-0 lg:mx-0 max-w-[12em] min-h-[16em] flex items-center cursor-pointer rounded-md justify-center hover:shadow-md border-2 hover:border-blue-500 transition-all ease-linear"
            >
              <HiOutlineDocumentPlus className="w-10 h-10 md:w-16 md:h-16 dark:text-gray-500 text-blue-gray-500 hover:scale-105 transition-all ease-linear dark:hover:text-blue-500 hover:text-blue-500" />
            </div>
            <p className="ml-2 mt-2 text-center md:text-start text-sm md:text-lg font-semibold dark:text-gray-500 text-gray-700">
              Blank
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewDoc;
