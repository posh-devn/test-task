// @flow
export type CarrierCode = string;

export type TicketSegment = {
  // Код города (iata)
  origin: string;
  // Код города (iata)
  destination: string;
  // Дата и время вылета туда
  date: string;
  // Массив кодов (iata) городов с пересадками
  stops: string[];
  // Общее время перелёта в минутах
  duration: number
}

export interface Ticket {
  // Цена в рублях
  price: number;
  // Код авиакомпании (iata)
  carrier: CarrierCode;
  // Массив перелётов.
  // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
  segments: Array<TicketSegment>
}

export type TicketsServerResponse = {
  stop: boolean,
  tickets: Array<Ticket>
}

export type SearchId = string