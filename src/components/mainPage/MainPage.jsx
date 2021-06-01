import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import CatalogHeader from './CatalogHeader';
import CatalogSidebar from './CatalogSidebar';
import { CatalogGrid } from './CatalogGrid';
import MobileDrawer from './MobileDrawer';
import { setCharacters, setPublishers } from '../../redux/actions';
import { fetchComicsesThunkCreator } from '../../redux/thunks';
import ChatWindow from './chat/ChatWindow';

const MainPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.isAuthenticated);
  const comicsDiscussed = useSelector(state => state.comicsDiscussed);

  useEffect(() => {
    const fetchCharactes = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACK_END_DOMAIN}/character`, {
        credentials: 'include',
      });
      if (response.status === 200) {
        const characters = await response.json();
        dispatch(setCharacters(characters));
      }
    };
    fetchCharactes();

    const fetchPublishers = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACK_END_DOMAIN}/publisher`, {
        credentials: 'include',
      });
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
    <Box pb={8} pt="80px">
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
