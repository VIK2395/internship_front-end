import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Flex, Box } from '@chakra-ui/react';
import Card from './Card';
import CardHeader from './CardHeader';
import DividerWithText from './DividerWithText';
import LoginForm from './LoginForm';
import GoogleButton from './GoogleButton';

const LogIn = () => {
  const isAuthenticated = useSelector(state => state.isAuthenticated);
  if (isAuthenticated) return <Redirect to="/" />;

  return (
    <Flex
      flexGrow="1"
      px={{ base: '4', lg: '8' }}
      bg="linear-gradient(#e66465, #9198e5)"
      d="flex"
      flexDirection="column"
      justifyContent="center"
      pt="84px"
    >
      <Box maxW="md" mx="auto" my="auto">
        <Card>
          <CardHeader>LOGIN FORM</CardHeader>
          <LoginForm />
          <DividerWithText mt="6">or continue with</DividerWithText>
          <GoogleButton />
        </Card>
      </Box>
    </Flex>
  );
};

export default LogIn;
