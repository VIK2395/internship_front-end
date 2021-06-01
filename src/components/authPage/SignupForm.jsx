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
  Text,
  Box,
  List,
  ListItem,
  ListIcon,
  FormErrorMessage,
  FormControl,
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
import { setIsAuthenticated, setUser } from '../../redux/actions';

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
  const [passwordErrors, setPasswordErrors] = useState([]);

  const validatePassword = () => {
    const errors = [];
    const lowerCaseLettersRegExp = new RegExp(/[a-z]/, 'g');
    const upperCaseLettersRegExp = new RegExp(/[A-Z]/, 'g');
    const numbersRegExp = new RegExp(/[0-9]/, 'g');
    const specialSymbolsRegExp = new RegExp(/[!@#$%^&*(),.?":{}|<>]/, 'g');

    if (password.length < 8) {
      errors.push('Password must contain at least 8 characters');
    }
    if (!lowerCaseLettersRegExp.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!upperCaseLettersRegExp.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!numbersRegExp.test(password)) {
      errors.push('Password must contain at least one number');
    }
    if (!specialSymbolsRegExp.test(password)) {
      errors.push('Password must contain at least one special symbol');
    }
    return errors;
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const errors = validatePassword();

    if (errors.length !== 0) {
      setPasswordErrors(errors);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BACK_END_DOMAIN}/auth/signup`, {
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
        dispatch(setUser(user));
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
        duration: null,
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
        <Box>
          <FormControl isInvalid={passwordErrors.length !== 0}>
            <InputGroup>
              <InputLeftAddon>
                <LockIcon boxSize={5} color="gray.600" />
              </InputLeftAddon>
              <Input
                type={show ? 'text' : 'password'}
                placeholder="Password"
                required
                color="rgba(255, 255, 255, 0.875)"
                focusBorderColor="teal.400"
                value={password}
                errorBorderColor="orange.600"
                onChange={event => setPassword(event.currentTarget.value)}
              />
              <InputRightElement onClick={handlePasswordShow} pr={2}>
                {show ? <ViewOffIcon color="white" /> : <ViewIcon color="white" />}
              </InputRightElement>
            </InputGroup>
            {passwordErrors.length > 0 ? (
              <Box px={5} mt={4}>
                {passwordErrors.map(error => (
                  <FormErrorMessage color="orange" key={error}>
                    {error}
                  </FormErrorMessage>
                ))}
              </Box>
            ) : null}
          </FormControl>
          <Box
            px={4}
            py={2}
            mx={2}
            mt={6}
            bg="#323459 linear-gradient(135deg, rgba(114, 97, 147, 0.175) 25%, rgba(227, 123, 124, 0.175) 50%, rgba(255, 228, 180, 0.175))"
            border="1px"
            // borderColor="rgba(255, 255, 255, 0.875)"
            borderRadius="8px"
          >
            <Text color="white" fontSize="16px" textAlign="center" mb={2} textDecoration="bold">
              Password Requirements:
            </Text>
            <List spacing={1} my="0px" py="0px">
              <ListItem color="white" fontSize="14px">
                <ListIcon boxSize={3} mb="3px" as={WarningTwoIcon} color="white" />
                MUST contain at least 8 characters
              </ListItem>
              <ListItem color="white" fontSize="14px">
                <ListIcon boxSize={3} mb="3px" as={WarningTwoIcon} color="white" />
                MUST contain at least one lowercase letter
              </ListItem>
              <ListItem color="white" fontSize="14px">
                <ListIcon boxSize={3} mb="3px" as={WarningTwoIcon} color="white" />
                MUST contain at least one uppercase letter
              </ListItem>
              <ListItem color="white" fontSize="14px">
                <ListIcon boxSize={3} mb="3px" as={WarningTwoIcon} color="white" />
                MUST contain at least one number
              </ListItem>
              <ListItem color="white" fontSize="14px">
                <ListIcon boxSize={3} mb="3px" as={WarningTwoIcon} color="white" />
                MUST contain at least one special symbol {`(!@#$%^&*(),.?":{}|<>)`}
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
