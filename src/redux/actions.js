import {
  SET_IS_AUTHENTICATED,
  SET_CHARACTERS,
  SET_PUBLISHERS,
  SET_COMICSES,
  SET_PAGINATION,
  ADD_CHARACTER_TO_FILTER,
  REMOVE_CHARACTER_FROM_FILTER,
  ADD_PUBLISHER_TO_FILTER,
  REMOVE_PUBLISHER_FROM_FOLTER,
  SET_TITLE_TO_FILTER,
  SET_SORT,
  SET_COMICS_DISCUSSED,
  SET_USER,
  CLEAR_FILTERS,
} from './actionTypes';

export const setIsAuthenticated = boolean => ({
  type: SET_IS_AUTHENTICATED,
  isAuthenticated: boolean,
});

export const setCharacters = characters => ({
  type: SET_CHARACTERS,
  characters,
});

export const setPublishers = publishers => ({
  type: SET_PUBLISHERS,
  publishers,
});

export const setComicses = comicses => ({
  type: SET_COMICSES,
  comicses,
});

export const setPagination = options => ({
  type: SET_PAGINATION,
  pagination: options,
});

export const addCharacterToFilter = character => ({
  type: ADD_CHARACTER_TO_FILTER,
  character,
});

export const removeCharacterFromFilter = character => ({
  type: REMOVE_CHARACTER_FROM_FILTER,
  character,
});

export const addPublisherToFilter = publisher => ({
  type: ADD_PUBLISHER_TO_FILTER,
  publisher,
});

export const removePublisherFromFilter = publisher => ({
  type: REMOVE_PUBLISHER_FROM_FOLTER,
  publisher,
});

export const setTitleToFlter = title => ({
  type: SET_TITLE_TO_FILTER,
  title,
});

export const setSort = criterion => ({
  type: SET_SORT,
  criterion,
});

export const setComicsDiscussed = comics => ({
  type: SET_COMICS_DISCUSSED,
  comics,
});

export const setUser = user => ({
  type: SET_USER,
  user,
});

export const clearFilters = () => ({
  type: CLEAR_FILTERS,
});
