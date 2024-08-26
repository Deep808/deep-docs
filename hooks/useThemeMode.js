import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

const useThemeMode = async (db, getDoc, setMode, doc) => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session?.user?.uid) return;
    const fecthMode = async () => {
      const userDocRef = doc(db, "usersThemeMode", session?.user?.uid);

      try {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const userThemeData = docSnap.data();
          if (userThemeData.darkMode !== undefined) {
            setMode(userThemeData.darkMode);
          }
        }
      } catch (error) {
        console.log("Error fetching mode:", error);
      }
    };

    fecthMode();
  }, [session, setMode, db, doc, getDoc]);
};

export default useThemeMode;
