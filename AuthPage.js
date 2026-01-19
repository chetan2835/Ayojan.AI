import React, { useState } from 'react';
import { Box, Heading, Text, Flex, VStack, FormControl, FormLabel, Input, Button, Stack, Select, useToast } from '@chakra-ui/react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from '../firebase'; // Import auth and db from your firebase.js file

function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [role, setRole] = useState('Admin');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        // Sign Up Logic
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", userCredential.user.uid), {
          fullName,
          email,
          role,
        });
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        // You can add navigation here to redirect the user
      } else {
        // Sign In Logic
        await signInWithEmailAndPassword(auth, email, password);
        toast({
          title: "Logged in.",
          description: "You are now logged in.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        // You can add navigation here to redirect the user
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="#f8f4f0">
      <Box p={8} maxW="md" borderWidth={1} borderRadius="lg" bg="white" shadow="lg">
        <VStack spacing={4}>
          <Heading size="lg" textAlign="center" color="#a05d5d">Welcome to Aayojan.AI</Heading>
          <Text fontSize="sm" color="gray.600">Heritage Event Management</Text>

          <Flex mt={4}>
            <Button colorScheme={!isSignUp ? "red" : "gray"} onClick={() => setIsSignUp(false)}>Sign In</Button>
            <Button colorScheme={isSignUp ? "red" : "gray"} onClick={() => setIsSignUp(true)} ml={2}>Sign Up</Button>
          </Flex>

          <form onSubmit={handleAuth}>
            <VStack spacing={4} mt={4}>
              {isSignUp && (
                <FormControl>
                  <FormLabel>Select your role</FormLabel>
                  <Select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="Admin">Admin</option>
                    <option value="Finance Head">Finance Head</option>
                    <option value="Team Member">Team Member</option>
                    <option value="Vendor">Vendor</option>
                  </Select>
                </FormControl>
              )}
              {isSignUp && (
                <FormControl>
                  <FormLabel>Full Name</FormLabel>
                  <Input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                </FormControl>
              )}
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </FormControl>
              <Button type="submit" colorScheme="red" w="100%">
                {isSignUp ? "Create Account" : "Sign In"}
              </Button>
            </VStack>
          </form>

          <Text my={4}>OR CONTINUE WITH</Text>
          <Button w="100%" leftIcon={<Box as="img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png" boxSize="18px" />} variant="outline">
            Continue with Google
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}

export default AuthPage;