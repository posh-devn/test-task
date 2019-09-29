// @flow
import filter from 'lodash/filter';
import isEmpty from "lodash/isEmpty";
import reduceRight from "lodash/reduceRight";
import without from "lodash/without";

import type {Ticket} from "../../repository";
import type {FilterPredicateFunctionType, FilterType} from "./filter-types.flow";

// Со всеми пересадками
export const ALL_OPTION_FILTER = 'ALL_OPTION';
// Без пересадок
export const WITHOUT_JUMP_FILTER = 'WITHOUT_JUMP';
// Одна пересадка
export const ONE_JUMP_FILTER = 'ONE_JUMP';
// Две пересадки
export const TWO_JUMP_FILTER = 'TWO_JUMP';
// Три пересадки
export const THREE_JUMP_FILTER = 'THREE_JUMP';

export const FILTER_OPTIONS = {
  [ALL_OPTION_FILTER]: 'Все',
  [WITHOUT_JUMP_FILTER]: 'Без пересадок',
  [ONE_JUMP_FILTER]: 'Одна пересадка',
  [TWO_JUMP_FILTER]: 'Две пересадки',
  [THREE_JUMP_FILTER]: 'Три пересадки',
};

/*
* Функция создают композицию из предикатов фильтра, которая определяет соответствует ли Ticket
* выбранному фильтру
 */
export const composeFilterPredicateFunctions = (...functions: Array<FilterPredicateFunctionType>) =>
  (ticket: Ticket): boolean => {
    return isEmpty(reduceRight(functions, (val, func) => {
      return {
        ...val,
        segments: without(val.segments, ...func(ticket))
      };
    }, ticket).segments);
  };

/*
 * Определение предикатов для фильтра
 * Данные предикаты находят и возвращают, сегменты соответствующие условиям фильтра
 */
const allJumpPredicate: FilterPredicateFunctionType = () => [];
const withoutJumpPredicate: FilterPredicateFunctionType =
  (ticket) => filter(ticket.segments, ({stops}) => stops.length === 0);
const oneJumpPredicate: FilterPredicateFunctionType =
  (ticket) => filter(ticket.segments, ({stops}) => stops.length === 1);
const twoJumpPredicate: FilterPredicateFunctionType =
  (ticket) => filter(ticket.segments, ({stops}) => stops.length === 2);
const threeJumpPredicate: FilterPredicateFunctionType =
  (ticket) => filter(ticket.segments, ({stops}) => stops.length === 3);

/*
* Мапинг предикат функций с кодами фильтров
 */
export const FILTER_PREDICATES: { [FilterType]: FilterPredicateFunctionType } = {
  [ALL_OPTION_FILTER]: allJumpPredicate,
  [WITHOUT_JUMP_FILTER]: withoutJumpPredicate,
  [ONE_JUMP_FILTER]: oneJumpPredicate,
  [TWO_JUMP_FILTER]: twoJumpPredicate,
  [THREE_JUMP_FILTER]: threeJumpPredicate,
};