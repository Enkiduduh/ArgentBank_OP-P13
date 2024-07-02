import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./Pages/Index/Index";
import Sign_in from "./Pages/Sign-In/Sign_in";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Error from "./Pages/Error/Error"
import Profil from "./Pages/Profil/Profil";

library.add(fas)

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Sign_in />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
