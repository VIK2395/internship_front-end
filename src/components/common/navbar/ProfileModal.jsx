import React from 'react';
import { useSelector } from 'react-redux';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  Center,
  Box,
  Flex,
} from '@chakra-ui/react';

const ProfileModal = ({ isOpen, onClose }) => {
  const user = useSelector(state => state.user);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      blockScrollOnMount={false}
    >
      <ModalOverlay />
      <ModalContent bg="white">
        <ModalHeader borderBottomWidth="1px">
          <Center>{`User's Profile`}</Center>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pt="22px" pb="20px">
          <Box pl={{ sm: '4%' }}>
            <Flex mb="6px">
              <Text fontWeight="bold" fontSize="18px" mr={2}>
                Email:
              </Text>
              <Text fontSize="18px">{user.email}</Text>
            </Flex>
            <Flex>
              <Text fontWeight="bold" fontSize="18px" mr={2}>
                Name:
              </Text>
              <Text fontSize="18px">{user.displayName}</Text>
            </Flex>
          </Box>
        </ModalBody>
        <ModalFooter borderTopWidth="1px">
          <Button onClick={onClose} colorScheme="green">
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
