import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useStore } from "./useStore";

const useGemini = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAiText } = useStore();

  const fetchGeminiResponse = async (aiInput) => {
    setIsLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(
        process.env.NEXT_PUBLIC_GEMINI_API_KEY
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(aiInput);
      const response = result.response;
      const text = await response.text();
      setAiText(text);
    } catch (error) {
      console.error("Error fetching chat completion:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchGeminiResponse, isLoading };
};

export default useGemini;
