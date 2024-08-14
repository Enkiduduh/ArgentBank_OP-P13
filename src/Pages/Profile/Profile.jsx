import Footer from "../../layout/Footer/Footer";
import Header from "../../layout/Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useSelector, useDispatch  } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../../features/auth/authSlice"; // Importez une action pour mettre à jour les données utilisateur dans Redux

function Profil() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isScreenWider480, setIsScreenWider480] = useState(
    window.innerWidth > 480,
)

useEffect(() => {
  const handleResize = () => {
      setIsScreenWider480(window.innerWidth > 480)
  }

  window.addEventListener('resize', handleResize)

  return () => {
      window.removeEventListener('resize', handleResize)
  }
}, [])

  useEffect(() => {
    if (token) {
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
          if (response.ok) {
            const data = await response.json();
            setUser(data);
            setFirstName(data.body.firstName);
            setLastName(data.body.lastName);
          } else {
            console.error("Failed to fetch user data:", response.status);
          }
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des données utilisateur:",
            error
          );
        }
      };

      fetchUserData();
    } else {
      navigate("/Login"); // Redirect to login if token is not available
    }
  }, [token, navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleEditButton = () => {
    setIsEditing(true);
  };

  const handleCancelingButton = () => {
    setIsEditing(false)
  };

  const handleSaveButton = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ firstName, lastName }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setIsEditing(false);

        dispatch(setUserData({ firstName: updatedUser.body.firstName, lastName: updatedUser.body.lastName }));
      } else {
        console.error('Failed to update user data:', response.status);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données utilisateur:", error);
    }
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };


  return (
    <>
      <main className="main bg-dark">
      {!isEditing ? (
  <div className="header">
    <h1>
      Welcome back
      <br />
      {firstName} {lastName}!
    </h1>
    <button className="edit-button" onClick={handleEditButton}>Edit Name</button>
  </div>
) : (
  isScreenWider480 ? (
    <div className="header">
      <h1>Welcome back</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleSaveButton(); }}>
        <div className="profil-name-case">
          <div className="profil-name">
            <input
              type="text"
              className="name"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
          <div className="profil-name">
            <input
              type="text"
              className="name"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </div>
        </div>
        <div className="edit-profil-button-case">
          <div className="edit-profil-button" onClick={handleSaveButton}>Save</div>
          <div className="edit-profil-button" onClick={handleCancelingButton}>Cancel</div>
        </div>
      </form>
    </div>
  ) : (
    <div className="header">
      <h1>Welcome back</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleSaveButton(); }}>
        <div className="profil-name-case">
          <div className="profil-name">
            <input
              type="text"
              className="name"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
          <div className="profil-name">
            <input
              type="text"
              className="name"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </div>
        </div>
        <div className="edit-profil-button-case">
          <div className="edit-profil-button" onClick={handleSaveButton}>Save</div>
          <div className="edit-profil-button" onClick={handleCancelingButton}>Cancel</div>
        </div>
      </form>
    </div>
  )
)}

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
