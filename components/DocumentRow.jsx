import React, { useState } from "react";
import rowDocIcon from "../public/Row-Doc.svg";
import Image from "next/image";
import { IconButton } from "@material-tailwind/react";
import Link from "next/link";
import { IoTrashBinOutline } from "react-icons/io5";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
import { Toaster } from "react-hot-toast";
import { useStore } from "@/hooks/useStore";
import useDeleteModal from "@/hooks/useDeleteModal";
import useDeleteDoc from "@/hooks/useDeleteDoc";

const DocumentRow = ({ id, fileName, date }) => {
  const [openModal, setOpenModal] = useState(false);
  const { mode } = useStore();
  const { deleteDocument } = useDeleteDoc();

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const deleteADoc = () => {
    deleteDocument(db, id, doc, deleteDoc, mode);
  };

  // DELETE MODAL HOOK
  const modal = useDeleteModal(fileName, openModal, handleModal, deleteADoc);

  return (
    <>
      {modal}
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="flex items-center py-1 text-[0.8em] md:text-base justify-between">
        <Link className="flex justify-between w-full" href={`/doc/${id}`}>
          <div className="flex w-full justify-between items-center md:px-2 py-4 rounded-lg dark:hover:bg-white/5 hover:bg-gray-100 text-gray-700 cursor-pointer">
            <div className="flex items-center space-x-4">
              <Image
                width={30}
                height={30}
                className="w-6 h-6 md:w-8 md:h-8"
                alt="Row-Doc-Icon"
                src={rowDocIcon}
              />
              <p className="truncate font-semibold  dark:text-gray-500 hover:underline">
                {fileName}
              </p>
            </div>
            <div className="flex items-center p-0">
              <p>{date?.toDate().toLocaleDateString()}</p>
            </div>
          </div>
        </Link>
        <div onClick={handleModal} className="md:mr-4 -mr-2">
          <IconButton
            ripple="dark"
            className="ml-[3rem] rounded-full w-20 h-20 border-0"
            color="gray"
            variant="text"
          >
            <IoTrashBinOutline className="w-4 h-4 md:w-6 md:h-6 hover:text-red-500 text-gray-600" />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default DocumentRow;
