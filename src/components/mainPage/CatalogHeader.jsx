import React from 'react';
import { useDispatch } from 'react-redux';
import { Flex, Spacer, Select, Button, SimpleGrid } from '@chakra-ui/react';
import { BsFunnel } from 'react-icons/bs';
import { setSort } from '../../redux/actions';
import { fetchComicsesThunkCreator } from '../../redux/thunks';

const CatalogHeader = ({ onOpen }) => {
  const dispatch = useDispatch();

  const onSortChange = ev => {
    dispatch(setSort(ev.target.value));
    dispatch(fetchComicsesThunkCreator());
  };

  return (
    <SimpleGrid
      columns={2}
      spacing={2}
      py={4}
      px={{ base: 4, sm: 6 }}
      pl={{ md: 8 }}
      pr={{ md: '6%' }}
    >
      <Flex>
        <Button
          leftIcon={<BsFunnel />}
          colorScheme="teal"
          variant="solid"
          onClick={onOpen}
          display={{ base: 'block', lg: 'none' }}
          maxW="270px"
          w="100%"
        >
          Filters
        </Button>
      </Flex>
      <Flex>
        <Spacer />
        <Select w="200px" onChange={onSortChange} mx={{ md: 4 }}>
          <option value="reviewCount">Reviews</option>
          <option value="rating">Rating</option>
          <option value="title">Title</option>
        </Select>
      </Flex>
    </SimpleGrid>
  );
};

export default CatalogHeader;
