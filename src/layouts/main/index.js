import { Outlet } from "react-router-dom";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import MDBox from "components/MDBox";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import PropTypes from "prop-types";
import routes from "../../routes";

const MainLayout = ({
  sidenavColor,
  transparentSidenav,
  whiteSidenav,
  darkMode,
  brandWhite,
  brandDark,
  onMouseEnter,
  onMouseLeave,
  handleConfiguratorOpen,
}) => (
  <>
    <CssBaseline />
    <Sidenav
      color={sidenavColor}
      brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
      brandName="Material Dashboard 2"
      routes={routes}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
    <Configurator />
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
    <Outlet />
  </>
);

MainLayout.propTypes = {
  sidenavColor: PropTypes.string.isRequired,
  transparentSidenav: PropTypes.bool.isRequired,
  whiteSidenav: PropTypes.bool.isRequired,
  darkMode: PropTypes.bool.isRequired,
  brandWhite: PropTypes.string.isRequired,
  brandDark: PropTypes.string.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  handleConfiguratorOpen: PropTypes.func.isRequired,
};

export default MainLayout;
