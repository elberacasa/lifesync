import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, TextField, Button, List, ListItem, ListItemText, IconButton, Checkbox, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Add, Delete, ShoppingCart } from '@mui/icons-material';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
}));

const categories = ['Produce', 'Dairy', 'Bakery', 'Meat', 'Pantry', 'Frozen', 'Other'];

const GroceryList = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', category: 'Other', quantity: 1 });

  useEffect(() => {
    const savedItems = localStorage.getItem('groceryList');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('groceryList', JSON.stringify(items));
  }, [items]);

  const addItem = (e) => {
    e.preventDefault();
    if (newItem.name.trim()) {
      setItems([...items, { ...newItem, id: Date.now(), purchased: false }]);
      setNewItem({ name: '', category: 'Other', quantity: 1 });
    }
  };

  const togglePurchased = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, purchased: !item.purchased } : item
    ));
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    ));
  };

  return (
    <Box sx={{ maxWidth: 'lg', mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ color: 'text.primary' }}>
        Grocery List
      </Typography>
      <StyledPaper elevation={3}>
        <form onSubmit={addItem} style={{ marginBottom: '1rem' }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Item Name"
              value={newItem.name}
              onChange={(e) => setNewItem({...newItem, name: e.target.value})}
              sx={{ flexGrow: 1, bgcolor: 'background.default' }}
              InputLabelProps={{ sx: { color: 'text.secondary' } }}
              InputProps={{ sx: { color: 'text.primary' } }}
            />
            <TextField
              label="Quantity"
              type="number"
              value={newItem.quantity}
              onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value)})}
              sx={{ width: '100px', bgcolor: 'background.default' }}
              InputLabelProps={{ sx: { color: 'text.secondary' } }}
              InputProps={{ sx: { color: 'text.primary' } }}
            />
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel sx={{ color: 'text.secondary' }}>Category</InputLabel>
              <Select
                value={newItem.category}
                onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                sx={{ bgcolor: 'background.default', color: 'text.primary' }}
              >
                {categories.map(category => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" startIcon={<Add />}>
              Add Item
            </Button>
          </Box>
        </form>

        {categories.map(category => {
          const categoryItems = items.filter(item => item.category === category);
          if (categoryItems.length === 0) return null;
          return (
            <Box key={category} sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'text.primary', mt: 2 }}>
                {category}
              </Typography>
              <List>
                {categoryItems.map((item) => (
                  <ListItem 
                    key={item.id} 
                    sx={{ 
                      bgcolor: 'background.default', 
                      mb: 1, 
                      borderRadius: 1,
                      textDecoration: item.purchased ? 'line-through' : 'none'
                    }}
                  >
                    <Checkbox
                      checked={item.purchased}
                      onChange={() => togglePurchased(item.id)}
                      sx={{ color: 'text.secondary' }}
                    />
                    <ListItemText 
                      primary={`${item.name} (${item.quantity})`}
                      primaryTypographyProps={{ sx: { color: 'text.primary' } }}
                    />
                    <TextField
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      sx={{ width: '60px', mr: 1, bgcolor: 'background.paper' }}
                      InputProps={{ sx: { color: 'text.primary' } }}
                    />
                    <IconButton edge="end" aria-label="delete" onClick={() => deleteItem(item.id)}>
                      <Delete />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          );
        })}
      </StyledPaper>
    </Box>
  );
};

export default GroceryList;