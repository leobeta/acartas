import { Patient } from 'src/app/models/patient';
export interface BasicConsultation {
  id?: number;
  consultationDate: Date;
  appointmentDate: Date;
  idPatient: number;
  idUser: number;
  active: boolean;
}

export interface Consultation extends BasicConsultation {
  reason?: string;
  topic?: string;
  systemicDynamics?: string;
  solution?: string;
  createdTimestamp?: Date;
  updatedTimestamp?: Date;
}
