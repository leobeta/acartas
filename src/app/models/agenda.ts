export interface BasicAgenda {
  id?: number;
  fecha: string;
  patientId: number;
  userId: number;
}

export interface Agenda extends BasicAgenda {
  notes: string;
  active?: boolean;
  created_timestamp?: Date;
  updated_timestamp?: Date;
}
