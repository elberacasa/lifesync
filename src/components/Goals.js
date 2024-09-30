import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, LinearProgress } from '@mui/material';
import { Add, Delete, Edit, Check } from '@mui/icons-material';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
}));

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({ title: '', description: '', progress: 0 });
  const [editingGoal, setEditingGoal] = useState(null);

  useEffect(() => {
    const savedGoals = localStorage.getItem('goals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  const addGoal = (e) => {
    e.preventDefault();
    if (newGoal.title) {
      setGoals([...goals, { ...newGoal, id: Date.now() }]);
      setNewGoal({ title: '', description: '', progress: 0 });
    }
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const startEditing = (goal) => {
    setEditingGoal(goal);
  };

  const saveEdit = () => {
    setGoals(goals.map(goal => goal.id === editingGoal.id ? editingGoal : goal));
    setEditingGoal(null);
  };

  const updateProgress = (id, newProgress) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, progress: Math.min(100, Math.max(0, newProgress)) } : goal
    ));
  };

  return (
    <Box sx={{ maxWidth: 'lg', mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ color: 'text.primary' }}>
        Goals Tracker
      </Typography>
      <StyledPaper elevation={3}>
        <form onSubmit={addGoal} style={{ marginBottom: '1rem' }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Goal title"
              value={newGoal.title}
              onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
              sx={{ flexGrow: 1, bgcolor: 'background.default' }}
              InputLabelProps={{ sx: { color: 'text.secondary' } }}
              InputProps={{ sx: { color: 'text.primary' } }}
            />
            <TextField
              label="Description"
              value={newGoal.description}
              onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
              sx={{ flexGrow: 1, bgcolor: 'background.default' }}
              InputLabelProps={{ sx: { color: 'text.secondary' } }}
              InputProps={{ sx: { color: 'text.primary' } }}
            />
            <Button type="submit" variant="contained" startIcon={<Add />}>
              Add Goal
            </Button>
          </Box>
        </form>

        <List>
          {goals.map((goal) => (
            <ListItem key={goal.id} sx={{ bgcolor: 'background.default', mb: 1, borderRadius: 1, flexDirection: 'column', alignItems: 'stretch' }}>
              {editingGoal && editingGoal.id === goal.id ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 1 }}>
                  <TextField
                    value={editingGoal.title}
                    onChange={(e) => setEditingGoal({...editingGoal, title: e.target.value})}
                    sx={{ bgcolor: 'background.paper' }}
                    InputProps={{ sx: { color: 'text.primary' } }}
                  />
                  <TextField
                    value={editingGoal.description}
                    onChange={(e) => setEditingGoal({...editingGoal, description: e.target.value})}
                    sx={{ bgcolor: 'background.paper' }}
                    InputProps={{ sx: { color: 'text.primary' } }}
                  />
                  <Button onClick={saveEdit} variant="contained" startIcon={<Check />}>
                    Save
                  </Button>
                </Box>
              ) : (
                <>
                  <ListItemText 
                    primary={goal.title} 
                    secondary={goal.description}
                    primaryTypographyProps={{ sx: { color: 'text.primary' } }}
                    secondaryTypographyProps={{ sx: { color: 'text.secondary' } }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mt: 1 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={goal.progress} 
                      sx={{ flexGrow: 1, mr: 2 }} 
                    />
                    <Typography sx={{ color: 'text.primary' }}>{goal.progress}%</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 1 }}>
                    <Button 
                      onClick={() => updateProgress(goal.id, goal.progress - 10)}
                      variant="outlined"
                      size="small"
                    >
                      -10%
                    </Button>
                    <Button 
                      onClick={() => updateProgress(goal.id, goal.progress + 10)}
                      variant="outlined"
                      size="small"
                    >
                      +10%
                    </Button>
                    <IconButton onClick={() => startEditing(goal)}>
                      <Edit />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => deleteGoal(goal.id)}>
                      <Delete />
                    </IconButton>
                  </Box>
                </>
              )}
            </ListItem>
          ))}
        </List>
      </StyledPaper>
    </Box>
  );
};

export default Goals;