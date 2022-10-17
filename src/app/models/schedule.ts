import { Patient } from "./patient";

export interface BasicSchedule {
  id?: number;
  appointmentDate: Date;
  patient: Patient;
}

export interface Schedule extends BasicSchedule {
  notes: string;
  active?: boolean;
  created_timestamp?: Date;
  updated_timestamp?: Date;
}
