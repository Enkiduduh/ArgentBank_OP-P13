import Logo from "../../assets/img/argentBankLogo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

function Header() {
  return (
    <>
      <nav className="main-nav">
        <a className="main-nav-logo" href="/">
          <img
            className="main-nav-logo-image"
            src={Logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
            <FontAwesomeIcon icon={faCircleUser} />
          <a className="main-nav-item" href="/login">
            Sign In
          </a>
        </div>
      </nav>
    </>
  );
}

export default Header;
