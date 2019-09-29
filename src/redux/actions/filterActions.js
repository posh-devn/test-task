import type {FilterStateType} from "../../containers/TicketsContainer/filter-types.flow";

export const SET_FILTER_ACTION = 'SET_FILTER_ACTION';

export const setFilter = (filter: FilterStateType) => ({
  type: SET_FILTER_ACTION,
  filter
});