import React from 'react';
import { Box } from '@chakra-ui/react';

const Card = props => (
  <Box
    py="8"
    px={{ base: '4', md: '10' }}
    shadow="base"
    rounded="lg"
    bg="#323459 linear-gradient(135deg, rgba(114, 97, 147, 0.175) 25%, rgba(227, 123, 124, 0.175) 50%, rgba(255, 228, 180, 0.175))"
    {...props}
  />
);

export default Card;
