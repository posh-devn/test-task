import {CHANGE_SORTING_ACTION} from "../actions";
import {CHEAP_SORTING} from "../../containers/TicketsContainer/sorting";
import {SORTING_TYPE_KEY} from "../selectors/sortingSelectors";

const DEFAULT_FILTER_STATE = {
  [SORTING_TYPE_KEY]: CHEAP_SORTING
};

const sorting = (state = DEFAULT_FILTER_STATE, action) => {
  switch (action.type) {
    case CHANGE_SORTING_ACTION:
      const { sortingType } = action;

      return {
        ...state,
        [SORTING_TYPE_KEY]: sortingType
      };
    default:
      return state
  }
}

export default sorting;