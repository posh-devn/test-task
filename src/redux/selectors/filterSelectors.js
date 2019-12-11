import get from 'lodash/get';

export const FILTER_ROOT_KEY = 'filter';

export const getFilter = (state) => get(state, FILTER_ROOT_KEY);
