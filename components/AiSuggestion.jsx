import useGemini from "@/hooks/useGemini";
import { useStore } from "@/hooks/useStore";
import React, { useState } from "react";
import { CiLocationArrow1 } from "react-icons/ci";
import { quantum } from "ldrs";
import { BsClipboard } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import Markdown from "markdown-to-jsx";

const AiSuggestion = () => {
  const [aiInput, setAiInput] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);
  const { AiText, mode } = useStore();
  const { fetchGeminiResponse, isLoading } = useGemini();

  quantum.register();

  const handleSubmit = async () => {
    setShowSuggestion(true);
    await fetchGeminiResponse(aiInput);
    setAiInput("");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(AiText);
      toast.success("Copied", {
        style: {
          background: `${mode ? "#232323" : "#fff"}`,
          color: `${mode ? "#fff" : "#000"}`,
        },
      });
    } catch (error) {
      console.error("Unable to copy to clipboard:", error);
    }
  };

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="sticky z-50 bg-gray-200 dark:bg-[#292929] max-w-[80%] md:w-[70%] lg:w-[50%] m-auto left-0 right-0 bottom-10 flex justify-center items-center mx-auto rounded-lg dark:text-white focus-within:shadow-md focus-within:shadow-gray-400 dark:focus-within:shadow-gray-700/20">
        {showSuggestion && (
          <>
            <div className="absolute shadow-md shadow-gray-500 dark:shadow-gray-700/20 bottom-16 bg-gray-200 dark:bg-[#292929] h-[40vh] w-full rounded-lg p-4 overflow-y-auto">
              {isLoading ? (
                <div className="flex justify-center items-center h-[20vh] my-auto">
                  <l-quantum size="45" speed="1.75" color="blue"></l-quantum>
                </div>
              ) : (
                <div className="flex">
                  <p className="h-auto text-sm md:text-md leading-7 lg:text-[1em] overflow-y-auto flex items-end">
                    <Markdown>{AiText}</Markdown>

                    {
                      <span className="flex items-center">
                        <span
                          onClick={handleCopy}
                          className="cursor-pointer dark:hover:bg-white/10 hover:bg-gray-300 rounded-full p-2 mx-2"
                        >
                          <BsClipboard className="w-4 h-4" />
                        </span>
                      </span>
                    }
                  </p>
                </div>
              )}
            </div>
          </>
        )}
        <div className="hidden md:block ml-4 text-[#292929] dark:text-white">
          ✶
        </div>

        <input
          className="flex-grow truncate text-sm md:text-md lg:text-[1em] p-4 bg-transparent outline-none"
          placeholder="Want AI Suggestion? Enter your prompt here..."
          value={aiInput}
          onChange={(e) => setAiInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <div className="flex items-center justify-around">
          <div
            onClick={handleSubmit}
            className="cursor-pointer dark:hover:bg-white/10 hover:bg-gray-300 rounded-full p-2 mr-2"
          >
            <CiLocationArrow1 className="w-4 h-4 md:w-6 md:h-6" />
          </div>
          {showSuggestion && (
            <span
              onClick={() => setShowSuggestion(false)}
              className="cursor-pointer md:mr-4 dark:hover:bg-white/10 hover:bg-gray-300 rounded-full p-1 mr-4"
            >
              <IoMdClose className="w-4 h-4 md:w-6 md:h-6" />
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default AiSuggestion;
