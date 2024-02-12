export interface TaskModel {
  id: string;
  title: string;
  description: string;
  status: number;
  created_at: string;
  updated_at: string | null;
  complete_on: string | null;
}
