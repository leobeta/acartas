import { HttpClient, HttpHeaders } from "@angular/common/http";

import { API } from "../models/api";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Patient } from "../models/patient";

@Injectable({
  providedIn: 'root'
})

export class PatientService {

  constructor(private http: HttpClient) {
  }

  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(API.patient);
  }

  getPatientById(id: string): Observable<Patient[]> {
    return this.http.get<Patient[]>(API.patient + `/${id}`);
  }

  postPatient(patient: Patient): Observable<any> {
    return this.http.post<Patient>(API.patient, patient);
  }

  patchPatient(id: number, patient: Patient): Observable<any> {
    return this.http.patch(API.patient + `/${id}`, patient);
  }

  deletePatient(id: number): Observable<void> {
    return this.http.delete<void>(API.patient + `/${id}`);
  }
}
