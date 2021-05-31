import React from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { clearFilters } from '../../redux/actions';
import { fetchComicsesThunkCreator } from '../../redux/thunks';
import ComicsFilterBody from './ComicsFilterBody';

const MobileDrawer = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const onApplyFilters = () => {
    dispatch(fetchComicsesThunkCreator());
    onClose();
  };

  const onClearFilters = () => {
    dispatch(clearFilters());
    dispatch(fetchComicsesThunkCreator());
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="left" size="xs">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">Filters</DrawerHeader>
        <DrawerBody pt={4}>
          <ComicsFilterBody />
        </DrawerBody>
        <DrawerFooter borderTopWidth="1px">
          <Button mr={2} pr={4} colorScheme="yellow" onClick={onClearFilters}>
            Clear
          </Button>
          <Button w="100%" colorScheme="green" onClick={onApplyFilters}>
            Apply
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileDrawer;
