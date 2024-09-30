import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, TextField, Button, List, ListItem, ListItemText, IconButton, Grid, Divider } from '@mui/material';
import { Add, Delete, Calculate } from '@mui/icons-material';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
}));

const SplitBill = () => {
  const [bill, setBill] = useState({ total: '', tax: '', tip: '' });
  const [people, setPeople] = useState([]);
  const [newPerson, setNewPerson] = useState('');
  const [splitAmount, setSplitAmount] = useState(0);

  useEffect(() => {
    calculateSplit();
  }, [bill, people]);

  const addPerson = (e) => {
    e.preventDefault();
    if (newPerson.trim()) {
      setPeople([...people, { id: Date.now(), name: newPerson }]);
      setNewPerson('');
    }
  };

  const removePerson = (id) => {
    setPeople(people.filter(person => person.id !== id));
  };

  const calculateSplit = () => {
    const total = parseFloat(bill.total) || 0;
    const tax = parseFloat(bill.tax) || 0;
    const tip = parseFloat(bill.tip) || 0;
    const totalWithTaxAndTip = total + tax + tip;
    const numberOfPeople = people.length;
    
    if (numberOfPeople > 0) {
      setSplitAmount((totalWithTaxAndTip / numberOfPeople).toFixed(2));
    } else {
      setSplitAmount(0);
    }
  };

  return (
    <Box sx={{ maxWidth: 'lg', mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ color: 'text.primary' }}>
        Split Bill
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <StyledPaper elevation={3}>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
              Bill Details
            </Typography>
            <TextField
              label="Total Bill"
              type="number"
              value={bill.total}
              onChange={(e) => setBill({ ...bill, total: e.target.value })}
              fullWidth
              margin="normal"
              sx={{ bgcolor: 'background.default' }}
              InputLabelProps={{ sx: { color: 'text.secondary' } }}
              InputProps={{ sx: { color: 'text.primary' } }}
            />
            <TextField
              label="Tax"
              type="number"
              value={bill.tax}
              onChange={(e) => setBill({ ...bill, tax: e.target.value })}
              fullWidth
              margin="normal"
              sx={{ bgcolor: 'background.default' }}
              InputLabelProps={{ sx: { color: 'text.secondary' } }}
              InputProps={{ sx: { color: 'text.primary' } }}
            />
            <TextField
              label="Tip"
              type="number"
              value={bill.tip}
              onChange={(e) => setBill({ ...bill, tip: e.target.value })}
              fullWidth
              margin="normal"
              sx={{ bgcolor: 'background.default' }}
              InputLabelProps={{ sx: { color: 'text.secondary' } }}
              InputProps={{ sx: { color: 'text.primary' } }}
            />
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper elevation={3}>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
              People
            </Typography>
            <form onSubmit={addPerson} style={{ marginBottom: '1rem' }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="Name"
                  value={newPerson}
                  onChange={(e) => setNewPerson(e.target.value)}
                  sx={{ flexGrow: 1, bgcolor: 'background.default' }}
                  InputLabelProps={{ sx: { color: 'text.secondary' } }}
                  InputProps={{ sx: { color: 'text.primary' } }}
                />
                <Button type="submit" variant="contained" startIcon={<Add />}>
                  Add
                </Button>
              </Box>
            </form>
            <List>
              {people.map((person) => (
                <ListItem key={person.id} sx={{ bgcolor: 'background.default', mb: 1, borderRadius: 1 }}>
                  <ListItemText 
                    primary={person.name}
                    primaryTypographyProps={{ sx: { color: 'text.primary' } }}
                  />
                  <IconButton edge="end" aria-label="delete" onClick={() => removePerson(person.id)}>
                    <Delete />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </StyledPaper>
        </Grid>
      </Grid>
      <StyledPaper elevation={3} sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom sx={{ color: 'text.primary' }}>
          Split Amount
        </Typography>
        <Typography variant="h4" sx={{ color: 'primary.main' }}>
          ${splitAmount} per person
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Total people: {people.length}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Total bill (including tax and tip): ${(parseFloat(bill.total) + parseFloat(bill.tax) + parseFloat(bill.tip)).toFixed(2)}
        </Typography>
      </StyledPaper>
    </Box>
  );
};

export default SplitBill;