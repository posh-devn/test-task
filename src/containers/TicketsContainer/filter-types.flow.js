// @flow
import type {Ticket, TicketSegment} from "../../repository";

export type FilterPredicateFunctionType = (ticket: Ticket) => Array<TicketSegment>;
export type FilterType = string;
export type FilterStateType = {
  [FilterType]: boolean,
}