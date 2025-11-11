import { useState, useEffect } from "react";

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // sementara dummy user
      setUser({ fullname: "Player Joki" });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return { user, logout };
};
