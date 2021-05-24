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

const initState = {
  isAuthenticated: false,
  user: {
    email: '',
    displayName: '',
  },
  characters: [],
  publishers: [],
  comicses: [],
  filters: {
    characters: [],
    publishers: [],
    title: '',
  },
  sort: '', // reviewCount | rating | title
  pagination: {}, // { page, size, totalPageCount, comicsFound, previous, next }
  comicsDiscussed: {},
};

function reducer(state = initState, action) {
  switch (action.type) {
    case SET_IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
      };
    case SET_CHARACTERS:
      return {
        ...state,
        characters: action.characters,
      };
    case SET_PUBLISHERS:
      return {
        ...state,
        publishers: action.publishers,
      };
    case SET_COMICSES:
      return {
        ...state,
        comicses: action.comicses,
      };
    case SET_PAGINATION:
      return {
        ...state,
        pagination: action.pagination,
      };
    case ADD_CHARACTER_TO_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          characters: [...state.filters.characters, action.character],
        },
      };
    case REMOVE_CHARACTER_FROM_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          characters: state.filters.characters.filter(character => character !== action.character),
        },
      };
    case ADD_PUBLISHER_TO_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          publishers: [...state.filters.publishers, action.publisher],
        },
      };
    case REMOVE_PUBLISHER_FROM_FOLTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          publishers: state.filters.publishers.filter(publisher => publisher !== action.publisher),
        },
      };
    case SET_TITLE_TO_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          title: action.title,
        },
      };
    case SET_SORT:
      return {
        ...state,
        sort: action.criterion,
      };
    case SET_COMICS_DISCUSSED:
      return {
        ...state,
        comicsDiscussed: action.comics,
      };
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          characters: [],
          publishers: [],
          title: '',
        },
      };
    default:
      return state;
  }
}

export default reducer;
