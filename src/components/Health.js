import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, TextField, Button, List, ListItem, ListItemText, IconButton, Grid, CircularProgress } from '@mui/material';
import { Add, Delete, Favorite, DirectionsRun, Restaurant, Sync } from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
}));

const Health = () => {
  const [healthData, setHealthData] = useState({
    steps: [],
    heartRate: [],
    sleepHours: [],
    calories: [],
  });
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    steps: '',
    heartRate: '',
    sleepHours: '',
    calories: '',
  });
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    const savedHealthData = localStorage.getItem('healthData');
    if (savedHealthData) {
      setHealthData(JSON.parse(savedHealthData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('healthData', JSON.stringify(healthData));
  }, [healthData]);

  const addEntry = (e) => {
    e.preventDefault();
    const updatedHealthData = { ...healthData };
    Object.keys(newEntry).forEach(key => {
      if (key !== 'date' && newEntry[key]) {
        updatedHealthData[key] = [
          ...updatedHealthData[key],
          { date: newEntry.date, value: parseFloat(newEntry[key]) }
        ];
      }
    });
    setHealthData(updatedHealthData);
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      steps: '',
      heartRate: '',
      sleepHours: '',
      calories: '',
    });
  };

  const simulateSync = () => {
    setSyncing(true);
    setTimeout(() => {
      const simulatedData = {
        steps: [...healthData.steps, { date: new Date().toISOString().split('T')[0], value: Math.floor(Math.random() * 5000) + 5000 }],
        heartRate: [...healthData.heartRate, { date: new Date().toISOString().split('T')[0], value: Math.floor(Math.random() * 30) + 60 }],
        sleepHours: [...healthData.sleepHours, { date: new Date().toISOString().split('T')[0], value: Math.floor(Math.random() * 4) + 5 }],
        calories: [...healthData.calories, { date: new Date().toISOString().split('T')[0], value: Math.floor(Math.random() * 500) + 1500 }],
      };
      setHealthData(simulatedData);
      setSyncing(false);
    }, 2000);
  };

  return (
    <Box sx={{ maxWidth: 'lg', mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ color: 'text.primary' }}>
        Health Tracker
      </Typography>
      <StyledPaper elevation={3}>
        <form onSubmit={addEntry} style={{ marginBottom: '1rem' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                label="Date"
                type="date"
                value={newEntry.date}
                onChange={(e) => setNewEntry({...newEntry, date: e.target.value})}
                fullWidth
                sx={{ bgcolor: 'background.default' }}
                InputLabelProps={{ shrink: true, sx: { color: 'text.secondary' } }}
                InputProps={{ sx: { color: 'text.primary' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                label="Steps"
                type="number"
                value={newEntry.steps}
                onChange={(e) => setNewEntry({...newEntry, steps: e.target.value})}
                fullWidth
                sx={{ bgcolor: 'background.default' }}
                InputLabelProps={{ sx: { color: 'text.secondary' } }}
                InputProps={{ sx: { color: 'text.primary' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                label="Heart Rate"
                type="number"
                value={newEntry.heartRate}
                onChange={(e) => setNewEntry({...newEntry, heartRate: e.target.value})}
                fullWidth
                sx={{ bgcolor: 'background.default' }}
                InputLabelProps={{ sx: { color: 'text.secondary' } }}
                InputProps={{ sx: { color: 'text.primary' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                label="Sleep Hours"
                type="number"
                value={newEntry.sleepHours}
                onChange={(e) => setNewEntry({...newEntry, sleepHours: e.target.value})}
                fullWidth
                sx={{ bgcolor: 'background.default' }}
                InputLabelProps={{ sx: { color: 'text.secondary' } }}
                InputProps={{ sx: { color: 'text.primary' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                label="Calories"
                type="number"
                value={newEntry.calories}
                onChange={(e) => setNewEntry({...newEntry, calories: e.target.value})}
                fullWidth
                sx={{ bgcolor: 'background.default' }}
                InputLabelProps={{ sx: { color: 'text.secondary' } }}
                InputProps={{ sx: { color: 'text.primary' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Button type="submit" variant="contained" startIcon={<Add />} fullWidth sx={{ height: '100%' }}>
                Add Entry
              </Button>
            </Grid>
          </Grid>
        </form>

        <Button 
          variant="contained" 
          color="secondary" 
          startIcon={syncing ? <CircularProgress size={20} /> : <Sync />}
          onClick={simulateSync}
          disabled={syncing}
          sx={{ mt: 2, mb: 4 }}
        >
          {syncing ? 'Syncing...' : 'Sync with iPhone'}
        </Button>

        {Object.entries(healthData).map(([key, data]) => (
          <Box key={key} sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        ))}
      </StyledPaper>
    </Box>
  );
};

export default Health;