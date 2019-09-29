import type {SortingType} from "../../containers/TicketsContainer/sorting-types.flow";

export const CHANGE_SORTING_ACTION = 'CHANGE_SORTING';

export const changeSorting = (type: SortingType) => ({
  type: CHANGE_SORTING_ACTION,
  sortingType: type
})