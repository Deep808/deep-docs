"use client";

import { ThemeProvider } from "@material-tailwind/react";

import React from "react";

const MaterialThemeProvider = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default MaterialThemeProvider;
