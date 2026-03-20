import BackgroundFetch from 'react-native-background-fetch';
import { SyncManager } from './SyncManager';
import { logger } from '../logger/Logger';

const BACKGROUND_FETCH_TASK_ID = 'com.starter_app.background_sync';

export const BackgroundSync = {
  configure: async (): Promise<void> => {
    try {
      const status = await BackgroundFetch.configure(
        {
          minimumFetchInterval: 15,
          stopOnTerminate: false,
          startOnBoot: true,
          enableHeadless: true,
          requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
        },
        async (taskId: string) => {
          logger.info(`[BackgroundSync] Task fired: ${taskId}`);
          try {
            await SyncManager.run();
          } catch (error) {
            logger.error('[BackgroundSync] Sync failed', error);
          } finally {
            BackgroundFetch.finish(taskId);
          }
        },
        (taskId: string) => {
          logger.warn(`[BackgroundSync] Task timeout: ${taskId}`);
          BackgroundFetch.finish(taskId);
        },
      );

      logger.info(`[BackgroundSync] Configured — status: ${status}`);
    } catch (error) {
      logger.error('[BackgroundSync] Configuration failed', error);
    }
  },

  scheduleTask: async (): Promise<void> => {
    try {
      await BackgroundFetch.scheduleTask({
        taskId: BACKGROUND_FETCH_TASK_ID,
        delay: 5000,
        periodic: false,
        requiresNetworkConnectivity: true,
      });
    } catch (error) {
      logger.error('[BackgroundSync] scheduleTask failed', error);
    }
  },

  stop: async (): Promise<void> => {
    await BackgroundFetch.stop();
  },
};
