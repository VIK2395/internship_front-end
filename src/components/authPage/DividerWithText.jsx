import React from 'react';
import { Box, Divider, Flex, Text } from '@chakra-ui/react';

const DividerWithText = props => {
  const { children, ...flexProps } = props;
  return (
    <Flex align="center" color="rgba(255, 255, 255, 0.875)" {...flexProps}>
      <Box flex="1">
        <Divider borderColor="currentcolor" />
      </Box>
      <Text as="span" px="3" color="rgba(255, 255, 255, 0.875)" fontWeight="medium">
        {children}
      </Text>
      <Box flex="1">
        <Divider borderColor="currentcolor" />
      </Box>
    </Flex>
  );
};

export default DividerWithText;
