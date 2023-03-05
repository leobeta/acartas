import { API } from "../models/api";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consultation } from '../models/consultation';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  constructor(private http: HttpClient) { }

  getAllConsultation(): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(API.consultation);
  }

  getConsultationById(id: string): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(API.consultation + `/${id}`);
  }

  postConsultation(consultation: Consultation): Observable<any> {
    return this.http.post<Consultation>(API.consultation, consultation);
  }

  patchConsultation(id: number, Consultation: Consultation): Observable<any> {
    return this.http.patch(API.consultation + `/${id}`, Consultation);
  }

  deleteConsultation(id: number): Observable<void> {
    return this.http.delete<void>(API.consultation + `/${id}`);
  }

}
