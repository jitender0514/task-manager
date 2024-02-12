export interface TaskStatusModel {
  id: string;
  name: string;
  description: string;
  order: number;
  created_at: string;
  updated_at: string | null;
}
