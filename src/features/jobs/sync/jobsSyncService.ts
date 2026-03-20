import { SyncManager } from '../../../core/sync/SyncManager';
import { SyncItem } from '../../../core/sync/SyncQueue';
import { jobsApi } from '../api/jobsApi';
import { CreateJobPayload } from '../types';
import { logger } from '../../../core/logger/Logger';

const ENTITY = 'jobs';

export const registerJobsSyncHandler = (): void => {
  SyncManager.register(ENTITY, async (item: SyncItem) => {
    switch (item.operation) {
      case 'create': {
        const payload = item.payload as CreateJobPayload;
        const serverJob = await jobsApi.createJob(payload);
        logger.info(`[JobsSync] Created job on server: ${serverJob.serverId}`);
        break;
      }
      case 'update': {
        const { serverId, ...rest } = item.payload as {
          serverId: string;
        } & Partial<CreateJobPayload>;
        await jobsApi.updateJob(serverId, rest);
        logger.info(`[JobsSync] Updated job on server: ${serverId}`);
        break;
      }
      case 'delete': {
        const { serverId } = item.payload as { serverId: string };
        await jobsApi.deleteJob(serverId);
        logger.info(`[JobsSync] Deleted job on server: ${serverId}`);
        break;
      }
      default:
        logger.warn(`[JobsSync] Unknown operation: ${item.operation}`);
    }
  });
};
