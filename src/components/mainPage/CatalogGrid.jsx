import React from 'react';
import { useSelector } from 'react-redux';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { Card } from './Card';
import CatalogPagination from './CatalogPagination';
import './grid-style.css';

export const CatalogGrid = () => {
  const comicses = useSelector(state => state.comicses);
  return (
    <Box w="100%" px={4}>
      <SimpleGrid w="100%" gap={4} className="my-simple-grid-styles">
        {comicses.map(comics => (
          <Card key={comics._id} comics={comics} />
        ))}
      </SimpleGrid>
      <CatalogPagination />
    </Box>
  );
};
