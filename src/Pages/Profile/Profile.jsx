import Footer from "../../layout/Footer/Footer";
import Header from "../../layout/Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Login from "../Login/Login";
import { jwtDecode } from "jwt-decode";

function Profil() {
  const [token, setToken] = useState();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Vérifiez si le token est déjà stocké dans localStorage
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    console.log(token);
    if (token) {
      try {
        const fetchUserData = async () => {
          try {
            const response = await fetch(
              `http://localhost:3001/api/v1/user/profile`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            console.log(response);
            if (response.ok) {
              const data = await response.json();
              setUser(data);
              console.log(data);
            }
          } catch (error) {
            console.error(
              "Erreur lors de la récupération des données utilisateur:",
              error
            );
          }
        };

        fetchUserData();
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, [token]);

  if (!token) {
    return <Login setToken={setToken} />;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {user.body.firstName} {user.body.lastName}!
          </h1>
          <button className="edit-button">Edit Name</button>
        </div>
        <div className="header">
          <h1>Welcome back</h1>
          <form action="">
          <div className="profil-name-case">
            <div className="profil-name">
              <input type="text" className="name" value={user.body.lastName} />
            </div>
            <div className="profil-name">
              <input type="text" className="name" value={user.body.firstName} />
            </div>
          </div>

          <div className="edit-profil-button-case">
            <div className="edit-profil-button">Save</div>
            <div className="edit-profil-button">Cancel</div>
          </div>
          </form>
        </div>

        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Profil;
