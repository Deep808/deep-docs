import React, { useEffect, useMemo, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import AiSuggestion from "./AiSuggestion";
import { useStore } from "@/hooks/useStore";
import useThemeMode from "@/hooks/useThemeMode";
import { db } from "@/firebase";

const TextEditor = ({ session, id }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const { mode, setMode } = useStore();
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "",
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
    [mode]
  );

  const docDataRef = doc(db, "userDocs", session?.user?.email, "docs", id);
  const [snapshot] = useDocumentOnce(docDataRef);

  //THEME HOOK
  useThemeMode(db, getDoc, setMode, doc);

  useEffect(() => {
    if (snapshot?.exists()) {
      setContent(snapshot.data()?.content || "");
    }
    setLoading(false);
  }, [snapshot]);

  const saveContent = async (newContent) => {
    try {
      await setDoc(docDataRef, { content: newContent }, { merge: true });
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleBlur = () => {
    if (editor.current) {
      const editorContent = editor.current.value;
      if (editorContent !== content) {
        saveContent(editorContent);
        setContent(editorContent);
      }
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (editor.current) {
        if (editor.current.value == null) {
          console.log("No Data in the DOC!");
        } else {
          saveContent(editor.current.value);
        }
      }

      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (editor.current) {
        saveContent(editor.current.value);
      }
    };
  }, [content]);

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
          onBlur={handleBlur} // Save on blur event
        />
      </div>
      <AiSuggestion />
    </div>
  );
};

export default TextEditor;
