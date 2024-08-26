import React, { useEffect, useMemo, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { db } from "@/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import AiSuggestion from "./AiSuggestion";
import { useStore } from "@/hooks/useStore";
import useThemeMode from "@/hooks/useThemeMode";

const TextEditor = ({ session, id }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const { mode, setMode } = useStore();
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      fullSize: false,
      placeholder: content !== "" ? "" : "Start your story...",
      style: {
        backgroundColor: mode ? "#232323" : "#F8F9FA",
        color: mode ? "white" : "black",
        height: "100vh",
        padding: "2em",
      },
      toolbarSticky: true,
      toolbarStickyOffset: 80,
      showXPathInStatusbar: false,
      showCharsCounter: false,
      showWordsCounter: false,
      showPoweredByJodit: false,
    }),
    [mode, content]
  );

  const docDataRef = doc(db, "userDocs", session?.user?.email, "docs", id);
  const [snapshot, error] = useDocumentOnce(docDataRef);

  useThemeMode(db, getDoc, setMode, doc);

  useEffect(() => {
    const fetchDocumentData = () => {
      if (snapshot?.exists()) {
        const storedContent = snapshot.data()?.content || "";
        setContent(storedContent);
      } else {
        setContent("");
      }
      setLoading(false);
    };

    fetchDocumentData();
  }, [snapshot]);

  const onContentChange = async (newContent) => {
    setContent(newContent);

    try {
      await setDoc(docDataRef, { content: newContent }, { merge: true }); // Save to Firestore
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[100vh] my-auto">
        <l-hatch size="28" stroke="4" speed="3.5" color="#008CFF"></l-hatch>
      </div>
    );
  }

  return (
    <div
      className={`relative ${
        mode ? "bg-[#212121] dark" : "bg-[#F8F9FA]"
      } min-h-screen pb-16 flex flex-col justify-center`}
    >
      <div className="w-full max-w-[100%] mt-16 border-none shadow-lg dark:shadow-lg dark:shadow-gray-900 lg:max-w-[60%] cursor-text mx-auto">
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1}
          onBlur={onContentChange}
        />
      </div>
      <AiSuggestion />
    </div>
  );
};

export default TextEditor;
