"use client";
export const getInitialValue = (variableName: string, defaultValue?: string): string => {
  try {
    return localStorage.getItem(variableName) || defaultValue || "";
  } catch (error) {
    console.error("Error while getting item from local storage:", error);
    return defaultValue || "";
  }
};
