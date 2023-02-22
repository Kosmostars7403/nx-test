export enum ProgressStatus {
  COMPLETE= 'COMPLETE',
  PROCESSING = 'PROCESSING'
}
export interface CheckProgressResponse {
  status?: ProgressStatus,
  [key: string]: number | string | undefined;
}
