import React from 'react';
import { Box, Heading, Text, VStack, Button, Flex, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';


function AboutSection() {
    return (
        <Flex
            minH="100vh"
            bg="#f8f4f0"
            color="#1f1c2c"
            justify="center"
            align="center"
            py={16}
        >
            <VStack spacing={8} textAlign="center" maxW="container.md">
                <Box
                    px={4}
                    py={2}
                    bg="#e0d9cf"
                    borderRadius="full"
                    fontSize="sm"
                    fontWeight="bold"
                    textTransform="uppercase"
                >
                    AI-Powered Heritage Management
                </Box>
                <Heading
                    as="h1"
                    fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
                    fontWeight="bold"
                    lineHeight="shorter"
                >
                    Celebrate Heritage with{" "}
                    <Text as="span" color="#a05d5d">
                        Modern Intelligence
                    </Text>
                </Heading>
                <Text fontSize={{ base: 'md', md: 'lg' }} maxW="600px">
                    Transform your Durga Puja and cultural events with AI-powered planning,
                    traditional aesthetics, and seamless community management.
                </Text>
                <HStack spacing={4} mt={4}>
                    <Button
                        as={Link}
                        to="/create-event"
                        colorScheme="red"
                        size="lg"
                        px={8}
                        _hover={{ bg: "#8a4f4f" }}
                    >
                        Start Your Event
                    </Button>
                    <Button
                        as="a"
                        href="#features" // ID of the Features section
                        variant="outline"
                        size="lg"
                        px={8}
                        color="#a05d5d"
                        borderColor="#a05d5d"
                        _hover={{ bg: "#a05d5d", color: "white" }}
                    >
                        Explore Features
                    </Button>


                </HStack>
            </VStack>
        </Flex>
    );
}

export default AboutSection;