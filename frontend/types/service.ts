export interface Service {
  id: number;
  name: string;
  description: string | null;
  active: boolean;
}

export interface ServiceCreate {
  name: string;
  description: string | null;
  active: boolean;
}

export interface ServiceUpdate {
  name?: string;
  description?: string | null;
  active?: boolean;
}
