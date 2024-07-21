import Logo from "../../assets/img/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { clearToken } from '../../features/auth/authSlice';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header({ user }) {
  const isLogged = useSelector((state) => state.auth.isLogged);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickOut = () => {
    dispatch(clearToken());
    navigate(`/`);
  };

  const handleClickIn = () => {
    navigate(`/Login`);
  };


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
        {!isLogged ? (
          <div className="log">
            <FontAwesomeIcon icon={faCircleUser} />
            <div className="main-nav-item" onClick={handleClickIn}>
              Sign In
            </div>
          </div>
        ) : (
          <>
            <div className="log">
              <div className="loginfos1">
                <FontAwesomeIcon icon={faCircleUser} />
              </div>
              <div className="loginfos1">{user}</div>
              <div className="loginfos2">
                <FontAwesomeIcon icon={faRightFromBracket} />
                <div className="main-nav-item" onClick={handleClickOut}>
                  Log out
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </>
  );
}

export default Header;
