import get from 'lodash/get';

export const SORTING_ROOT_KEY = 'sorting';
export const SORTING_TYPE_KEY = 'type';

export const getSorting = (state) => get(state, SORTING_ROOT_KEY);
export const getSortingType = (state) => get(getSorting(state), SORTING_TYPE_KEY);
