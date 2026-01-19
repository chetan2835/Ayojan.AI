import React from 'react';
import { Box, Heading, Text, SimpleGrid, Icon, VStack } from '@chakra-ui/react';
import { FaLaptopCode, FaUsers, FaChartLine, FaRegCalendarAlt, FaFeatherAlt, FaRegComments } from 'react-icons/fa';

const features = [
    {
        icon: FaLaptopCode,
        title: "AI Content Generation",
        description: "Generate sponsorship proposals, social media posts, and official letters in Bengali & English.",
    },
    {
        icon: FaUsers,
        title: "Role-Based Management",
        description: "Organize your committee with Admin, Finance Head, Team Members, and Vendor roles.",
    },
    {
        icon: FaChartLine,
        title: "Smart Finance Tracking",
        description: "Track donations, expenses, and generate transparency reports with AI insights.",
    },
    {
        icon: FaRegCalendarAlt,
        title: "Festival Templates",
        description: "Pre-loaded checklists for Durga Puja, Ganesh Chaturthi, and other cultural events.",
    },
    {
        icon: FaRegComments,
        title: "Community Feed",
        description: "Social media-style feed for event updates, photos, and community engagement.",
    },
    {
        icon: FaFeatherAlt,
        title: "Heritage Design",
        description: "Beautiful newspaper-inspired interface with traditional Bengali motifs and patterns.",
    },
];

function FeaturesSection() {
    return (
        <Box py={16} bg="#f8f4f0">
            <VStack spacing={4} textAlign="center" mb={10}>
                <Heading
                    as="h2"
                    fontSize={{ base: '2xl', md: '3xl' }}
                    fontWeight="bold"
                    color="#a05d5d"
                >
                    Heritage Meets Innovation
                </Heading>
                <Text fontSize={{ base: 'md', md: 'lg' }} maxW="800px">
                    Experience the perfect blend of traditional festival management and cutting-edge AI technology
                </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} maxW="container.lg" mx="auto" px={4}>
                {features.map((feature, index) => (
                    <Box
                        key={index}
                        p={6}
                        bg="white"
                        borderRadius="md"
                        boxShadow="sm"
                        _hover={{ boxShadow: "lg", transform: "translateY(-5px)" }}
                        transition="all 0.3s"
                    >
                        <VStack spacing={4} textAlign="center">
                            <Icon
                                as={feature.icon}
                                boxSize={10}
                                color="#a05d5d"
                            />
                            <Heading as="h3" size="md">
                                {feature.title}
                            </Heading>
                            <Text color="gray.600">
                                {feature.description}
                            </Text>
                        </VStack>
                    </Box>
                ))}
            </SimpleGrid>
        </Box>
    );
}

export default FeaturesSection;