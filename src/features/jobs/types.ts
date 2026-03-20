import { SyncStatus } from '../../core/sync/SyncQueue';

export interface Job {
  localId: string;
  serverId: string | null;
  title: string;
  description: string;
  syncStatus: SyncStatus;
  createdAt: number;
  updatedAt: number;
}

export interface CreateJobPayload {
  title: string;
  description: string;
}

export interface UpdateJobPayload {
  localId: string;
  title?: string;
  description?: string;
}

export interface JobsState {
  items: Job[];
  loading: boolean;
  error: string | undefined;
}
