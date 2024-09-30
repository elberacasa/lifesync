import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, TextField, Button, Checkbox, IconButton, Typography, Box } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now().toString(), content: newTask, completed: false }]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEditing = (task) => {
    setEditingTask({ ...task });
  };

  const saveEdit = () => {
    setTasks(tasks.map(task => 
      task.id === editingTask.id ? editingTask : task
    ));
    setEditingTask(null);
  };

  const cancelEdit = () => {
    setEditingTask(null);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);
  };

  return (
    <Box sx={{ maxWidth: 'sm', mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Task Management
      </Typography>
      <form onSubmit={addTask} style={{ marginBottom: '1rem' }}>
        <TextField
          fullWidth
          variant="outlined"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          InputProps={{
            endAdornment: (
              <Button type="submit" variant="contained" color="primary">
                Add Task
              </Button>
            ),
          }}
        />
      </form>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <motion.div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card sx={{ mb: 1, p: 2 }}>
                        {editingTask && editingTask.id === task.id ? (
                          <Box display="flex" alignItems="center">
                            <TextField
                              fullWidth
                              value={editingTask.content}
                              onChange={(e) => setEditingTask({...editingTask, content: e.target.value})}
                              variant="standard"
                            />
                            <IconButton onClick={saveEdit} color="primary">
                              <SaveIcon />
                            </IconButton>
                            <IconButton onClick={cancelEdit}>
                              <CancelIcon />
                            </IconButton>
                          </Box>
                        ) : (
                          <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Box display="flex" alignItems="center">
                              <Checkbox
                                checked={task.completed}
                                onChange={() => toggleTask(task.id)}
                              />
                              <Typography
                                sx={{
                                  textDecoration: task.completed ? 'line-through' : 'none',
                                }}
                              >
                                {task.content}
                              </Typography>
                            </Box>
                            <Box>
                              <IconButton onClick={() => startEditing(task)}>
                                <EditIcon />
                              </IconButton>
                              <IconButton onClick={() => deleteTask(task.id)} color="error">
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          </Box>
                        )}
                      </Card>
                    </motion.div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default TaskManagement;