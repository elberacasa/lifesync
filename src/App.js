import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BarChartIcon from '@mui/icons-material/BarChart';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import FlagIcon from '@mui/icons-material/Flag';
import NoteIcon from '@mui/icons-material/Note';
import GroupIcon from '@mui/icons-material/Group';
import { motion } from 'framer-motion';

import TaskManagement from './components/TaskManagement';
import Calendar from './components/Calendar';
import GroceryList from './components/GroceryList';
import Budget from './components/Budget';
import Expenses from './components/Expenses';
import Health from './components/Health';
import Goals from './components/Goals';
import Notes from './components/Notes';
import SplitBill from './components/SplitBill';
import SyncSage from './components/SyncSage';

const drawerWidth = 240;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1e1e1e',
        },
      },
    },
  },
});

function App() {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({
    health: { averageSteps: 5000 },
    budget: { savingsRate: 15 },
    // Add more user data as needed
  });
  const [healthData, setHealthData] = useState({
    steps: [],
    heartRate: [],
    sleepHours: [],
    calories: [],
  });

  useEffect(() => {
    const savedHealthData = localStorage.getItem('healthData');
    if (savedHealthData) {
      setHealthData(JSON.parse(savedHealthData));
    }
  }, []);

  const updateHealthData = (newData) => {
    setHealthData(newData);
    localStorage.setItem('healthData', JSON.stringify(newData));
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Tasks', icon: <AssignmentIcon />, path: '/tasks' },
    { text: 'Calendar', icon: <CalendarTodayIcon />, path: '/calendar' },
    { text: 'Grocery List', icon: <ShoppingCartIcon />, path: '/grocery' },
    { text: 'Budget', icon: <AttachMoneyIcon />, path: '/budget' },
    { text: 'Expenses', icon: <BarChartIcon />, path: '/expenses' },
    { text: 'Health', icon: <FitnessCenterIcon />, path: '/health' },
    { text: 'Goals', icon: <FlagIcon />, path: '/goals' },
    { text: 'Notes', icon: <NoteIcon />, path: '/notes' },
    { text: 'Split Bill', icon: <GroupIcon />, path: '/split-bill' },
    { text: 'SyncSage', icon: <GroupIcon />, path: '/sync-sage' },
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex' }}>
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ marginRight: 5, ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                LifeSync
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
              <List>
                {menuItems.map((item) => (
                  <ListItem key={item.text} disablePadding>
                    <ListItemButton component={Link} to={item.path}>
                      <ListItemIcon>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
            <Toolbar />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tasks" element={<TaskManagement />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/grocery" element={<GroceryList />} />
                <Route path="/budget" element={<Budget />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/health" element={<Health healthData={healthData} updateHealthData={updateHealthData} />} />
                <Route path="/goals" element={<Goals />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/split-bill" element={<SplitBill />} />
                <Route path="/sync-sage" element={<SyncSage userData={{ health: healthData }} />} />
              </Routes>
            </motion.div>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}


function Dashboard() {
  return (
    <Box sx={{ maxWidth: 'lg', mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to LifeSync
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 3, mt: 4 }}>
        {['Tasks', 'Calendar', 'Budget', 'Grocery List', 'Health', 'Goals'].map((item) => (
          <Box key={item} sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" gutterBottom>{item}</Typography>
            <Typography variant="body2">Quick summary of your {item.toLowerCase()} goes here.</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default App;