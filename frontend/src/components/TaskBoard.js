import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Box, VStack, Heading, Text, Badge, SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';

const getStatusName = (id) => {
  switch (id) {
    case 'pending': return 'Pending';
    case 'in-progress': return 'In Progress';
    case 'completed': return 'Completed';
    default: return 'Unknown';
  }
};

const getBadgeColorScheme = (priority) => {
  switch (priority) {
    case 'High': return 'red';
    case 'Medium': return 'yellow';
    case 'Low': return 'green';
    default: return 'gray';
  }
};

function TaskBoard({ initialTasks, eventId }) {
  const [columns, setColumns] = useState(() => {
    const tasksByStatus = { 'pending': [], 'in-progress': [], 'completed': [] };
    initialTasks.forEach(task => {
      const statusId = task.status.toLowerCase().replace(' ', '-');
      if (tasksByStatus[statusId]) {
        tasksByStatus[statusId].push(task);
      } else {
        tasksByStatus['pending'].push(task);
      }
    });

    return {
      'pending': { name: 'Pending', items: tasksByStatus['pending'] },
      'in-progress': { name: 'In Progress', items: tasksByStatus['in-progress'] },
      'completed': { name: 'Completed', items: tasksByStatus['completed'] },
    };
  });

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);

      const updatedRemoved = { ...removed, status: getStatusName(destination.droppableId) };
      destItems.splice(destination.index, 0, updatedRemoved);

      const newColumns = {
        ...columns,
        [source.droppableId]: { ...sourceColumn, items: sourceItems },
        [destination.droppableId]: { ...destColumn, items: destItems },
      };
      setColumns(newColumns);

      // Send the updated tasks to the backend
      const allTasks = Object.values(newColumns).flatMap(column => column.items);
      axios.put(`http://localhost:5000/api/events/${eventId}/tasks`, { tasks: allTasks })
        .catch(err => console.error("Failed to update tasks on backend:", err));

    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: { ...column, items: copiedItems }
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        {Object.entries(columns).map(([columnId, column]) => (
          <Droppable key={columnId} droppableId={columnId}>
            {(provided) => (
              <Box ref={provided.innerRef} {...provided.droppableProps} p={4} minH="400px" borderWidth="1px" borderRadius="lg" bg="rgba(255,255,255,0.1)" borderColor="#444">
                <Heading size="md" mb={4} color="white">{column.name} ({column.items.length})</Heading>
                <VStack spacing={4} align="stretch">
                  {column.items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          p={4}
                          shadow="md"
                          borderWidth="1px"
                          borderRadius="md"
                          bg="rgba(255,255,255,0.05)"
                          borderColor="#444"
                          color="white"
                          _hover={{ bg: "rgba(255,255,255,0.1)" }}
                        >
                          <Heading size="sm" mb={1}>{item.title}</Heading>
                          <Text fontSize="sm" color="#aaa">Role: {item.role}</Text>
                          <Badge colorScheme={getBadgeColorScheme(item.priority)} mt={2}>
                            {item.priority}
                          </Badge>
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </VStack>
              </Box>
            )}
          </Droppable>
        ))}
      </SimpleGrid>
    </DragDropContext>
  );
}

export default TaskBoard;