// @flow
import React from 'react';
import {connect} from "react-redux";
import omit from "lodash/omit";
import {pure, compose} from "recompose";
import type {HOC} from "recompose/dist/Recompose.cjs";

import {pushTickets} from "../../../redux/actions";

import repository, {PacketTicketsLoader} from "../../../repository";

import type {Ticket} from "../../../repository";

type InProps = {
  pushTickets: (Array<Ticket>) => void,
}

/**
 * Данный HOC реализует жизненный цикл загрузки билетов
 * @param BaseHOCComponent
 * @returns {Component}
 */
const withLifeCycle: HOC<*, InProps>  = (BaseHOCComponent) => {
  class Component extends React.Component<InProps> {
    packetLoader: PacketTicketsLoader;

    async componentDidMount() {
      // Получаем SearchId
      const searchId = await repository.createSearch();

      // Инициализируем пакетный загрузчик билетов
      this.packetLoader = new PacketTicketsLoader(
        searchId,
        this.onLoadPacket,
        1000
      );
      this.packetLoader.load();
    }

    /**
     * Функция callback для срабатывания загрузчика пакетов
     * @param tickets
     */
    onLoadPacket = (tickets: Array<Ticket>) => {
      this.props.pushTickets(tickets);
    }

    componentWillUnmount() {
      this.packetLoader.destroy();
    }

    render() {
      // Удаляем ненужные пропсы
      return (
        <BaseHOCComponent {...omit(this.props, ['pushTickets'])} />
      )
    }
  }

  return Component;
}

const enhancer: HOC<*, *> = compose(
  connect(null, {
    pushTickets
  }),
  withLifeCycle,
  pure
);

export default enhancer;