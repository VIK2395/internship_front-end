import React from 'react';
import { useSelector } from 'react-redux';
import { Flex, Spacer } from '@chakra-ui/react';
import Logo from './Logo';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

const Navbar = () => {
  const isAuthenticated = useSelector(state => state.isAuthenticated);
  const links = isAuthenticated ? <SignedInLinks /> : <SignedOutLinks />;
  return (
    <Flex
      py={4}
      px={{ base: 4, sm: 6 }}
      pl={{ md: 8 }}
      pr={{ md: '6%' }}
      bg="#323459 linear-gradient(135deg, rgba(114, 97, 147, 0.175) 25%, rgba(227, 123, 124, 0.175) 50%, rgba(255, 228, 180, 0.175))"
      position="fixed"
      top="0"
      left="0"
      w="100%"
      zIndex="10"
    >
      <Logo />
      <Spacer />
      {links}
    </Flex>
  );
};

export default Navbar;
