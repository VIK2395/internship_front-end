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
} from '@chakra-ui/react';
import { EmailIcon, LockIcon, ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { socket } from '../../socketioConfig/socketioConfig';
import { setIsAuthenticated, setUser } from '../../redux/actions';

const LoginForm = props => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [show, setShow] = React.useState(false);
  const handlePasswordShow = () => setShow(!show);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });
      const user = await response.json();
      setIsLoading(false);
      if (response.status === 200) {
        dispatch(setUser(user));
        dispatch(setIsAuthenticated(true));

        socket.connect();
      }
      if (response.status === 400) {
        toast({
          title: user.message,
          position: 'bottom',
          status: 'warning',
          duration: null, // 2400
          isClosable: true,
        });
        dispatch(setIsAuthenticated(false));
      }
    } catch (e) {
      toast({
        title: e.message,
        position: 'bottom',
        status: 'error',
        duration: null, // 9000
        isClosable: true,
      });
    }
  };

  return (
    <chakra.form onSubmit={handleSubmit} {...props}>
      <Stack spacing="6">
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
            color="rgba(255, 255, 255, 0.875)"
            focusBorderColor="teal.400"
            value={password}
            onChange={event => setPassword(event.currentTarget.value)}
          />
          <InputRightElement onClick={handlePasswordShow} pr={2}>
            {show ? <ViewOffIcon color="white" /> : <ViewIcon color="white" />}
          </InputRightElement>
        </InputGroup>
        <Button type="submit" colorScheme="yellow" isLoading={isLoading} loadingText="Processing">
          Log in
        </Button>
      </Stack>
    </chakra.form>
  );
};

export default LoginForm;
