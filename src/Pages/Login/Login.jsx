import React, { useState } from "react";
import Footer from "../../layout/Footer/Footer";
import Header from "../../layout/Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUserData  } from "../../features/auth/authSlice";
import { useEffect } from "react";

async function loginUser(credentials) {
  try {
  const response = await fetch("http://localhost:3001/api/v1/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json(); // Assurez-vous que la réponse est en JSON
    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error; // Relancez l'erreur pour la gérer dans handleSubmit
  }
}

function Sign_in() {
  const isLogged = useSelector((state) => state.auth.isLogged);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

useEffect(() => {
  if (isLogged) {
    navigate(`/profile`);
  }
})

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      // Vérification de la présence du token dans la réponse
      if (!data || !data.body.token) {
        throw new Error("Token not found in response");
      }

      const token = data.body.token;

      // Vérification de la validité du token
      if (typeof token !== "string" || token.split(".").length !== 3) {
        throw new Error("Invalid token specified: must be a valid JWT");
      }

      // Les console.log fonctionneront correctement ici
      localStorage.setItem("token", token);
      console.log(
        "Token stored in localStorage:",
        localStorage.getItem("token")
      );
      dispatch(setToken({ token })); // Dispatch the token to Redux
       // Fetch user data immediately after setting the token
       const response = await fetch(`http://localhost:3001/api/v1/user/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        dispatch(setUserData(userData.body));
        navigate(`/profile`);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };


  return (
    <>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <FontAwesomeIcon icon={faCircleUser} />
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className="sign-in-button">Sign In</button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Sign_in;
