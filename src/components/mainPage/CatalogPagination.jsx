import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { Paginator, Container, Previous, Next, PageGroup } from 'chakra-paginator';
import { fetchComicsesThunkCreator } from '../../redux/thunks';

const CatalogPagination = () => {
  const dispatch = useDispatch();
  const pagination = useSelector(state => state.pagination);

  // constants
  const outerLimit = 1;
  const innerLimit = 2;

  // styles
  const baseStyles = {
    w: 12,
    h: 12,
    fontSize: 'md',
    variant: 'outline',
  };

  const normalStyles = {
    ...baseStyles,
  };

  const activeStyles = {
    ...baseStyles,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'blue.300',
  };

  const separatorStyles = {
    w: 12,
    h: 12,
    variant: 'outline',
  };

  // handlers
  const handlePageChange = nextPage => {
    dispatch(fetchComicsesThunkCreator(nextPage));
  };

  return (
    <ChakraProvider>
      <Paginator
        activeStyles={activeStyles}
        innerLimit={innerLimit}
        outerLimit={outerLimit}
        normalStyles={normalStyles}
        separatorStyles={separatorStyles}
        currentPage={pagination.page}
        pagesQuantity={pagination.totalPageCount}
        onPageChange={handlePageChange}
      >
        <Container align="center" w="full" mt={10} justify={{ base: 'space-around', md: 'center' }}>
          <Previous variant="outline" h={12} w="100px" mr="38px">
            Previous
          </Previous>
          <PageGroup isInline align="center" display={{ base: 'none', md: 'flex' }} />
          <Next variant="outline" h={12} w="100px" ml="38px">
            Next
          </Next>
        </Container>
      </Paginator>
    </ChakraProvider>
  );
};

export default CatalogPagination;
