import transform from "lodash/transform";
import filter from "lodash/filter";
import map from "lodash/map";
import pickBy from "lodash/pickBy";

import {composeFilterPredicateFunctions, FILTER_PREDICATES} from "../../containers/TicketsContainer/filter";
import {SORT_FUNCTIONS} from "../../containers/TicketsContainer/sorting";
import {
  getFilterSelector,
  getSortingTypeSelector,
  getTicketsItemsSelector, getTicketsSearchIdSelector,
} from "../selectors";

import type {FilterType} from "../../containers/TicketsContainer/filter-types.flow";
import type {SearchId, TicketsServerResponse} from "../../repository";

import repository from "../../repository/repository";

export const SHOW_TICKETS_ACTION = 'SHOW_TICKETS';
export const SET_TICKETS_ACTION = 'SET_TICKETS';
export const SET_SEARCH_ID_ACTION = 'SET_SEARCH_ID';
export const SET_HAS_LOAD_DATA_ACTION = 'SET_HAS_LOAD_DATA';
export const SET_FETCHING_TICKETS_ACTION = 'SET_FETCHING_TICKETS';

const setTickets = (tickets) => ({
  type: SET_TICKETS_ACTION,
  tickets
})

const setSearchId = (searchId) => ({
  type: SET_SEARCH_ID_ACTION,
  searchId
})

const setIsHasLoadData = (isHasLoadData) => ({
  type: SET_HAS_LOAD_DATA_ACTION,
  isHasLoadData
})

const setFetchingState = (isFetching: boolean) => ({
  type: SET_FETCHING_TICKETS_ACTION,
  isFetching
})

export const showTickets = () => async (dispatch, getState) => {
  dispatch({
    type: SHOW_TICKETS_ACTION,
  });

  const state = getState();

  const filterState = getFilterSelector(state);
  const sortingType = getSortingTypeSelector(state);
  const stateTickets = getTicketsItemsSelector(state);

  const currentSearchId: SearchId | null = getTicketsSearchIdSelector(state);
  let searchId: SearchId;

  if (currentSearchId === null) {
    searchId = await repository.createSearch();

    // диспачим search id в стейт
    dispatch(setSearchId(searchId));
  } else {
    searchId = currentSearchId;
  }

  const response: TicketsServerResponse = await repository.getTickets(searchId);
  if (!response) {
    console.error('Не удалось получить билеты');
    return;
  }

  // Если во время запросов изменился стейт фильтра или сортировки, завершаем действие, так как запустилось уже другое
  if (
    filterState !== getFilterSelector(getState()) &&
    sortingType !== getSortingTypeSelector(getState())
  ) {
    return;
  }

  const {tickets, stop} = response;
  dispatch(setIsHasLoadData(stop));

  // Получаем необходимые предикаты для фильтрации
  const predicates = filter(map(pickBy(filterState), (_, code: FilterType) => {
    return FILTER_PREDICATES[code];
  }));

  // Выполняем сортировку
  const sortFunction = SORT_FUNCTIONS[sortingType];
  const sortedTickets = sortFunction([
    ...tickets,
    ...stateTickets
  ]);

  // формируем тикеты для отображения
  const newTickets = transform(sortedTickets, (memo, value) => {
    const isMatch = composeFilterPredicateFunctions(...predicates);

    // проверка на предикаты фильтрации
    if (isMatch(value)) {
      memo.push(value);
    }

    // Держим только 5 билетов, так как в ТЗ достаточно вывести 5
    if (memo.length >= 5) return false;
  }, []);

  dispatch(setTickets(newTickets));
}