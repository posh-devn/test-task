// @flow
import get from 'lodash/get';
import type {SearchId, Ticket, TicketsServerResponse} from "./types.flow";
import repository from "./repository";

/**
 * как по ТЗ так и я планировал написать клиент для LongPolling
 * Но посмотрев как отвечает сервер на запросы, я понял что это не соответствует LongPolling,
 * либо я не понял ТЗ
 *
 * По этому пишу обычный пакетный загрузчик который будет по интервалу догружать тикеты
 */
class PacketTicketsLoader {
  _searchId: SearchId;
  _timeout: number;
  _isHasLoadData: boolean;
  _intervalId: TimeoutID;
  _onLoadPacket: (Array<Ticket>) => void;

  constructor(
    searchId: SearchId,
    onLoad: (Array<Ticket>) => void,
    timeout: 3000
  ) {
    this._onLoadPacket = onLoad;
    this._searchId = searchId;
    this._timeout = timeout;
  }

  /**
   * Метод запускает опрос сервера с заданным интервалом
   * @returns {Promise<void>}
   */
  async load() {
    try {
      const {tickets, stop}: TicketsServerResponse = await repository.getTickets(this._searchId);

      this._isHasLoadData = stop;
      this._onLoadPacket(tickets);
    } catch (error) {
      // На 500 ошибку мы закрываем глаза
      // Но на любую другую ошибку мы перестаем опрашивать сервер
      if (get(error, 'response.status') !== 500) {
        this._isHasLoadData = true;
      }
    } finally {
      // Если мы считаем что данные еще не загружены, отправляем еще запрос
      if (!this.isHasLoadData()) {
        this._intervalId = setTimeout(() => {
          this.load();
        }, this._timeout);
      }
    }
  }

  isHasLoadData() {
    return this._isHasLoadData;
  }

  destroy() {
    clearTimeout(this._intervalId);
  }
}


export default PacketTicketsLoader;