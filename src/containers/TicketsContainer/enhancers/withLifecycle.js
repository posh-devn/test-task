// @flow
import React from 'react';
import {connect} from "react-redux";
import filter from "lodash/omit";
import omit from "lodash/omit";
import {pure, compose} from "recompose";
import type {HOC} from "recompose/dist/Recompose.cjs";

import {getFilterSelector} from "../../../redux/selectors/filterSelectors";
import {getSortingTypeSelector} from "../../../redux/selectors/sortingSelectors";
import {showTickets} from "../../../redux/actions";


import type {FilterStateType} from "../filter-types.flow";
import type  {SortingType} from "../sorting-types.flow";
import {getIsHasLoadDataSelector} from "../../../redux/selectors";


type InProps = {
  filter: FilterStateType,
  sortingType: SortingType,
  isHasLoadData: boolean,
  loadTickets: () => void
}

/**
 * Данный HOC реализует жизненный цикл загрузки билетов
 * @param BaseHOCComponent
 * @returns {Component}
 */
const withLifeCycle: HOC<*, InProps>  = (BaseHOCComponent) => {
  class Component extends React.Component<InProps> {
    componentDidMount() {
      this.props.loadTickets();
    }

    componentDidUpdate(prevProps) {
      if (
        this.props.filter !== prevProps.filter ||
        this.props.sortingType !== prevProps.sortingType
      ) {
        this.props.loadTickets();
      }
    }

    render() {
      // Удаляю пропсы, которые были нужны для вычислений, чтобы нормально сработал pure
      const props = omit(this.props, ['filter', 'sortingType', 'isHasLoadData']);

      return (
        <BaseHOCComponent {...props} />
      )
    }
  }

  return Component;
}

const enhancer: HOC<{
  filter: FilterStateType,
  sortingType: SortingType,
  loadTickets: () => void
}, *> = compose(
  connect((state) => ({
    filter: getFilterSelector(state),
    sortingType: getSortingTypeSelector(state),
    isHasLoadData: getIsHasLoadDataSelector(state),
  }), {
    loadTickets: showTickets
  }),
  withLifeCycle,
  pure
);

export default enhancer;