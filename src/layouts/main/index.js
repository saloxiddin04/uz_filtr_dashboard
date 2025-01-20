import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import MDBox from "components/MDBox";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import routes from "../../routes";
import { setMiniSidenav, setOpenConfigurator, useMaterialUIController } from "../../context";

const MainLayout = () => {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };
  
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };
  
  return (
    <>
      <CssBaseline />
      <Sidenav
        color={sidenavColor}
        brand={(transparentSidenav && !darkMode) || whiteSidenav ? '' : ''}
        brandName="Uz Filtr Dashboard"
        routes={routes}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
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
};

export default MainLayout;
