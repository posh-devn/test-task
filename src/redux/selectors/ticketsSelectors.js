import get from 'lodash/get';

export const TICKETS_ROOT_KEY = 'tickets';
export const TICKET_ITEMS_KEY = 'items';
export const TICKET_SEARCH_ID_KEY = 'searchId';
export const TICKETS_HAS_LOAD_DATA_KEY = 'isHasLoadData';
export const TICKETS_FETCHING_STATE_KEY = 'isFetching';

export const getTicketsSelector = state => get(state, TICKETS_ROOT_KEY);
export const getTicketsItemsSelector = state => get(getTicketsSelector(state), TICKET_ITEMS_KEY);
export const getTicketsSearchIdSelector = state => get(getTicketsSelector(state), TICKET_SEARCH_ID_KEY);
export const getIsHasLoadDataSelector = state => get(getTicketsSelector(state), TICKETS_HAS_LOAD_DATA_KEY);
export const getIsFetchingSelector = state => get(getTicketsSelector(state), TICKETS_FETCHING_STATE_KEY);