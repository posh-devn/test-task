// @flow
import sortBy from "lodash/sortBy";
import sumBy from "lodash/sumBy";
import type {SortingType} from "./sorting-types.flow";
import type {Ticket} from "../../repository";

export const FAST_SORTING: SortingType = 'FAST';
export const CHEAP_SORTING: SortingType = 'CHEAP';

const fastSorting = (tickets: Array<Ticket>) => sortBy(tickets, ({segments}) => {
  return sumBy(segments, 'duration');
});

const cheapSorting = (tickets: Array<Ticket>) => sortBy(tickets, 'price');

export const SORT_FUNCTIONS = {
  [FAST_SORTING]: fastSorting,
  [CHEAP_SORTING]: cheapSorting,
}