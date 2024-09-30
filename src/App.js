import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from 'react-router-dom';
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
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

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
  },
});

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
  { text: 'SyncSage', icon: <DashboardIcon />, path: '/sync-sage' },
];


function Dashboard() {
  const navigate = useNavigate();

  const summaries = [
    { title: 'Tasks', description: 'Manage your to-do list', path: '/tasks', icon: <AssignmentIcon /> },
    { title: 'Calendar', description: 'View and plan your schedule', path: '/calendar', icon: <CalendarTodayIcon /> },
    { title: 'Grocery List', description: 'Keep track of shopping items', path: '/grocery', icon: <ShoppingCartIcon /> },
    { title: 'Budget', description: 'Plan and track your finances', path: '/budget', icon: <AttachMoneyIcon /> },
    { title: 'Expenses', description: 'Monitor your spending', path: '/expenses', icon: <BarChartIcon /> },
    { title: 'Health', description: 'Track your fitness and wellbeing', path: '/health', icon: <FitnessCenterIcon /> },
    { title: 'Goals', description: 'Set and achieve your objectives', path: '/goals', icon: <FlagIcon /> },
    { title: 'Notes', description: 'Jot down your thoughts', path: '/notes', icon: <NoteIcon /> },
    { title: 'Split Bill', description: 'Divide expenses with friends', path: '/split-bill', icon: <GroupIcon /> },
    { title: 'SyncSage', description: 'Your AI assistant', path: '/sync-sage', icon: <DashboardIcon /> },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to LifeSync
      </Typography>
      <Grid container spacing={3}>
        {summaries.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.title}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  {React.cloneElement(item.icon, { sx: { mr: 1 } })}
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => navigate(item.path)}>Go to {item.title}</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

function App() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex' }}>
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="toggle drawer"
                onClick={toggleDrawer}
                edge="start"
                sx={{ marginRight: 5 }}
              >
                {open ? <ChevronLeftIcon /> : <MenuIcon />}
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                LifeSync
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { 
                width: drawerWidth, 
                boxSizing: 'border-box',
                left: open ? 0 : -drawerWidth,
                transition: 'left 0.3s ease-in-out'
              },
            }}
            open={open}
          >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
              <List>
                {menuItems.map((item) => (
                  <ListItem key={item.text} disablePadding>
                    <ListItemButton component={Link} to={item.path} onClick={toggleDrawer}>
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
                <Route path="/health" element={<Health />} />
                <Route path="/goals" element={<Goals />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/split-bill" element={<SplitBill />} />
                <Route path="/sync-sage" element={<SyncSage />} />
              </Routes>
            </motion.div>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;