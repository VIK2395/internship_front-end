import React from 'react';
import { Button, HStack, useDisclosure } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { logOutThunk } from '../../../redux/thunks';
import ProfileModal from './ProfileModal';

const SignedInLinks = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logOutThunk);
  };

  return (
    <>
      <ProfileModal isOpen={isOpen} onClose={onClose} />
      <HStack spacing={{ base: 2, md: 4 }} mx={{ md: '16px' }}>
        <Button fontWeight={600} onClick={onOpen}>
          Profile
        </Button>
        <Button
          fontWeight={600}
          color={'white'}
          bg={'pink.400'}
          _hover={{
            bg: 'pink.300',
          }}
          onClick={onLogout}
        >
          Log out
        </Button>
      </HStack>
    </>
  );
};

export default SignedInLinks;
