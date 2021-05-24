import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Flex, Box } from '@chakra-ui/react';
import Card from './Card';
import CardHeader from './CardHeader';
import DividerWithText from './DividerWithText';
import SignupForm from './SignupForm';
import GoogleButton from './GoogleButton';

const SignUp = () => {
  const isAuthenticated = useSelector(state => state.isAuthenticated);
  if (isAuthenticated) return <Redirect to="/" />;
  return (
    <Flex
      flexGrow="1"
      px={{ base: '4', lg: '8' }}
      py={5}
      bg="linear-gradient(#e66465, #9198e5)"
      flexDirection="column"
      pt="84px"
    >
      <Box maxW="md" mx="auto" my="auto">
        <Card>
          <CardHeader>SIGNUP FORM</CardHeader>
          <SignupForm />
          <DividerWithText mt="6">or continue with</DividerWithText>
          <GoogleButton />
        </Card>
      </Box>
    </Flex>
  );
};

export default SignUp;
