import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, TextField, Button, List, ListItem, ListItemText, Avatar } from '@mui/material';
import { Send, Assistant } from '@mui/icons-material';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  height: '70vh',
  display: 'flex',
  flexDirection: 'column',
}));

const MessageList = styled(List)({
  flexGrow: 1,
  overflow: 'auto',
});

const SyncSage = ({ userData }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const addMessage = (content, isUser = true) => {
    setMessages(prev => [...prev, { content, isUser, timestamp: new Date() }]);
  };

  const handleSend = () => {
    if (input.trim()) {
      addMessage(input);
      setInput('');
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = generateAIResponse(input, userData);
        addMessage(aiResponse, false);
      }, 1000);
    }
  };

  const generateAIResponse = (userInput, userData) => {
    // This is where we'd integrate with a real AI model. For now, we'll use simple logic.
    if (userInput.toLowerCase().includes('health')) {
      return `Based on your recent health data, I suggest focusing on increasing your daily step count. Your average is currently ${userData.health.averageSteps} steps per day.`;
    } else if (userInput.toLowerCase().includes('budget')) {
      return `Your current monthly savings rate is ${userData.budget.savingsRate}%. To reach your goal of buying a house in 5 years, consider increasing this to 25%.`;
    } else {
      return "I'm here to help! Feel free to ask about your health, budget, tasks, or any other aspect of your life tracked in LifeSync.";
    }
  };

  return (
    <Box sx={{ maxWidth: 'lg', mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ color: 'text.primary' }}>
        SyncSage - Your AI Life Assistant
      </Typography>
      <StyledPaper elevation={3}>
        <MessageList>
          {messages.map((message, index) => (
            <ListItem key={index} sx={{ justifyContent: message.isUser ? 'flex-end' : 'flex-start' }}>
              {!message.isUser && <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}><Assistant /></Avatar>}
              <Paper 
                elevation={1} 
                sx={{ 
                  p: 2, 
                  maxWidth: '70%', 
                  bgcolor: message.isUser ? 'secondary.main' : 'primary.main',
                  color: 'white',
                }}
              >
                <Typography variant="body1">{message.content}</Typography>
              </Paper>
            </ListItem>
          ))}
        </MessageList>
        <Box sx={{ display: 'flex', mt: 2 }}>
          <TextField
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask SyncSage anything..."
            variant="outlined"
            sx={{ mr: 1 }}
          />
          <Button variant="contained" endIcon={<Send />} onClick={handleSend}>
            Send
          </Button>
        </Box>
      </StyledPaper>
    </Box>
  );
};

export default SyncSage;