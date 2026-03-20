import { SyncQueue, SyncItem } from './SyncQueue';
import { NetworkService } from '../network/NetworkService';
import { logger } from '../logger/Logger';
import { AppUtils } from '../../utils/AppUtils';

type EntitySyncHandler = (item: SyncItem) => Promise<void>;

const registry = new Map<string, EntitySyncHandler>();

const BACKOFF_BASE_MS = 1000;

export const SyncManager = {
  register: (entity: string, handler: EntitySyncHandler): void => {
    registry.set(entity, handler);
  },

  run: async (): Promise<void> => {
    if (!NetworkService.isOnline()) {
      logger.info('[SyncManager] Offline — skipping sync');
      return;
    }

    const pending = SyncQueue.getPending();
    if (pending.length === 0) {
      logger.info('[SyncManager] Nothing to sync');
      return;
    }

    logger.info(`[SyncManager] Processing ${pending.length} item(s)`);

    for (const item of pending) {
      const handler = registry.get(item.entity);

      if (!handler) {
        logger.warn(`[SyncManager] No handler for entity: ${item.entity}`);
        continue;
      }

      const backoffMs = BACKOFF_BASE_MS * Math.pow(2, item.retries);
      if (item.retries > 0) {
        await AppUtils.delay(backoffMs);
      }

      try {
        await handler(item);
        SyncQueue.markSynced(item.id);
        logger.info(`[SyncManager] Synced item ${item.id} (${item.entity})`);
      } catch (error) {
        SyncQueue.markFailed(item.id);
        logger.warn(
          `[SyncManager] Failed item ${item.id} (${item.entity}) — retry #${item.retries + 1}`,
          error,
        );
      }
    }

    SyncQueue.clearSynced();
    logger.info('[SyncManager] Sync cycle complete');
  },
};
