// @flow
import {withPropsOnChange} from "recompose";
import moment from 'moment';
import get from 'lodash/get';
import map from 'lodash/map';

import type {HOC} from "recompose/dist/Recompose.cjs";
import type {TicketSegment} from "../../repository";

export type EnhancedTicketSegment = {
  ...TicketSegment,
  countJumps: number,
  formatedTime: string,
  formatedDuration: string,
  declensionJumpWord: string,
}

/**
 * Склонение слов от числительных
 */
const declension = (oneNominative, severalGenitive, severalNominative, numberValue) => {
  let number = numberValue % 100;

  return (number <= 14 && number >= 11)
    ? severalGenitive
    : (number %= 10) < 5
      ? number > 2
        ? severalNominative
        : number === 1
          ? oneNominative
          : number === 0
            ? severalGenitive
            : severalNominative
      : severalGenitive
    ;
}

/**
 * Добавляем в данные сегмента отформатированные значения для отображения
 * @type {HOC}
 */
const enhanceSegmentsFormatData: HOC<{
  segments: Array<EnhancedTicketSegment>
}, {
  segments: TicketSegment
}> = withPropsOnChange(['segments'], ({segments}) => {
  return {
    segments: map(segments, (segment) => {
      const date = moment(segment.date);
      const dateTo = date.clone().add(segment.duration, 'minutes');
      const diffDuration = moment.duration(dateTo.diff(date));

      const countJumps = get(segment, 'stops.length', 0);

      return {
        ...segment,
        countJumps,
        formatedTime: `${date.format('HH:mm')} - ${dateTo.format('HH:mm')}`,
        formatedDuration: `${Math.floor(diffDuration.asHours())}ч ${Math.floor(diffDuration.minutes())}м`,
        declensionJumpWord:
          countJumps ? declension(
            'пересадка',
            'пересадки',
            'пересадки',
            countJumps
          ) : ''
      };
    })
  }
});

export default enhanceSegmentsFormatData;