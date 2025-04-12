import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

interface User {
  _id: string;
  googleId: string;
  displayName: string;
  email?: string;
}

export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCurrentUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get<User | null>(
        "http://localhost:3011/auth/current_user"
      );
      setUser(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.get("http://localhost:3011/auth/logout");
      setUser(null);
    } catch (err) {
      setError("Failed to logout");
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return {
    user,
    loading,
    error,
    isLoggedIn: !!user,
    getCurrentUser,
    logout,
  };
};

export default useCurrentUser;
