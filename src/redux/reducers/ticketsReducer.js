import {
  SET_FETCHING_TICKETS_ACTION,
  SET_HAS_LOAD_DATA_ACTION,
  SET_SEARCH_ID_ACTION,
  SET_TICKETS_ACTION
} from "../actions";
import {
  TICKET_ITEMS_KEY,
  TICKET_SEARCH_ID_KEY,
  TICKETS_FETCHING_STATE_KEY,
  TICKETS_HAS_LOAD_DATA_KEY
} from "../selectors";

const DEFAULT_FILTER_STATE = {
  [TICKET_ITEMS_KEY]: [],
  [TICKET_SEARCH_ID_KEY]: null,
  [TICKETS_HAS_LOAD_DATA_KEY]: null,
  [TICKETS_FETCHING_STATE_KEY]: false
};

const tickets = (state = DEFAULT_FILTER_STATE, action) => {
  switch (action.type) {
    case SET_FETCHING_TICKETS_ACTION:
      const {isFetching} = action;

      return {
        ...state,
        [TICKETS_FETCHING_STATE_KEY]: isFetching
      };
    case SET_HAS_LOAD_DATA_ACTION:
      const {isHasLoadData} = action;

      return {
        ...state,
        [TICKETS_HAS_LOAD_DATA_KEY]: isHasLoadData
      }
    case SET_SEARCH_ID_ACTION:
      const {searchId} = action;

      return {
        ...state,
        [TICKET_SEARCH_ID_KEY]: searchId
      }
    case SET_TICKETS_ACTION:
      const {tickets} = action;

      return {
        ...state,
        items: [...tickets]
      }
    default:
      return state
  }
}

export default tickets;