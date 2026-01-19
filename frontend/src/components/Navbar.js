import React from 'react';
import { Box, HStack, Text, Image, Flex, Button, useDisclosure, useBreakpointValue } from '@chakra-ui/react';
import Logo from './image/logo.png'; // import your logo image
import { Link as ReactLink } from 'react-router-dom';


function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Box
            as="nav"
            bg="no fill"
            color="#1f1c2c"
            py={4}
            px={8}
            position="fixed"
            top="0"
            w="100%"
            zIndex="1000"
        >
            <Flex justify="space-between" align="center">
                {/* Logo */}
                <Box>
                    {/* <a href="#about">
                        <Image
                            src={Logo}
                            alt="Aayojan.AI Logo"
                            cursor="pointer"
                            _hover={{ transform: 'scale(1.05)', transition: '0.3s' }}
                        />
                    </a> */}
                </Box>

                {/* Desktop Navigation */}
                <HStack
                    as="nav"
                    spacing={8}
                    display={{ base: 'none', md: 'flex' }}
                    justify="center"
                    flex="1"
                >
                    <Text as="a" href="#about" fontWeight="medium" _hover={{ color: "#a05d5d", textDecoration: "none" }}>
                        About
                    </Text>
                    <Text as="a" href="#features" fontWeight="medium" _hover={{ color: "#a05d5d", textDecoration: "none" }}>
                        Features
                    </Text>
                    <Text as="a" href="#events" fontWeight="medium" _hover={{ color: "#a05d5d", textDecoration: "none" }}>
                        Events
                    </Text>
                </HStack>

                {/* Get Started Button */}
                <Box display={{ base: 'none', md: 'block' }}>
                    <Button as="a" href="/create-event" colorScheme="red" size="md">
                        Get Started
                    </Button>
                </Box>
{/* 
                <Box display={{ base: 'none', md: 'block' }}>
                    <Button as={ReactLink} to="/auth" colorScheme="red" size="md">
                        Get Started
                    </Button>
                </Box> */}

                {/* TODO: Hamburger Menu for mobile */}
            </Flex>

        </Box>
    );
}

export default Navbar;