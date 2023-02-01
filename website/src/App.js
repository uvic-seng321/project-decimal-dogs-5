import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";
import { Header } from "./components/Header";
import { logInWithEmailAndPassword } from "./firebase";
import Login from "./components/Login";
import Register from "./components/Register";
import Reset from "./components/Reset";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="bg-white">
      {/* <Header/> */}
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
