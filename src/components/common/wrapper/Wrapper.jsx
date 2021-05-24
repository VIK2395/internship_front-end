import React from 'react';
import { Flex } from '@chakra-ui/react';

const Wrapper = ({ children }) => (
  // overflow="hidden"
  <Flex w="100%" minH="100vh" p={0} m={0} flexDirection="column">
    {children}
  </Flex>
);

export default Wrapper;
