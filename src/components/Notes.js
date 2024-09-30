import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, TextField, Button, List, ListItem, ListItemText, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Add, Delete, Edit, Save } from '@mui/icons-material';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
}));

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editingNote, setEditingNote] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (e) => {
    e.preventDefault();
    if (newNote.trim()) {
      setNotes([...notes, { id: Date.now(), content: newNote }]);
      setNewNote('');
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const startEditing = (note) => {
    setEditingNote(note);
    setOpenDialog(true);
  };

  const saveEdit = () => {
    setNotes(notes.map(note => note.id === editingNote.id ? editingNote : note));
    setOpenDialog(false);
    setEditingNote(null);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setEditingNote(null);
  };

  return (
    <Box sx={{ maxWidth: 'lg', mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ color: 'text.primary' }}>
        Notes
      </Typography>
      <StyledPaper elevation={3}>
        <form onSubmit={addNote} style={{ marginBottom: '1rem' }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="New Note"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              sx={{ flexGrow: 1, bgcolor: 'background.default' }}
              InputLabelProps={{ sx: { color: 'text.secondary' } }}
              InputProps={{ sx: { color: 'text.primary' } }}
              multiline
              rows={3}
            />
            <Button type="submit" variant="contained" startIcon={<Add />}>
              Add Note
            </Button>
          </Box>
        </form>

        <List>
          {notes.map((note) => (
            <ListItem key={note.id} sx={{ bgcolor: 'background.default', mb: 1, borderRadius: 1 }}>
              <ListItemText 
                primary={note.content}
                primaryTypographyProps={{ sx: { color: 'text.primary' } }}
              />
              <IconButton onClick={() => startEditing(note)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => deleteNote(note.id)}>
                <Delete />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </StyledPaper>

      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle sx={{ color: 'text.primary' }}>Edit Note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Note Content"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={editingNote ? editingNote.content : ''}
            onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
            sx={{ bgcolor: 'background.default' }}
            InputLabelProps={{ sx: { color: 'text.secondary' } }}
            InputProps={{ sx: { color: 'text.primary' } }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: 'text.secondary' }}>Cancel</Button>
          <Button onClick={saveEdit} startIcon={<Save />}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Notes;