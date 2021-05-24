import React from 'react';
import { Heading } from '@chakra-ui/react';

const CardHeader = ({ children }) => (
  <Heading
    textAlign="center"
    size="lg"
    fontWeight="extrabold"
    mb="6"
    color="rgba(255, 255, 255, 0.875)"
  >
    {children}
  </Heading>
);

export default CardHeader;
