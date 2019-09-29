// @flow
import React from 'react';
import map from 'lodash/map';
import {connect} from "react-redux";

import Card from './../../components/Card';
import Filter from './FilterContainer';
import FastOrCheap from './SortingContainer';
import { ReactComponent as Logo } from "../../assets/MainLogo.svg";

import withLifecycle from "./enhancers/withLifecycle";

import styles from './TicketsContainer.module.css';
import {getTicketsItemsSelector} from "../../redux/selectors";

const TicketsContainer = connect((state) => ({
  tickets: getTicketsItemsSelector(state)
}))(({tickets}) => (
  <div className={styles.tickets}>
    {map(tickets, ({price, carrier, segments}, index) => (
      <Card
        key={index}
        carrier={carrier}
        price={price}
        segments={segments}
      />
    ))}
  </div>
))

const Layout = () =>{
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Logo />
      </div>
      <div className={styles.container}>
        <div className={styles.filter}>
          <Filter />
        </div>
        <div className={styles.content}>
          <FastOrCheap />
          <TicketsContainer />
        </div>
      </div>
    </div>
  )
}

export default withLifecycle(Layout);