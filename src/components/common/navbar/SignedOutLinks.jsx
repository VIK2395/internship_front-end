import React from 'react';
import { Link } from 'react-router-dom';
import { Button, HStack } from '@chakra-ui/react';

const SignedOutLinks = () => {
  return (
    <HStack spacing={{ base: 2, md: 4 }} mx={{ md: '16px' }}>
      <Link to="/auth/login">
        <Button fontWeight={600} colorScheme="gray">
          Log In
        </Button>
      </Link>
      <Link to="/auth/signup">
        <Button fontWeight={600} colorScheme="pink">
          Sign Up
        </Button>
      </Link>
    </HStack>
  );
};

export default SignedOutLinks;
