import React, { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetail, login, setAccess, setRefresh, setUser } from "../../../redux/auth/authSlice";

function Basic() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [phone_number, setPhoneNumber] = useState("+998");
  const [password, setPassword] = useState(null);
  
  const handlePhone = (e) => {
    const inputValue = e.target.value;
    
    if (inputValue.startsWith("+998")) {
      const sanitizedValue = inputValue.replace(/[^\d+]/g, "");
      setPhoneNumber(sanitizedValue?.trim());
    }
  };
  
  const handleLogin = (e) => {
    e.preventDefault();
    if (!phone_number || !password) return;
    
    dispatch(login({ phone_number, password })).then(({ payload }) => {
      if (payload?.access && payload?.refresh_token) {
        dispatch(setAccess(payload));
        dispatch(setRefresh(payload));
        
        // Fetch user details
        dispatch(getUserDetail()).then((res) => {
          if (res?.payload) {
            dispatch(setUser(res.payload));
            navigate("/dashboard");
          } else {
            console.error("Failed to fetch user details");
          }
        });
      } else {
        console.error("Login failed: No access token or refresh token received");
      }
    })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };
  
  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                value={phone_number || ""}
                onChange={handlePhone}
                type="text"
                label="Phone Number"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                label="Password" fullWidth
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton onClick={handleLogin} variant="gradient" color="info" fullWidth>
                sign in
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
