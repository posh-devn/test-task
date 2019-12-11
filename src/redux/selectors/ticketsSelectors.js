import get from 'lodash/get';
import { createSelector } from 'reselect';
import { getSortingType } from './sortingSelectors';
import { getFilter } from './filterSelectors';

import { SORT_FUNCTIONS } from '../../containers/TicketsContainer/sorting';
import type {FilterStateType, FilterType} from "../../containers/TicketsContainer/filter-types.flow";
import filter from "lodash/filter";
import map from "lodash/map";
import pickBy from "lodash/pickBy";
import transform from "lodash/transform";

import {
  composeFilterPredicateFunctions,
  FILTER_PREDICATES} from "../../containers/TicketsContainer/filter";

export const TICKETS_ROOT_KEY = 'tickets';
export const TICKET_ITEMS_KEY = 'items';

export const getTickets = (state) => get(state, TICKETS_ROOT_KEY);
export const getTicketsItems = (state) => get(getTickets(state), TICKET_ITEMS_KEY);
export const selectSortedTickets = createSelector(
  getTicketsItems,
  getSortingType,
  (tickets, sortingType) => {
    const sortFunction = SORT_FUNCTIONS[sortingType];

    return sortFunction(tickets);
  },
);
export const selectFilteredTickets = createSelector(
  selectSortedTickets,
  getFilter,
  (tickets, filterState: FilterStateType) => {
    // Получаем необходимые предикаты для фильтрации
    const predicates = filter(map(pickBy(filterState), (_, code: FilterType) => {
      return FILTER_PREDICATES[code];
    }));

    // формируем тикеты для отображения
    const filteredTicket = transform(tickets, (memo, value) => {
      const isMatch = composeFilterPredicateFunctions(...predicates);

      // проверка на предикаты фильтрации
      if (isMatch(value)) {
        memo.push(value);
      }

      // Держим только 5 билетов, так как в ТЗ достаточно вывести 5
      if (memo.length >= 5) return false;
    }, []);

    return filteredTicket;
  }
);