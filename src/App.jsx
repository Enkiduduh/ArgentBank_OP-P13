import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Error from "./Pages/Error/Error";
import Profile from "./Pages/Profile/Profile";
import Header from "./layout/Header/Header";
import AuthLoader from "./component/AuthLoader";
import { useState } from "react";

library.add(fas);

function App() {
  const [token, setToken] = useState();

  return (
    <Provider store={store}>
      <Router>
        <AuthLoader>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Error />} />
        </Routes>
        </AuthLoader>
      </Router>
    </Provider>
  );
}

export default App;
