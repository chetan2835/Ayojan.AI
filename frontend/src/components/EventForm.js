import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack, Heading, useToast, Spinner, Progress, Center, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EventForm() {
  const [formData, setFormData] = useState({ eventTitle: '', eventType: '', estimatedBudget: '', description: '', location: '' });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/generate-plan', formData);
      toast({
        title: "Success!",
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate(`/dashboard?eventId=${response.data.eventId}`);
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to generate event plan. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Center minH="100vh" bg="#121212">
      <Box p={8} maxW="container.md" mx="auto" borderWidth={1} borderRadius="lg" boxShadow="lg" bg="rgba(255, 255, 255, 0.1)" color="white">
        <Heading mb={6} textAlign="center" color="#ffffff">Create New Event</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel color="#e0e0e0">Event Title</FormLabel>
              <Input name="eventTitle" value={formData.eventTitle} onChange={handleChange} bg="rgba(255,255,255,0.1)" border="1px solid #444" _placeholder={{ color: '#aaa' }} />
            </FormControl>
            <FormControl>
              <FormLabel color="#e0e0e0">Event Type</FormLabel>
              <Input name="eventType" value={formData.eventType} onChange={handleChange} bg="rgba(255,255,255,0.1)" border="1px solid #444" _placeholder={{ color: '#aaa' }} />
            </FormControl>
            <FormControl>
              <FormLabel color="#e0e0e0">Location</FormLabel>
              <Input name="location" value={formData.location} onChange={handleChange} bg="rgba(255,255,255,0.1)" border="1px solid #444" _placeholder={{ color: '#aaa' }} />
            </FormControl>
            <FormControl>
              <FormLabel color="#e0e0e0">Estimated Budget</FormLabel>
              <Input type="number" name="estimatedBudget" value={formData.estimatedBudget} onChange={handleChange} bg="rgba(255,255,255,0.1)" border="1px solid #444" _placeholder={{ color: '#aaa' }} />
            </FormControl>
            <FormControl>
              <FormLabel color="#e0e0e0">Description</FormLabel>
              <Textarea name="description" value={formData.description} onChange={handleChange} bg="rgba(255,255,255,0.1)" border="1px solid #444" _placeholder={{ color: '#aaa' }} />
            </FormControl>
            <Button type="submit" colorScheme="purple" isLoading={isLoading} w="100%">
              Generate Plan with AI
            </Button>
            {isLoading && (
              <Box w="100%" mt={4}>
                <Text textAlign="center" mb={2} color="#e0e0e0">Our AI Co-Pilot is mapping your event...</Text>
                <Progress size="xs" isIndeterminate colorScheme="purple" />
              </Box>
            )}
          </VStack>
        </form>
      </Box>
    </Center>
  );
}

export default EventForm;