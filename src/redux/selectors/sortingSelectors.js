import get from 'lodash/get';

export const SORTING_ROOT_KEY = 'sorting';
export const SORTING_TYPE_KEY = 'type';

export const getSortingSelector = state => get(state, SORTING_ROOT_KEY);
export const getSortingTypeSelector = state => get(getSortingSelector(state), SORTING_TYPE_KEY)