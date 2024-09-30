import React, { useState, useEffect } from 'react';
import { AttachMoney, Add, Delete, TrendingUp, TrendingDown } from '@mui/icons-material';
import { Box, Typography, Paper, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
}));

const Budget = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ name: '', amount: '', category: 'Other' });
  const [categoryTotals, setCategoryTotals] = useState({});

  useEffect(() => {
    const totals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + Number(expense.amount);
      return acc;
    }, {});
    setCategoryTotals(totals);
  }, [expenses]);

  const addExpense = (e) => {
    e.preventDefault();
    if (newExpense.name && newExpense.amount) {
      setExpenses([...expenses, { ...newExpense, id: Date.now() }]);
      setNewExpense({ name: '', amount: '', category: 'Other' });
    }
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const balance = income - totalExpenses;

  return (
    <Box sx={{ maxWidth: 'lg', mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ color: 'text.primary' }}>
        Budget Planner
      </Typography>
      <StyledPaper elevation={3}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
            Monthly Income
          </Typography>
          <TextField
            fullWidth
            type="number"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            InputProps={{
              startAdornment: <AttachMoney />,
              sx: { color: 'text.primary' }
            }}
            sx={{ bgcolor: 'background.default' }}
          />
        </Box>

        <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
          Expenses
        </Typography>
        <form onSubmit={addExpense} style={{ marginBottom: '1rem' }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Expense name"
              value={newExpense.name}
              onChange={(e) => setNewExpense({...newExpense, name: e.target.value})}
              sx={{ flexGrow: 1, bgcolor: 'background.default' }}
              InputLabelProps={{ sx: { color: 'text.secondary' } }}
              InputProps={{ sx: { color: 'text.primary' } }}
            />
            <TextField
              label="Amount"
              type="number"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
              sx={{ width: '30%', bgcolor: 'background.default' }}
              InputLabelProps={{ sx: { color: 'text.secondary' } }}
              InputProps={{ sx: { color: 'text.primary' } }}
            />
            <FormControl sx={{ width: '30%' }}>
              <InputLabel sx={{ color: 'text.secondary' }}>Category</InputLabel>
              <Select
                value={newExpense.category}
                onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                sx={{ bgcolor: 'background.default', color: 'text.primary' }}
              >
                <MenuItem value="Housing">Housing</MenuItem>
                <MenuItem value="Transportation">Transportation</MenuItem>
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Utilities">Utilities</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" startIcon={<Add />}>
              Add
            </Button>
          </Box>
        </form>

        <List>
          {expenses.map((expense) => (
            <ListItem key={expense.id} sx={{ bgcolor: 'background.default', mb: 1, borderRadius: 1 }}>
              <ListItemText 
                primary={expense.name} 
                secondary={expense.category}
                primaryTypographyProps={{ sx: { color: 'text.primary' } }}
                secondaryTypographyProps={{ sx: { color: 'text.secondary' } }}
              />
              <Typography sx={{ color: 'text.primary', mr: 2 }}>${expense.amount}</Typography>
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => deleteExpense(expense.id)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>Summary</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography sx={{ color: 'text.primary' }}>Total Income:</Typography>
            <Typography sx={{ color: 'success.main' }}>${income}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography sx={{ color: 'text.primary' }}>Total Expenses:</Typography>
            <Typography sx={{ color: 'error.main' }}>${totalExpenses}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ color: 'text.primary' }}>Balance:</Typography>
            <Typography sx={{ color: balance >= 0 ? 'success.main' : 'error.main' }}>
              ${balance} {balance >= 0 ? <TrendingUp /> : <TrendingDown />}
            </Typography>
          </Box>
        </Box>
      </StyledPaper>
    </Box>
  );
};

export default Budget;