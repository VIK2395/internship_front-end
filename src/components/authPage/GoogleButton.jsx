import React from 'react';
import { Button } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

const GoogleButton = () => {
  const handleClick = () => {
    window.open(`${process.env.REACT_APP_BACK_END_DOMAIN}/auth/google`, '_self');
  };

  return (
    <Button w="100%" mt="6" colorScheme="blackAlpha" leftIcon={<FcGoogle />} onClick={handleClick}>
      Google
    </Button>
  );
};

export default GoogleButton;
