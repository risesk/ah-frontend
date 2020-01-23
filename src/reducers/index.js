import {
  GET_DATA_FROM_LOCAL_STORAGE,
  GET_DATA_FROM_GITHUB_API,
  GET_ERROR_FROM_GITHUB_API,
  SORT_DATA,
} from '../actions/actionsType';

const initialstore = {
  data: [],
  sort: '', // 'asc' | 'desc'
  sortColumnName: '',
  error: null,
  isLoaded: false,
};

const rootReducer = (state = initialstore, action) => {
  switch (action.type) {
    case GET_DATA_FROM_LOCAL_STORAGE:
      return {
        ...state,
        data: action.payload.data,
        sort: action.payload.sort,
        sortColumnName: action.payload.sortColumnName,
        isLoaded: true,
      };
    case GET_DATA_FROM_GITHUB_API:
      return {
        ...state,
        data: action.payload,
        isLoaded: true,
      };
    case GET_ERROR_FROM_GITHUB_API:
      return {
        ...state,
        isLoaded: true,
        error: action.payload,
      };
    case SORT_DATA:
      return {
        ...state,
        data: action.payload.data,
        sort: action.payload.sort,
        sortColumnName: action.payload.sortField,
      };
    default: return state;
  }
};
export default rootReducer;
