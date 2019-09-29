// @flow
import React from 'react';
import map from 'lodash/map';

import enhanceSegmentsFormatData from './enhanceSegmentsFormatData'

import type {Ticket} from "../../repository";
import type {EnhancedTicketSegment} from "./enhanceSegmentsFormatData";

import styles from './Card.module.css';

type SegmentType = EnhancedTicketSegment;

type Props = {
  ...Ticket,
  segments: Array<SegmentType>
}

/**
 * Форматируем цену
 * @param price
 * @returns {string}
 */
const formatPrice = (price) =>
  price.toFixed(0).replace(/(\d)(?=(\d{3})+\b)/g,'$1 ');

const CardView = ({carrier, price, segments}: Props) => (
  <div className={styles.wrapper}>
    <div className={styles.commonInfo}>
      <div className={styles.price}>{formatPrice(price)} Р</div>
      <div><img width={99} height={36} src={`//pics.avs.io/99/36/${carrier}.png`}/></div>
    </div>
      {map(segments, ({
        origin,
        destination,
        stops,
        countJumps,
        formatedTime,
        formatedDuration,
        declensionJumpWord
      }: SegmentType, index) => (
        <div key={index} className={styles.details}>
          <div className={styles.cell}>
            <div className={styles.title}>{origin} – {destination}</div>
            <div className={styles.value}>{formatedTime}</div>
          </div>
          <div className={styles.cell}>
            <div className={styles.title}>В пути</div>
            <div className={styles.value}>{formatedDuration}</div>
          </div>
          <div className={styles.cell}>
            {countJumps > 0 && (
              <React.Fragment>
                <div className={styles.title}>{countJumps} {declensionJumpWord}</div>
                <div className={styles.value}>{stops.join(', ')}</div>
              </React.Fragment>
            )}
          </div>
        </div>
      ))}
  </div>
);

export default enhanceSegmentsFormatData(CardView);