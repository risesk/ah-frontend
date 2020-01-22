import {
    GET_DATA_FROM_LOCAL_STORAGE,
    GET_DATA_FROM_GITHUB_API,
    GET_ERROR_FROM_GITHUB_API,
    SORT_DATA
  } from './actionsType';

export const getDataFromLocalStorage = data => ({
  type: GET_DATA_FROM_LOCAL_STORAGE,
  payload: data
});

export const getDataFromGthubApi = data => ({
  type: GET_DATA_FROM_GITHUB_API,
  payload: data
});

export const getErrorFromGthubApi = error => ({
  type: GET_ERROR_FROM_GITHUB_API,
  payload: error
});

export const sortData = data => ({
  type: SORT_DATA,
  payload: data
});
