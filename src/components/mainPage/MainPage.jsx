import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import CatalogHeader from './CatalogHeader';
import CatalogSidebar from './CatalogSidebar';
import { CatalogGrid } from './CatalogGrid';
import MobileDrawer from './MobileDrawer';
import { setCharacters, setPublishers, setComicses, setPagination } from '../../redux/actions';
import { fetchComicsesThunkCreator } from '../../redux/thunks';
import ChatWindow from './chat/ChatWindow';

const MainPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.isAuthenticated);
  const comicsDiscussed = useSelector(state => state.comicsDiscussed);

  useEffect(() => {
    const fetchCharactes = async () => {
      const response = await fetch('http://localhost:5000/character', { credentials: 'include' });
      if (response.status === 200) {
        const characters = await response.json();
        dispatch(setCharacters(characters));
      }
    };
    fetchCharactes();

    const fetchPublishers = async () => {
      const response = await fetch('http://localhost:5000/publisher', { credentials: 'include' });
      if (response.status === 200) {
        const publishers = await response.json();
        dispatch(setPublishers(publishers));
      }
    };
    fetchPublishers();

    dispatch(fetchComicsesThunkCreator());
  }, [dispatch]);

  if (!isAuthenticated) return <Redirect to="/auth/login" />;

  return (
    <Box
      pb={8}
      pt="80px"
      // bg="linear-gradient(#e66465, #9198e5)"
      // bg="linear-gradient(45deg, #9dc66b 5%, #4fa49a 30%, #4361c2)"
      // bg="#f0f4f4"
      // bg="#323459 linear-gradient(135deg, rgba(114, 97, 147, 0.175) 25%, rgba(227, 123, 124, 0.175) 50%, rgba(255, 228, 180, 0.175))"
      // alignItems="flex-start"
    >
      <CatalogHeader onOpen={onOpen} />
      <MobileDrawer isOpen={isOpen} onClose={onClose} />
      <Flex
        w="100%"
        px={{ base: 0, sm: 2, md: 4 }}
        pl={{ md: 8 }}
        pr={{ md: '6%' }}
        alignItems="flex-start"
      >
        <CatalogSidebar />
        <CatalogGrid />
        {comicsDiscussed._id ? (
          <ChatWindow key={comicsDiscussed._id} comics={comicsDiscussed} />
        ) : null}
      </Flex>
    </Box>
  );
};

export default MainPage;
