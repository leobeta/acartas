export interface BasicPatient {
  id?: number;
  firstname: string;
  lastname: string;
  dob: Date;
  active: boolean;
}

export interface Patient extends BasicPatient {
  nationality?: string;
  residenceCountry?: string;
  locality?: string;
  telephone?: string;
  occupation?: string;
  email?: string;
  created_timestamp?: Date;
  updated_timestamp?: Date;
}
