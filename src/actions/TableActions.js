import {
  SET_DATA_FROM_LOCAL_STORAGE,
  SET_DATA_FROM_GITHUB_API,
  SET_ERROR_FROM_GITHUB_API,
  SET_SORTED_DATA,
} from './actionsType';

export const setDataFromLocalStorage = (data) => ({
  type: SET_DATA_FROM_LOCAL_STORAGE,
  payload: data,
});

export const setDataFromGthubApi = (data) => ({
  type: SET_DATA_FROM_GITHUB_API,
  payload: data,
});

export const setErrorFromGthubApi = (error) => ({
  type: SET_ERROR_FROM_GITHUB_API,
  payload: error,
});

export const setSortedData = (data) => ({
  type: SET_SORTED_DATA,
  payload: data,
});
