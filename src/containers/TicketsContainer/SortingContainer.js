// @flow
import {compose, withHandlers, withProps} from 'recompose';
import {connect} from 'react-redux';
import ButtonSwitcher from './../../components/ButtonSwitcher';
import {CHEAP_SORTING, FAST_SORTING} from "./sorting";

import type {HOC} from "recompose/dist/Recompose.cjs";
import type {SortingType} from "./sorting-types.flow";

import {changeSorting} from "../../redux/actions";
import { getSortingType} from "../../redux/selectors/sortingSelectors";

type OutProps = {
  value: SortingType,
  buttons: Array<{
    name: string,
    code: SortingType
  }>,
  onChange: (code: SortingType) => void
}

/**
 * Данный хок подготавливает компонент переключения сортировки для отображения
 */
const enhancer: HOC<OutProps, *> = compose(
  connect(state => ({
    value: getSortingType(state)
  }), {
    changeSorting
  }),
  withHandlers({
    onChange: ({changeSorting}) => (code) => {
      changeSorting(code);
    }
  }),
  withProps({
    buttons: [
      {
        name: 'Самый дешевый',
        code: CHEAP_SORTING
      },
      {
        name: 'Самый быстрый',
        code: FAST_SORTING
      }
    ]
  })
);

export default enhancer(ButtonSwitcher);