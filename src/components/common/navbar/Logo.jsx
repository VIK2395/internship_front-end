import React from 'react';
import { HStack, Center, Image } from '@chakra-ui/react';

const Logo = () => (
  <HStack spacing={{ base: 1, sm: 2 }} _hover={{ cursor: 'pointer' }} mr={3} mx={{ md: '16px' }}>
    <Center>
      <Image
        h={{ base: 8, sm: 10, md: 12 }}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/DC_Comics_logo.svg/600px-DC_Comics_logo.svg.png"
        // src="http://localhost:3000/comics-designstyle-comics-m.png"
        alt="DC"
      />
    </Center>
    <Center>
      <Image
        h={{ base: 8, sm: 10, md: 12 }}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Marvel-Comics-Logo.svg/411px-Marvel-Comics-Logo.svg.png"
        alt="Marvel"
      />
    </Center>
  </HStack>
);

export default Logo;
