import { Patient } from "./patient";

export interface BasicSchedule {
  id?: number;
  date: string;
  patientId: Patient;
  userId: number;
}

export interface Schedule extends BasicSchedule {
  notes: string;
  active?: boolean;
  created_timestamp?: Date;
  updated_timestamp?: Date;
}
