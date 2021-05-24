import { setIsAuthenticated, setPagination, setComicses, setUser } from './actions';
import { socket } from '../socketioConfig/socketioConfig';

export const fetchAuthenticatedStatusThunk = async dispatch => {
  const response = await fetch('http://localhost:5000/auth/me', { credentials: 'include' });
  const user = await response.json();
  if (response.status === 200) {
    dispatch(setUser(user));
    dispatch(setIsAuthenticated(true));
  } else {
    dispatch(setIsAuthenticated(false));
  }
};

export const fetchComicsesThunkCreator = (page, size) => async (dispatch, getState) => {
  const state = getState();
  const { filters, sort } = state;

  const publisher = filters.publishers.join(',');
  const character = filters.characters.join(',');
  const { title } = filters;

  const response = await fetch(
    `http://localhost:5000/comics?publisher=${publisher}&character=${character}&title=${title}&sort=${sort}&page=${page}&size=${size}`,
    { credentials: 'include' }
  );
  if (response.status === 200) {
    const { comics, ...paginationResponse } = await response.json();
    dispatch(setPagination(paginationResponse));
    dispatch(setComicses(comics));
  }
};

export const logOutThunk = async dispatch => {
  const response = await fetch('http://localhost:5000/auth/logout', { credentials: 'include' });
  if (response.status === 200) {
    socket.disconnect();
    dispatch(setIsAuthenticated(false));
    dispatch(setUser(null));
  }
};
