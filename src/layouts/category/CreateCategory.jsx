import React from "react";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import Grid from "@mui/material/Grid";
import MDBox from "../../components/MDBox";
import Card from "@mui/material/Card";
import MDInput from "../../components/MDInput";
// import DataTable from "../../examples/Tables/DataTable";

const CreateCategory = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox p={3}>
                <MDInput variant="outlined" label="Type here..." />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
};

export default CreateCategory;