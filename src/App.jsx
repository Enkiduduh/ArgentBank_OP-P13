import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Error from "./Pages/Error/Error";
import Profile from "./Pages/Profile/Profile";
import React, { useState } from "react";
import { Provider } from "react-redux";
import store from "./store";

library.add(fas);

function App() {
  const [token, setToken] = useState(null);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path={`profile`} element={<Profile />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
