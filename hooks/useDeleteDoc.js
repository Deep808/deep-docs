import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const useDeleteDoc = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const deleteDocument = async (db, id, doc, deleteDoc, mode) => {
    setIsLoading(true);

    const docRef = doc(db, "userDocs", session?.user?.email, "docs", id);

    try {
      await deleteDoc(docRef);
      toast.success("Doc deleted successfully!", {
        style: {
          background: `${mode ? "#232323" : "#fff"}`,
          color: `${mode ? "#fff" : "#000"}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { deleteDocument, isLoading };
};

export default useDeleteDoc;
