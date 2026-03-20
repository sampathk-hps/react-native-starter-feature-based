import { MMKVStorage } from '../storage/MMKVStorage';
import { v4 as uuidv4 } from 'uuid';

export type SyncStatus = 'pending' | 'synced' | 'failed';

export interface SyncItem<T = unknown> {
  id: string;
  entity: string;
  operation: 'create' | 'update' | 'delete';
  payload: T;
  retries: number;
  createdAt: number;
  status: SyncStatus;
}

const QUEUE_KEY = 'sync_queue';
const MAX_RETRIES = 3;

const readQueue = <T>(): SyncItem<T>[] =>
  MMKVStorage.getObject<SyncItem<T>[]>(QUEUE_KEY) ?? [];

const writeQueue = <T>(queue: SyncItem<T>[]): void =>
  MMKVStorage.setObject(QUEUE_KEY, queue);

export const SyncQueue = {
  enqueue: <T>(
    entity: string,
    operation: SyncItem['operation'],
    payload: T,
  ): SyncItem<T> => {
    const item: SyncItem<T> = {
      id: uuidv4(),
      entity,
      operation,
      payload,
      retries: 0,
      createdAt: Date.now(),
      status: 'pending',
    };

    const queue = readQueue<T>();
    queue.push(item);
    writeQueue(queue);
    return item;
  },

  getPending: <T>(): SyncItem<T>[] =>
    readQueue<T>().filter(item => item.status === 'pending'),

  markSynced: (id: string): void => {
    const queue = readQueue();
    const idx = queue.findIndex(item => item.id === id);
    if (idx !== -1) {
      queue[idx].status = 'synced';
      writeQueue(queue);
    }
  },

  markFailed: (id: string): void => {
    const queue = readQueue();
    const idx = queue.findIndex(item => item.id === id);
    if (idx !== -1) {
      queue[idx].retries += 1;
      queue[idx].status =
        queue[idx].retries >= MAX_RETRIES ? 'failed' : 'pending';
      writeQueue(queue);
    }
  },

  clearSynced: (): void => {
    const queue = readQueue().filter(item => item.status !== 'synced');
    writeQueue(queue);
  },

  getAll: <T>(): SyncItem<T>[] => readQueue<T>(),
};
