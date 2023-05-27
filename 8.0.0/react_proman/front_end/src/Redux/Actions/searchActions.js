import * as types from '../Constants/ActionTypes';

export const setSearch = searchText => ({
  type: types.SET_SEARCH,
  data: searchText
});
