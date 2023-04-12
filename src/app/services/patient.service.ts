import { firstValueFrom, lastValueFrom } from "rxjs";

import { API } from "../models/api";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Patient } from "../models/patient";

@Injectable({
  providedIn: 'root'
})

export class PatientService {

  constructor(private http: HttpClient) {
  }

  async getAllPatients(): Promise<Patient[]> {
    try {
      const observable = this.http.get<Patient[]>(API.patient);
      return await lastValueFrom(observable);
    } catch (error) {
      console.error('An error occurred while fetching patients:', error);
      throw error;
    }
  }

  async getPatientById(id: number): Promise<Patient> {
    try {
      const observable = this.http.get<Patient>(API.patient + `/${id}`);
      return await firstValueFrom(observable);
    } catch (error) {
      console.error('An error occurred while fetching patient:', error);
      throw error;
    }
  }

  async postPatient(patient: Patient): Promise<any> {
    try {
      const observable = this.http.post<Patient>(API.patient, patient);
      return await lastValueFrom(observable);
    } catch (error) {
      console.error('An error occurred while posting the patient:', error);
      throw error;
    }
  }

  async patchPatient(patient: Patient): Promise<any> {
    try {
      const observable = this.http.patch(API.patient, patient);
      return await lastValueFrom(observable);
    } catch (error) {
      console.error('An error occurred while updating the patient:', error);
      throw error;
    }
  }

  async deletePatient(id: number): Promise<void> {
    try {
      const observable = this.http.delete<void>(API.patient + `/${id}`);
      return await lastValueFrom(observable)
    } catch (error) {
      console.error('An error occurred while deleting the patient:', error);
      throw error;
    }
  }
}
