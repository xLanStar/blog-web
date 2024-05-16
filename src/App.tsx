import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import { AUTH_VERIFY_URL } from "./data/reference";
import APIHelper from "./helper/APIHelper";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import UserProfile from "./pages/UserProfile";
import Signin from "./pages/auth/Signin";

const App: React.FunctionComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    APIHelper.get(AUTH_VERIFY_URL)
      .then(() => {
        console.log("User is signed in");
      })
      .catch(() => {
        console.log("User is not signed in");
        navigate("/signin", { replace: true });
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="user" element={<UserProfile />} />
      </Route>
      <Route path="/signin" element={<Signin />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};

export default App;
