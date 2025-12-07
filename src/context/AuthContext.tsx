import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../types";

interface AuthContextType {
  user: User | null;
  userData: any | null; // Add this for user profile data
  login: (
    email: string,
    role: "admin" | "student" | "teacher" | "parent"
  ) => void;
  setUserData: (data: any) => void; // Add this to set user data
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any | null>(null); // Add user data state

  useEffect(() => {
    // Check for existing session on mount
    const adminLoggedIn = sessionStorage.getItem("adminLoggedIn");
    const studentLoggedIn = sessionStorage.getItem("studentLoggedIn");
    const teacherLoggedIn = sessionStorage.getItem("teacherLoggedIn");
    const parentLoggedIn = sessionStorage.getItem("parentLoggedIn");

    if (adminLoggedIn) {
      const email = sessionStorage.getItem("adminEmail") || "";
      setUser({ email, role: "admin", loggedIn: true });
      // You can also load user data from sessionStorage if needed
      const savedUserData = sessionStorage.getItem("userData");
      if (savedUserData) {
        setUserData(JSON.parse(savedUserData));
      }
    } else if (studentLoggedIn) {
      const email = sessionStorage.getItem("studentEmail") || "";
      setUser({ email, role: "student", loggedIn: true });
      const savedUserData = sessionStorage.getItem("userData");
      if (savedUserData) {
        setUserData(JSON.parse(savedUserData));
      }
    } else if (teacherLoggedIn) {
      const email = sessionStorage.getItem("teacherEmail") || "";
      setUser({ email, role: "teacher", loggedIn: true });
      const savedUserData = sessionStorage.getItem("userData");
      if (savedUserData) {
        setUserData(JSON.parse(savedUserData));
      }
    } else if (parentLoggedIn) {
      const email = sessionStorage.getItem("parentEmail") || "";
      setUser({ email, role: "parent", loggedIn: true });
      const savedUserData = sessionStorage.getItem("userData");
      if (savedUserData) {
        setUserData(JSON.parse(savedUserData));
      }
    }
  }, []);

  const login = (
    email: string,
    role: "admin" | "student" | "teacher" | "parent"
  ) => {
    sessionStorage.setItem(`${role}LoggedIn`, "true");
    sessionStorage.setItem(`${role}Email`, email);
    setUser({ email, role, loggedIn: true });
  };

  // Add this function to set user data globally
  const setUserDataGlobal = (data: any) => {
    setUserData(data);
    // Optionally save to sessionStorage for persistence
    sessionStorage.setItem("userData", JSON.stringify(data));
  };

  const logout = () => {
    if (user) {
      sessionStorage.removeItem(`${user.role}LoggedIn`);
      sessionStorage.removeItem(`${user.role}Email`);
      sessionStorage.removeItem("userData");
    }
    setUser(null);
    setUserData(null); // Clear user data on logout
  };

  const isAuthenticated = user !== null && user.loggedIn;

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        login,
        setUserData: setUserDataGlobal, // Export setUserData function
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
