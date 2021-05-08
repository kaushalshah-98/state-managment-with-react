export interface IJob {
  id: number;
  type: string;
  status: string | null;
  failedCount: number | null;
  totalCount: number | null;
  data: string | null;
  meta: string | null;
  createdBy: string | null;
}
