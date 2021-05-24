import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Image, Badge, Tooltip, AspectRatio, Button, Spacer } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { setComicsDiscussed } from '../../redux/actions';

export const Card = ({ comics }) => {
  const { imageUrl, badge, publisher, title, reviewCount, rating } = comics;
  const dispatch = useDispatch();

  const onDiscussClicked = () => {
    dispatch(setComicsDiscussed(comics));
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" minW="270px" w="100%">
      <AspectRatio ratio={9 / 14}>
        <Image src={imageUrl} />
      </AspectRatio>

      <Box p="6">
        <Box d="flex" alignItems="baseline">
          {badge && (
            <Badge borderRadius="full" px="2" colorScheme="teal" mr="2">
              {badge}
            </Badge>
          )}
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
          >
            {publisher.name}
          </Box>
        </Box>
        <Tooltip label={title} fontSize="md" placement="top-start">
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
            {title}
          </Box>
        </Tooltip>

        <Box d="flex" mt="3" alignItems="center">
          {rating &&
            Array(5)
              .fill('')
              .map((_, i) => <StarIcon key={i} color={i < rating ? 'teal.500' : 'gray.300'} />)}
          {reviewCount ? (
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {reviewCount} reviews
            </Box>
          ) : (
            <Box as="span" color="gray.600" fontSize="sm">
              no reviews
            </Box>
          )}
          <Spacer />
          <Button size="sm" colorScheme="yellow" onClick={onDiscussClicked}>
            Discuss
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
