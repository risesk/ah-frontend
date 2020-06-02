
import {
  SET_DATA_FROM_LOCAL_STORAGE,
  SET_DATA_FROM_GITHUB_API,
  SET_ERROR_FROM_GITHUB_API,
  SET_SORTED_DATA,
} from '../actions/actionsType';

const initialstore = {
  data: [],
  sortDirection: '',
  sortColumnName: '',
  error: null,
  isLoaded: false,
};

const rootReducer = (state = initialstore, action) => {
  switch (action.type) {
    case SET_DATA_FROM_LOCAL_STORAGE:
      return {
        ...state,
        data: action.payload.data,
        sortDirection: action.payload.sortDirection,
        sortColumnName: action.payload.sortColumnName,
        isLoaded: true,
      };
    case SET_DATA_FROM_GITHUB_API:
      return {
        ...state,
        data: action.payload,
        isLoaded: true,
      };
    case SET_ERROR_FROM_GITHUB_API:
      return {
        ...state,
        isLoaded: true,
        error: action.payload,
      };
    case SET_SORTED_DATA:
      return {
        ...state,
        data: action.payload.data,
        sortDirection: action.payload.sortDirection,
        sortColumnName: action.payload.sortField,
      };
    default: return state;
  }
};
export default rootReducer;
