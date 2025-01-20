import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

// Data
import { useDispatch, useSelector } from "react-redux";
import { createCategory, getAllCategories } from "../../redux/categories/categorySlice";
import MDButton from "../../components/MDButton";
import { Modal, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MDInput from "../../components/MDInput";
import { toast } from "react-toastify";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function Category() {
  const theme = useTheme()
  const dispatch = useDispatch()
  
  const {loading, categories} = useSelector((state) => state.category)
  
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState(0)
  
  const [name, setName] = useState(null)
  
  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch]);
  
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)
  
  const columns = [
    { Header: "ID", accessor: "id", align: "left" },
    { Header: "Name", accessor: "name", align: "left" },
    // { Header: "Email", accessor: "email", align: "left" },
    // { Header: "Actions", accessor: "actions", align: "center" },
  ];
  
  const rows = categories?.map(category => ({
    id: category?.id,
    name: category?.name,
  })) || [];
  
  const handleChangeTab = (event, newValue) => {
    setTab(newValue)
  }
  
  const handleCreateCategory = () => {
    if (!name) return toast.error('All inputs requires')
    
    dispatch(createCategory({ name, parent: '' })).then(({payload}) => {
      if (payload?.id) {
        toast.success('Created')
        dispatch(getAllCategories())
        handleClose()
        setName(null)
      }
    }).catch((e) => console.log(e.message))
  }
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {loading ? <p>Loading...</p> :
        <MDBox pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <MDBox display="flex" justifyContent="flex-end" mt={1}>
                <MDButton onClick={handleOpen} variant="gradient" color="info">
                  Create category
                </MDButton>
              </MDBox>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    Categories Table
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      }
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create category
          </Typography>
          <Grid item xs={12}>
            <Card>
              <AppBar position="static">
                <Tabs
                  value={tab}
                  onChange={handleChangeTab}
                  indicatorColor="secondary"
                  textColor="inherit"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                >
                  <Tab label="Parent category" />
                  <Tab label="Child category" />
                </Tabs>
              </AppBar>
              <TabPanel value={tab} index={0} dir={theme.direction}>
                <MDBox p={3}>
                  <MDInput
                    value={name || ""}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    label="Category name"
                    fullWidth
                  />
                  
                  <MDBox pt={2} display="flex" justifyContent="flex-end">
                    <MDButton pt={2} onClick={handleCreateCategory} variant="gradient" color="info">
                      Create category
                    </MDButton>
                  </MDBox>
                </MDBox>
              </TabPanel>
              <TabPanel value={tab} index={1} dir={theme.direction}>
                Item Two
              </TabPanel>
            </Card>
          </Grid>
        </Box>
      </Modal>
    </DashboardLayout>
  );
}

export default Category;
