import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedPlacement = localStorage.getItem("placement");
  const [placement, setPlacement] = useState(storedPlacement || "Patient");

  const setAuthPlacement = (newPlacement) => {
    localStorage.setItem("placement", newPlacement);
    setPlacement(newPlacement);
  };
  useEffect(() => {
    // Log or display the placement value
    console.log("Placement:", placement);
  }, [placement]);

  return (
    <AuthContext.Provider value={{ placement, setAuthPlacement }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
