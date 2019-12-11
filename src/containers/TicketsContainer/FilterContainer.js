// @flow
import {
  compose,
  mapProps,
  withHandlers,
  withPropsOnChange,
} from "recompose";
import { connect } from 'react-redux'
import type { HOC } from "recompose/dist/Recompose.cjs";

import keys from "lodash/keys";
import get from "lodash/get";
import pickBy from "lodash/pickBy";
import mapValues from "lodash/mapValues";

import {setFilter as setFilterAction} from "../../redux/actions";
import FilterComponent from '../../components/Filter';
import type {FilterStateType, FilterType} from "./filter-types.flow";

import {
  FILTER_OPTIONS,
  ALL_OPTION_FILTER,
} from "./filter";
import {getFilter} from "../../redux/selectors/filterSelectors";

const getFilterStateByType = (props, filter: FilterType): boolean => get(props, ['value', filter]);
const unselectOptions = (filterValue, filter: FilterType):FilterStateType => ({
  ...filterValue,
  [filter]: false
})
const unselectAllOptions = (FILTER_OPTIONS): FilterStateType => mapValues(FILTER_OPTIONS, () => false)
const selectAllOptions = (FILTER_OPTIONS): FilterStateType => mapValues(FILTER_OPTIONS, () => true)
const getOnlyActiveFilters = (filterValue): Array<FilterType> => keys(pickBy(filterValue, (value) => value))

/**
 * Данный HOC подготавливает пропсы для компонента фильтров
 */
const enhancer: HOC<{
  name: string,
  options: {[FilterType]: string},
  value: Array<FilterType>,
  onChangeOption: (code:string, value: boolean) => void
}, *> = compose(
  connect((state) => ({
    value: getFilter(state)
  }), {
    setFilter: setFilterAction
  }),
  withHandlers({
    // Событие срабатывает при изменении фильтра в компоненте фильтр
    // Пробрасываю эти изменения выше в состояние фильтра
    //
    // Так же контролиурю целостность опций фильтра
    onChangeOption: (props) => (code:FilterType, state:boolean) => {
      const {
        setFilter,
        value
      } = props;

      // Если была изменена опция ALL_OPTION_FILTER,
      // изменяю все значения опций в зависимости от состояния ALL_OPTION_FILTER
      if (code === ALL_OPTION_FILTER) {
        setFilter(
          state ?
            selectAllOptions(value) :
            unselectAllOptions(value)
        );
      } else {
        let newFilterValue = value;

        // Если снимается опция фильтра и в этот момент опция ALL_OPTION_FILTER активна
        // Проставляем ALL_OPTION_FILTER в false
        if (
          !state &&
          getFilterStateByType(props, ALL_OPTION_FILTER) === true
        ) {
          newFilterValue = unselectOptions(newFilterValue, ALL_OPTION_FILTER);
        }

        setFilter({
          ...newFilterValue,
          [code]: state
        });
      }
    }
  }),
  withPropsOnChange(['value'], ({value}) => {
    return {
      value: getOnlyActiveFilters(value)
    }
  }),
  mapProps(({value, onChangeOption}) => ({
    name: 'Количество пересадок',
    options: FILTER_OPTIONS,
    value,
    onChangeOption
  })),
);

export default enhancer(FilterComponent);