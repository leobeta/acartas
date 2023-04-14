import { Patient } from "./patient";

export interface BasicAgenda {
  id?: number;
  fecha: string;
  patientId: Patient;
  userId: number;
}

export interface Agenda extends BasicAgenda {
  notes: string;
  active?: boolean;
  created_timestamp?: Date;
  updated_timestamp?: Date;
}
