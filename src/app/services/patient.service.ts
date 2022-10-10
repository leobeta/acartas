import { HttpClient, HttpHeaders } from "@angular/common/http";

import { API } from "../models/api";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Patient } from "../models/patient";

@Injectable({
  providedIn: 'root'
})

export class PatientService {

  private token: string;

  constructor(private httpClient: HttpClient) {
    this.token = localStorage.getItem('token') || '';
  }

  getAllPatients(): Observable<Patient[]> {
    return this.httpClient.get<Patient[]>(API.patient);
  }

  getPatientById(id: string): Observable<Patient> {
    return this.httpClient.get<Patient>(API.patient + `/${id}`);
  }

  postPatient(patient: Patient): Observable<any> {
    return this.httpClient.post<Patient>(API.patient, patient);
  }

  deletePatient(id: number): Observable<void> {
    return this.httpClient.delete<void>(API.patient + `/${id}`);
  }
}
