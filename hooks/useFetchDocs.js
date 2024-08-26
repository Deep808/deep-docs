import { useEffect } from "react";
import { useStore } from "@/hooks/useStore";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { useSession } from "next-auth/react";

export const useFetchDocs = () => {
  const { setSearchDocs } = useStore();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading" || !session?.user?.email) return;

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
          fileName: doc.data().fileName,
          date: doc.data().timestamp,
        }));

        setSearchDocs(documents);
      },
      (error) => {
        console.error("Error fetching documents: ", error);
      }
    );

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, [session?.user?.email, status, setSearchDocs]);
};
