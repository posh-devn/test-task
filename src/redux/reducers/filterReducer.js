import mapValues from "lodash/mapValues";
import {
  FILTER_OPTIONS,
  ONE_JUMP_FILTER
} from "../../containers/TicketsContainer/filter";
import {SET_FILTER_ACTION} from "../actions";

const DEFAULT_FILTER_STATE = {
  ...mapValues(FILTER_OPTIONS, () => false),
  [ONE_JUMP_FILTER]: true
};

const filter = (state = DEFAULT_FILTER_STATE, action) => {
  switch (action.type) {
    case SET_FILTER_ACTION:
      const {filter} = action;

      return {...filter};
    default:
      return state
  }
}

export default filter;