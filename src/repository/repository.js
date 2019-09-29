// @flow
import axios from 'axios';
import get from 'lodash/get';
import type {SearchId, Ticket, TicketsServerResponse} from "./types.flow";


const readApiUrlFromEnv = ():string => {
  return process.env.REACT_APP_AVIASALES_API || '';
};

class AppRepository {
  coreUrl = readApiUrlFromEnv()

  // FIXME Конечно костыль, но я уже подустал
  _ticketsStorage = [];
  _searchIdHasLoadStorage = {};

  /**
   * Получаем id поиска
   * @returns {Promise<string|void>}
   */
  async createSearch(): Promise<SearchId | void> {
    try {
      const response = await axios.get(`${this.coreUrl}/search`);
      const searchId: string = get(response, 'data.searchId');

      if (!searchId) {
        throw new Error('Ошибка получения searchId');
      }

      return searchId;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Получаем билеты
   * Все билеты складываем в _searchIdHasLoadStorage, и при следующем запросе конкатанируем с другими
   * Если stop = false всегда возвращаем билеты из _searchIdHasLoadStorage
   * @param SearchId
   * @returns {Promise<TicketsServerResponse|void|*>}
   */
  async getTickets(searchId: SearchId): Promise<TicketsServerResponse | void> {
    try {
      // FIXME костыли
      // По хорошему унжно было создать обхект который подключается к серверу из componentDidMount
      // у которого был бы метол listen() который срабатывал бы при любых обновлениях
      //
      // Если возникнет необходимость, доделаю
      if (this._searchIdHasLoadStorage[searchId]) {
        return {
          stop: true,
          tickets: [...this._ticketsStorage]
        };
      }

      const response = await axios.get(`${this.coreUrl}/tickets`, {
        params: {
          searchId
        }
      });
      const result = get(response, 'data');

      // FIXME Конечно костыль, но я уже подустал
      const {tickets, stop} = result;
      this._ticketsStorage = [
        ...this._ticketsStorage,
        ...tickets
      ];
      this._searchIdHasLoadStorage[searchId] = stop;

      return {
        ...result,
        tickets: [...this._ticketsStorage]
      };
    } catch (error) {
      if (error.response.status === 500) {
        return this.getTickets(...arguments);
      }
      // console.log(error.response.status);
      console.error(error);
    }
  }
}

export default new AppRepository();