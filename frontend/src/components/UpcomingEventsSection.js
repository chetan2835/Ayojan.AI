import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, SimpleGrid, Card, CardBody, Stack, Image, Tag, Flex, VStack, Center, Spinner, Icon } from '@chakra-ui/react';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

// This is the placeholder data we will use for the hackathon
const upcomingEventsData = [
  {
    id: 1,
    title: "Sarodiya Durgotsav",
    location: "Kolkata, West Bengal",
    date: "October 2025",
    type: "Durga Puja",
    image: "https://images.unsplash.com/photo-1633519391000-05886470081d?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Deepavali Celebration",
    location: "Mumbai, Maharashtra",
    date: "November 2024",
    type: "Kali Puja",
    image: "https://images.unsplash.com/photo-1634785461234-58e11e868a2c?q=80&w=1964&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Basant Panchami",
    location: "Delhi, India",
    date: "February 2025",
    type: "Saraswati Puja",
    image: "https://images.unsplash.com/photo-1616782806443-3e11f181f084?q=80&w=1964&auto=format&fit=crop"
  },
];

function UpcomingEventsSection() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // In a real app, this would fetch data from the backend
  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      setEvents(upcomingEventsData);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Box py={16} bg="#f8f4f0">
      <VStack spacing={4} textAlign="center" mb={10}>
        <Heading 
          as="h2" 
          fontSize={{ base: '2xl', md: '3xl' }} 
          fontWeight="bold"
          color="#a05d5d"
        >
          Upcoming Cultural Events
        </Heading>
        <Text fontSize={{ base: 'md', md: 'lg' }} maxW="800px">
          Join the celebration of heritage and tradition
        </Text>
      </VStack>

      {isLoading ? (
        <Center>
          <Spinner size="lg" color="#a05d5d" />
        </Center>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} maxW="container.lg" mx="auto" px={4}>
          {events.map((event) => (
            <Card key={event.id} shadow="md" borderRadius="lg" overflow="hidden" _hover={{ boxShadow: "xl", transform: "translateY(-5px)" }} transition="all 0.3s">
              <Image src={event.image} alt={event.title} objectFit="cover" height="200px" />
              <CardBody>
                <Tag colorScheme="purple" mb={2}>{event.type}</Tag>
                <Heading size="md" mb={2}>{event.title}</Heading>
                <Text fontSize="sm" color="gray.500" mb={1}>
                  <Flex alignItems="center">
                    <Icon as={FaMapMarkerAlt} mr={2} color="#a05d5d" />
                    {event.location}
                  </Flex>
                </Text>
                <Text fontSize="sm" color="gray.500">
                  <Flex alignItems="center">
                    <Icon as={FaCalendarAlt} mr={2} color="#a05d5d" />
                    {event.date}
                  </Flex>
                </Text>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}

export default UpcomingEventsSection;