import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { Box, Paper, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, FormControl, InputLabel, Chip } from '@mui/material';
import { styled } from '@mui/system';
import { format } from 'date-fns';

const StyledCalendarWrapper = styled(Box)(({ theme }) => ({
  '& .fc': {
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.text.primary,
  },
  '& .fc .fc-toolbar-title': {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  '& .fc .fc-button': {
    backgroundColor: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      borderColor: theme.palette.primary.dark,
    },
  },
  '& .fc .fc-day-today': {
    backgroundColor: theme.palette.action.selected,
  },
  '& .fc .fc-event': {
    cursor: 'pointer',
    borderRadius: '4px',
  },
  '& .fc-theme-standard td, & .fc-theme-standard th': {
    borderColor: theme.palette.divider,
  },
  '& .fc-scrollgrid': {
    borderColor: theme.palette.divider,
  },
  '& .fc-col-header-cell': {
    backgroundColor: theme.palette.background.paper,
  },
}));

const eventCategories = [
  { name: 'Work', color: '#4285F4' },
  { name: 'Personal', color: '#EA4335' },
  { name: 'Family', color: '#FBBC05' },
  { name: 'Health', color: '#34A853' },
  { name: 'Other', color: '#9E9E9E' },
];

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '', category: 'Other', description: '' });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const calendarRef = useRef(null);

  useEffect(() => {
    // Load events from localStorage on component mount
    const savedEvents = localStorage.getItem('calendarEvents');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  useEffect(() => {
    // Save events to localStorage whenever they change
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const handleDateClick = (arg) => {
    setNewEvent({ ...newEvent, start: arg.dateStr, end: arg.dateStr });
    setOpenDialog(true);
  };

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setNewEvent({ title: '', start: '', end: '', category: 'Other', description: '' });
    setSelectedEvent(null);
  };

  const handleAddOrUpdateEvent = () => {
    if (newEvent.title && newEvent.start && newEvent.end) {
      if (selectedEvent) {
        // Update existing event
        const updatedEvents = events.map(event => 
          event.id === selectedEvent.id ? { ...newEvent, id: selectedEvent.id } : event
        );
        setEvents(updatedEvents);
      } else {
        // Add new event
        setEvents([...events, { ...newEvent, id: Date.now().toString() }]);
      }
      handleDialogClose();
    }
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents(events.filter(event => event.id !== selectedEvent.id));
      handleDialogClose();
    }
  };

  return (
    <Box sx={{ maxWidth: 'lg', mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ color: 'text.primary' }}>
        Calendar
      </Typography>
      <Paper elevation={3} sx={{ p: 2, mt: 2, bgcolor: 'background.paper' }}>
        <StyledCalendarWrapper>
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
            }}
            events={events.map(event => ({
              ...event,
              backgroundColor: eventCategories.find(cat => cat.name === event.category)?.color,
              borderColor: eventCategories.find(cat => cat.name === event.category)?.color,
            }))}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            height="auto"
            nowIndicator={true}
            weekNumbers={true}
            selectable={true}
          />
        </StyledCalendarWrapper>
      </Paper>

      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth PaperProps={{ sx: { bgcolor: 'background.paper' } }}>
        <DialogTitle sx={{ color: 'text.primary' }}>{selectedEvent ? 'Edit Event' : 'Add New Event'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Event Title"
            type="text"
            fullWidth
            value={selectedEvent ? selectedEvent.title : newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            InputLabelProps={{ sx: { color: 'text.secondary' } }}
            InputProps={{ sx: { color: 'text.primary' } }}
          />
          <TextField
            margin="dense"
            label="Start Date"
            type="datetime-local"
            fullWidth
            value={selectedEvent ? format(new Date(selectedEvent.start), "yyyy-MM-dd'T'HH:mm") : newEvent.start}
            onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="End Date"
            type="datetime-local"
            fullWidth
            value={selectedEvent ? format(new Date(selectedEvent.end), "yyyy-MM-dd'T'HH:mm") : newEvent.end}
            onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel sx={{ color: 'text.secondary' }}>Category</InputLabel>
            <Select
              value={selectedEvent ? selectedEvent.category : newEvent.category}
              onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
              sx={{ color: 'text.primary' }}
            >
              {eventCategories.map((category) => (
                <MenuItem key={category.name} value={category.name}>
                  <Chip
                    size="small"
                    label={category.name}
                    style={{ backgroundColor: category.color, color: 'white', marginRight: 8 }}
                  />
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={selectedEvent ? selectedEvent.description : newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          {selectedEvent && (
            <Button onClick={handleDeleteEvent} color="error">
              Delete
            </Button>
          )}
          <Button onClick={handleDialogClose} sx={{ color: 'text.secondary' }}>Cancel</Button>
          <Button onClick={handleAddOrUpdateEvent} color="primary">
            {selectedEvent ? 'Update' : 'Add'} Event
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Calendar;