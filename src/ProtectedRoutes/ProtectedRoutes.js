import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoutes = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

ProtectedRoutes.propTypes = {
  children: PropTypes.node.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default ProtectedRoutes;
