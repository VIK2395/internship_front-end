/* eslint-disable no-unreachable */
import React, { useState } from 'react';
import {
  Button,
  chakra,
  Input,
  Stack,
  InputGroup,
  InputLeftAddon,
  useToast,
  InputRightElement,
  VStack,
  Text,
  Box,
  List,
  ListItem,
  ListIcon,
  Center,
  Heading,
} from '@chakra-ui/react';
import {
  EmailIcon,
  LockIcon,
  InfoIcon,
  ViewIcon,
  ViewOffIcon,
  WarningTwoIcon,
} from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { socket } from '../../socketioConfig/socketioConfig';
import { setIsAuthenticated } from '../../redux/actions';
import './style.css';

const SignupForm = props => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [show, setShow] = useState(false);
  const handlePasswordShow = () => setShow(!show);
  const [isRequirementsShown, setIsRequirementsShown] = useState(true);

  const isPasswordInvalid = () => {
    const regExp = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/);
    console.log(regExp.test(password));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    // isPasswordInvalid();

    // return;

    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, displayName: `${firstName} ${lastName}` }),
        credentials: 'include',
      });
      const user = await response.json();
      setIsLoading(false);
      if (response.status === 201) {
        toast({
          title: 'Signup successful',
          position: 'bottom',
          description: "We've created an account for you",
          status: 'success',
          duration: 3600,
          isClosable: true,
        });
        dispatch(setIsAuthenticated(true));

        socket.connect();
      }
      if (response.status === 400) {
        toast({
          title: user.message,
          position: 'bottom',
          status: 'warning',
          duration: null,
          isClosable: true,
        });
        dispatch(setIsAuthenticated(false));
      }
    } catch (e) {
      toast({
        title: e.message,
        status: 'error',
        duration: null, // 9000
        isClosable: true,
      });
      dispatch(setIsAuthenticated(false));
    }
  };

  return (
    <chakra.form onSubmit={handleSubmit} {...props}>
      <Stack spacing={6}>
        <InputGroup>
          <InputLeftAddon>
            <EmailIcon boxSize={5} color="gray.600" />
          </InputLeftAddon>
          <Input
            type="email"
            placeholder="Email"
            autoComplete="email"
            required
            color="rgba(255, 255, 255, 0.875)"
            focusBorderColor="teal.400"
            value={email}
            onChange={event => setEmail(event.currentTarget.value)}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon>
            <LockIcon boxSize={5} color="gray.600" />
          </InputLeftAddon>
          <Input
            type={show ? 'text' : 'password'}
            placeholder="Password"
            required
            minLength="8"
            // maxLength="16"
            // (?=.*[0-9]) at least one number // (?=.*[!@#$%^&*]) at least one special character
            pattern={/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/}
            color="rgba(255, 255, 255, 0.875)"
            // isInvalid
            focusBorderColor="teal.400"
            value={password}
            onChange={event => setPassword(event.currentTarget.value)}
          />
          <InputRightElement onClick={handlePasswordShow} pr={2}>
            {show ? <ViewOffIcon color="white" /> : <ViewIcon color="white" />}
          </InputRightElement>
        </InputGroup>

        {/* bg="linear-gradient(#e66465, #9198e5)"
      bg="linear-gradient(45deg, #9dc66b 5%, #4fa49a 30%, #4361c2)"
      bg="#f0f4f4"
      bg="#323459 linear-gradient(135deg, rgba(114, 97, 147, 0.175) 25%, rgba(227, 123, 124, 0.175) 50%, rgba(255, 228, 180, 0.175))" */}

        <Box px={2}>
          <Box
            px={4}
            py={2}
            bg="#323459 linear-gradient(135deg, rgba(114, 97, 147, 0.175) 25%, rgba(227, 123, 124, 0.175) 50%, rgba(255, 228, 180, 0.175))"
            w="100%"
            border="1px"
            // borderColor="rgba(255, 255, 255, 0.875)"
            borderRadius="8px"
          >
            <Text color="white" fontSize="lg" textAlign="center" mb={2} textDecoration="bold">
              Password Requirements:
            </Text>
            <List spacing={1} my="0px" py="0px">
              <ListItem color="white">
                <ListIcon boxSize={3} mb="3px" as={WarningTwoIcon} color="white" />
                MUST contain at least 8 characters
              </ListItem>
              <ListItem color="white">
                <ListIcon boxSize={3} mb="3px" as={WarningTwoIcon} color="white" />
                MUST contain at least one number
              </ListItem>
              <ListItem color="white">
                <ListIcon boxSize={3} mb="3px" as={WarningTwoIcon} color="white" />
                MUST contain at least one special character (!@#$%^&*)
              </ListItem>
            </List>
          </Box>
        </Box>
        <InputGroup>
          <InputLeftAddon>
            <InfoIcon boxSize={5} color="gray.600" />
          </InputLeftAddon>
          <Input
            type="text"
            placeholder="First Name"
            required
            // pattern="/^[A-Z][a-z0-9_-]{3,19}$/"
            color="rgba(255, 255, 255, 0.875)"
            focusBorderColor="teal.400"
            value={firstName}
            onChange={event => setFirstName(event.currentTarget.value)}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon>
            <InfoIcon boxSize={5} color="gray.600" />
          </InputLeftAddon>
          <Input
            type="text"
            placeholder="Last Name"
            required
            // pattern="/^[A-Z][a-z0-9_-]{3,19}$/"
            color="rgba(255, 255, 255, 0.875)"
            focusBorderColor="teal.400"
            value={lastName}
            onChange={event => setLastName(event.currentTarget.value)}
          />
        </InputGroup>
        <Button type="submit" colorScheme="yellow" isLoading={isLoading} loadingText="Processing">
          Sign up
        </Button>
      </Stack>
    </chakra.form>
  );
};

export default SignupForm;
