import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useStore } from 'effector-react';
import { CostsPage } from "./components/CostsPage/CostsPage";
import LoginPage from "./components/LoginPage/LoginPage";
import { RegistrationPage } from "./components/RegistrationPage/RegistrationPage";
import { $auth, setAuth, setAuthData } from './context/auth';
import { Header } from "./components/Header/Header";
import { Alert } from "./components/Alert/Alert";
import { $alert } from "./context/alert";
import { getAuthDataFromLS, removeUser } from "./utils/auth";

function App() {
  const loggedIn = useStore($auth);
  const alert = useStore($alert);

  useEffect(() => {
    const auth = getAuthDataFromLS();

    if (!auth || !auth.access_token || !auth.refresh_token) {
      setAuth(false);
      removeUser();
    } else {
      setAuthData(auth.username);
      setAuth(true);
    }
  }, [])
  
  return (
   <>
     <Header />
     {alert.alertText && <Alert props={alert}  />}
      <Router>
        <Routes>
          <Route path="/registration" element={loggedIn ? <Navigate to="/costs" /> : <RegistrationPage />} />
          <Route path="/login" element={loggedIn ? <Navigate to="/costs" /> : <LoginPage />} />
          <Route path="/costs" element={loggedIn ? <CostsPage /> : <Navigate to="/login" />} />
          <Route path="/" element={loggedIn ? <Navigate to="/costs" /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
   </>
  );
}

export default App;
