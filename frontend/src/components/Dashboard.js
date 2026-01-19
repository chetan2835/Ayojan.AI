import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, SimpleGrid, Stat, StatLabel, StatNumber, Spinner, Center, Alert, AlertIcon, AlertTitle, AlertDescription, useToast } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import TaskBoard from './TaskBoard';
import axios from 'axios';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Dashboard() {
  const query = useQuery();
  const eventId = query.get('eventId');
  const [eventData, setEventData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    if (!eventId) {
      setError('No event ID provided.');
      setIsLoading(false);
      return;
    }

    const fetchEventData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${eventId}`);
        if (response.data) {
          setEventData(response.data);
          toast({
              title: "Event Loaded",
              description: "Dashboard for your new event is ready!",
              status: "success",
              duration: 2000,
              isClosable: true,
          });
        } else {
          setError('Event not found.');
        }
      } catch (err) {
        setError('Failed to fetch event data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventData();
  }, [eventId, toast]);

  if (isLoading) {
    return (
      <Center minH="100vh" bg="#121212">
        <Spinner size="xl" color="purple.500" />
        <Text ml={4} color="white">Loading event dashboard...</Text>
      </Center>
    );
  }

  if (error) {
    return (
      <Center minH="100vh" bg="#121212">
        <Alert status="error" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" height="200px" bg="rgba(255,255,255,0.1)" color="white">
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">{error}</AlertTitle>
          <AlertDescription maxWidth="sm">Please go back and create a new event.</AlertDescription>
        </Alert>
      </Center>
    );
  }
  
  const completedTasks = eventData.tasks.filter(t => t.status === 'Completed').length;
  const inProgressTasks = eventData.tasks.filter(t => t.status === 'In Progress').length;
  const totalTasks = eventData.tasks.length;
  const pendingTasks = totalTasks - completedTasks - inProgressTasks;

  return (
    <Box p={8} bg="#121212" color="white" minH="100vh">
      <Heading mb={2}>{eventData.eventTitle} Dashboard</Heading>
      <Text fontSize="lg" mb={6} color="#ccc">{eventData.description}</Text>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mb={10}>
        <Stat p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg="rgba(255,255,255,0.1)" borderColor="#444">
          <StatLabel>Estimated Budget</StatLabel>
          <StatNumber fontSize="2xl">₹{eventData.estimatedBudget.toLocaleString()}</StatNumber>
        </Stat>
        <Stat p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg="rgba(255,255,255,0.1)" borderColor="#444">
          <StatLabel>Total Tasks</StatLabel>
          <StatNumber fontSize="2xl">{totalTasks}</StatNumber>
        </Stat>
        <Stat p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg="rgba(255,255,255,0.1)" borderColor="#444">
          <StatLabel>Completed Tasks</StatLabel>
          <StatNumber fontSize="2xl">{completedTasks}</StatNumber>
        </Stat>
      </SimpleGrid>

      <TaskBoard initialTasks={eventData.tasks} eventId={eventId} />
    </Box>
  );
}

export default Dashboard;