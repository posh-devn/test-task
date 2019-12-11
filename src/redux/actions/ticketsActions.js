import type {Ticket} from "../../repository";

export const PUSH_TICKETS_ACTION = 'PUSH_TICKETS';

export const pushTickets = (tickets: Array<Ticket>) => ({
  type: PUSH_TICKETS_ACTION,
  tickets
});