import Footer from "../../layout/Footer/Footer";
import Header from "../../layout/Header/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from "react";
import Sign_in from "../../Pages/Sign-In/Sign_in";
import { useParams } from 'react-router-dom';

function Profil() {
  const { id } = useParams();
  const [token, setToken] = useState();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(`http://localhost:3001/api/v1/user/${id}`);
      const data = await response.json();
      setUser(data);
    }
    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  if(!token) {
    return <Sign_in setToken={setToken} />
  }

  return (
    <>
     <Header />
      <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />{user.firstName} {user.lastName}!</h1>
        <button className="edit-button">Edit Name</button>
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
  )
}

export default Profil
