import {
  PUSH_TICKETS_ACTION,
} from '../actions';
import {
  TICKET_ITEMS_KEY,
} from '../selectors';

const DEFAULT_FILTER_STATE = {
  [TICKET_ITEMS_KEY]: [],
};

const tickets = (state = DEFAULT_FILTER_STATE, action) => {
  switch (action.type) {
    case PUSH_TICKETS_ACTION:
      const { tickets: ticketsItems } = action;

      return {
        ...state,
        [TICKET_ITEMS_KEY]: [
          ...state[TICKET_ITEMS_KEY],
          ...ticketsItems,
        ],
      };
    default:
      return state;
  }
};

export default tickets;
