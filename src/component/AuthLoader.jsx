// src/components/AuthLoader.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData, setToken } from "../features/auth/authSlice";

const AuthLoader = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      dispatch(setToken({ token: storedToken }));
      const fetchUserData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/api/v1/user/profile`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${storedToken}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            dispatch(setUserData(data.body));
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      };
      fetchUserData();
    }
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthLoader;
