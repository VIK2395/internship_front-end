import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { clearFilters } from '../../redux/actions';
import { fetchComicsesThunkCreator } from '../../redux/thunks';

import ComicsFilterBody from './ComicsFilterBody';

const CatalogSidebar = () => {
  const dispatch = useDispatch();

  const onApplyFilters = () => {
    dispatch(fetchComicsesThunkCreator());
  };

  const onClearFiltyers = () => {
    dispatch(clearFilters());
  };

  // pos="sticky" top={6}
  return (
    <Box minW="320px" px={4} display={{ base: 'none', lg: 'block' }}>
      <ComicsFilterBody />
      <Box mt="-1px" py={6} bg="white" pos="sticky" bottom="0" borderTopWidth="1px" d="flex">
        <Button mr={2} pr={4} colorScheme="yellow" onClick={onClearFiltyers}>
          Clear
        </Button>
        <Button w="100%" colorScheme="green" onClick={onApplyFilters}>
          Apply
        </Button>
      </Box>
    </Box>
  );
};

export default CatalogSidebar;
