// import { useState, useEffect, useMemo } from "react";
//
// import { Routes, Route, Navigate, useLocation } from "react-router-dom";
//
// // @mui material components
// import { ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
// import Icon from "@mui/material/Icon";
//
// // Material Dashboard 2 React components
// import MDBox from "components/MDBox";
//
// // Material Dashboard 2 React example components
// import Sidenav from "examples/Sidenav";
// import Configurator from "examples/Configurator";
//
// // Material Dashboard 2 React themes
// import theme from "assets/theme";
// import themeRTL from "assets/theme/theme-rtl";
//
// // Material Dashboard 2 React Dark Mode themes
// import themeDark from "assets/theme-dark";
// import themeDarkRTL from "assets/theme-dark/theme-rtl";
//
// // RTL plugins
// import rtlPlugin from "stylis-plugin-rtl";
// import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";
//
// // Material Dashboard 2 React routes
// import routes from "routes";
//
// // Material Dashboard 2 React contexts
// import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
//
// // Images
// import brandWhite from "assets/images/logo-ct.png";
// import brandDark from "assets/images/logo-ct-dark.png";
//
// export default function App() {
//   const [controller, dispatch] = useMaterialUIController();
//   const {
//     miniSidenav,
//     direction,
//     layout,
//     openConfigurator,
//     sidenavColor,
//     transparentSidenav,
//     whiteSidenav,
//     darkMode,
//   } = controller;
//   const [onMouseEnter, setOnMouseEnter] = useState(false);
//   const [rtlCache, setRtlCache] = useState(null);
//   const { pathname } = useLocation();
//
//   // Cache for the rtl
//   useMemo(() => {
//     const cacheRtl = createCache({
//       key: "rtl",
//       stylisPlugins: [rtlPlugin],
//     });
//
//     setRtlCache(cacheRtl);
//   }, []);
//
//   // Open sidenav when mouse enter on mini sidenav
//   const handleOnMouseEnter = () => {
//     if (miniSidenav && !onMouseEnter) {
//       setMiniSidenav(dispatch, false);
//       setOnMouseEnter(true);
//     }
//   };
//
//   // Close sidenav when mouse leave mini sidenav
//   const handleOnMouseLeave = () => {
//     if (onMouseEnter) {
//       setMiniSidenav(dispatch, true);
//       setOnMouseEnter(false);
//     }
//   };
//
//   // Change the openConfigurator state
//   const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
//
//   // Setting the dir attribute for the body element
//   useEffect(() => {
//     document.body.setAttribute("dir", direction);
//   }, [direction]);
//
//   // Setting page scroll to 0 when changing the route
//   useEffect(() => {
//     document.documentElement.scrollTop = 0;
//     document.scrollingElement.scrollTop = 0;
//   }, [pathname]);
//
//   const getRoutes = (allRoutes) =>
//     allRoutes.map((route) => {
//       if (route.collapse) {
//         return getRoutes(route.collapse);
//       }
//
//       if (route.route) {
//         return <Route exact path={route.route} element={route.component} key={route.key} />;
//       }
//
//       return null;
//     });
//
//   const configsButton = (
//     <MDBox
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       width="3.25rem"
//       height="3.25rem"
//       bgColor="white"
//       shadow="sm"
//       borderRadius="50%"
//       position="fixed"
//       right="2rem"
//       bottom="2rem"
//       zIndex={99}
//       color="dark"
//       sx={{ cursor: "pointer" }}
//       onClick={handleConfiguratorOpen}
//     >
//       <Icon fontSize="small" color="inherit">
//         settings
//       </Icon>
//     </MDBox>
//   );
//
//   return direction === "rtl" ? (
//     <CacheProvider value={rtlCache}>
//       <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
//         <CssBaseline />
//         {layout === "dashboard" && (
//           <>
//             <Sidenav
//               color={sidenavColor}
//               brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
//               brandName="Material Dashboard 2"
//               routes={routes}
//               onMouseEnter={handleOnMouseEnter}
//               onMouseLeave={handleOnMouseLeave}
//             />
//             <Configurator />
//             {configsButton}
//           </>
//         )}
//         {layout === "vr" && <Configurator />}
//         <Routes>
//           {getRoutes(routes)}
//           <Route path="*" element={<Navigate to="/dashboard" />} />
//         </Routes>
//       </ThemeProvider>
//     </CacheProvider>
//   ) : (
//     <ThemeProvider theme={darkMode ? themeDark : theme}>
//       <CssBaseline />
//       {layout === "dashboard" && (
//         <>
//           <Sidenav
//             color={sidenavColor}
//             brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
//             brandName="Material Dashboard 2"
//             routes={routes}
//             onMouseEnter={handleOnMouseEnter}
//             onMouseLeave={handleOnMouseLeave}
//           />
//           <Configurator />
//           {configsButton}
//         </>
//       )}
//       {layout === "vr" && <Configurator />}
//       <Routes>
//         {getRoutes(routes)}
//         <Route path="*" element={<Navigate to="/dashboard" />} />
//       </Routes>
//     </ThemeProvider>
//   );
// }

import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";
import themeDark from "assets/theme-dark";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import MainLayout from "./layouts/main/index.js";
import AuthLayout from "layouts/AuthLayout";
import routes from "routes";
import SignIn from "./layouts/authentication/sign-in";
import SignUp from "./layouts/authentication/sign-up";
import { setOpenConfigurator, useMaterialUIController, setMiniSidenav } from "./context";
import { useState } from "react";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const isAuthenticated = true;
  const layout = "dashboard";

  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

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
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route
          element={
            <ProtectedRoutes isAuthenticated={isAuthenticated}>
              <MainLayout
                sidenavColor={sidenavColor}
                transparentSidenav={transparentSidenav}
                whiteSidenav={whiteSidenav}
                darkMode={darkMode}
                brandWhite=""
                brandDark=""
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
                handleConfiguratorOpen={handleConfiguratorOpen}
                layout={layout}
              />
            </ProtectedRoutes>
          }
        >
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
