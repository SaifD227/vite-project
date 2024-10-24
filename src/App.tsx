import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import { useState } from "react";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/table" />
              ) : (
                <UserForm onLoginSuccess={handleLoginSuccess} />
              )
            }
          />
          <Route
            path="/table"
            element={isLoggedIn ? <UserTable /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
