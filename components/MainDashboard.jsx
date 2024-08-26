"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Login from "./Login";
import Header from "./Header";
import NewDoc from "./NewDoc";
import MyDocs from "./MyDocs";
import { useStore } from "@/hooks/useStore";
import toast, { Toaster } from "react-hot-toast";

const MainDashboard = () => {
  const { data: session, status } = useSession();
  const { mode, isToast } = useStore();
  const toastDisplayed = useRef(false);
  const [loading, setLoading] = useState(status === "loading");

  useEffect(() => {
    import("ldrs").then((module) => {
      const { hatch } = module;
      hatch.register();
    });

    // Handle toast notifications
    if (isToast && !toastDisplayed.current) {
      toast.success("Changes Saved!", {
        style: {
          background: mode ? "#232323" : "#fff",
          color: mode ? "#fff" : "#000",
        },
      });
      toastDisplayed.current = true;
    }

    if (!isToast) {
      toastDisplayed.current = false;
    }

    // Update loading state based on session status
    if (status !== "loading") {
      setLoading(false);
    }
  }, [isToast, mode, status]);

  if (loading) {
    return (
      <div
        className={`flex ${
          mode ? "bg-black" : "bg-white"
        } justify-center items-center h-[100vh]`}
      >
        <l-hatch size="28" stroke="4" speed="3.5" color="#008CFF"></l-hatch>
      </div>
    );
  }

  if (!session) return <Login />;

  return (
    <div className={mode ? "dark" : "light"}>
      {isToast && <Toaster position="bottom-center" reverseOrder={false} />}
      <Header />
      <NewDoc />
      <MyDocs />
    </div>
  );
};

export default MainDashboard;
