import Footer from "../../layout/Footer/Footer";
import Header from "../../layout/Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

function Sign_in() {
  return (
    <>
      <Header />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <FontAwesomeIcon icon={faCircleUser} />
          <h1>Sign In</h1>
          <form>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            {/* <!-- PLACEHOLDER DUE TO STATIC SITE --> */}
            <a href="./user.html" className="sign-in-button">
              Sign In
            </a>
            {/* <!-- SHOULD BE THE BUTTON BELOW -->
        <!-- <button class="sign-in-button">Sign In</button> -->
        <!--  --> */}
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Sign_in;
