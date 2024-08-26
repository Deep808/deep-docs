import Link from "next/link";
import React, { useState } from "react";
import rowDocIcon from "../public/Row-Doc.svg";
import Image from "next/image";
import { IconButton } from "@material-tailwind/react";
import { IoTrashBinOutline } from "react-icons/io5";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
import { useStore } from "@/hooks/useStore";
import useDeleteModal from "@/hooks/useDeleteModal";
import useDeleteDoc from "@/hooks/useDeleteDoc";

const SearchedDocs = ({ fileName, id }) => {
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
      <div className="flex items-center justify-between">
        <Link className="w-[100%]" href={`/doc/${id}`}>
          <div className="flex flex-col p-6 hover:bg-gray-500/10 dark:hover:bg-white/10">
            <div className="flex items-center space-x-4">
              <Image
                width={30}
                height={30}
                alt="doc-icon"
                className="w-4 h-4 md:w-6 md:h-6"
                src={rowDocIcon}
              />

              <p className="dark:text-white text-[0.8em] md:text-base text-black">
                {fileName}
              </p>
            </div>
          </div>
        </Link>
        <div onClick={handleModal} className="md:mr-4">
          <IconButton
            ripple="dark"
            className="md:ml-6 rounded-full w-20 h-20 border-0"
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

export default SearchedDocs;
