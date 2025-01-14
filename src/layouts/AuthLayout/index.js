import { Outlet } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

const AuthLayout = () => (
  <>
    <CssBaseline />
    <Outlet />
  </>
);

export default AuthLayout;
