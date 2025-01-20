import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";
import themeDark from "assets/theme-dark";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import MainLayout from "./layouts/main/index.js";
import AuthLayout from "layouts/AuthLayout";
import routes from "routes";
import SignIn from "./layouts/authentication/sign-in";
import { useMaterialUIController } from "./context";
import { useSelector } from "react-redux";

export default function App() {
  const [controller] = useMaterialUIController();
  const {
    darkMode,
  } = controller;
  
  const {loading, access_token} = useSelector(state => state.user)

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });
  
  if (loading) return <p>Loading...</p>

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <Routes>
        {
          access_token ? <Route element={<ProtectedRoutes/>}>
            <Route element={<MainLayout />}>
              {getRoutes(routes)}
              <Route path="/login" element={<Navigate to={'/dashboard'}/> } />
              <Route path="/" element={<Navigate to={'/dashboard'}/> } />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Route>
          </Route> : <Route element={<AuthLayout />}>
            <Route path="/login" element={<SignIn />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Route>
          
        }
      </Routes>
    </ThemeProvider>
  );
}
