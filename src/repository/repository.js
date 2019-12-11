// @flow
import axios from 'axios';
import get from 'lodash/get';
import type {SearchId, TicketsServerResponse} from "./types.flow";


const readApiUrlFromEnv = ():string => {
  return process.env.REACT_APP_AVIASALES_API || '';
};

class AppRepository {
  coreUrl = readApiUrlFromEnv()

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
      throw error;
    }
  }

  /**
   * Получаем билеты
   * @param SearchId
   * @returns {Promise<TicketsServerResponse|void|*>}
   */
  async getTickets(searchId: SearchId): Promise<TicketsServerResponse> {
    try {
      const response = await axios.get(`${this.coreUrl}/tickets`, {
        params: {
          searchId
        }
      });

      return get(response, 'data');
    } catch (error) {
      throw error;
      // if (error.response.status === 500) {
      //   return this.getTickets(...arguments);
      // }
      // console.log(error.response.status);
      // console.error(error);
    }
  }
}

export default new AppRepository();