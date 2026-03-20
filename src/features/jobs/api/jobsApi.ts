import axiosInstance from '../../../core/api/axiosInstance';
import { CreateJobPayload, Job, UpdateJobPayload } from '../types';

export const jobsApi = {
  fetchJobs: async (): Promise<Job[]> => {
    const { data } = await axiosInstance.get<Job[]>('/jobs');
    return data;
  },

  createJob: async (payload: CreateJobPayload): Promise<Job> => {
    const { data } = await axiosInstance.post<Job>('/jobs', payload);
    return data;
  },

  updateJob: async (
    serverId: string,
    payload: Partial<UpdateJobPayload>,
  ): Promise<Job> => {
    const { data } = await axiosInstance.put<Job>(`/jobs/${serverId}`, payload);
    return data;
  },

  deleteJob: async (serverId: string): Promise<void> => {
    await axiosInstance.delete(`/jobs/${serverId}`);
  },
};
