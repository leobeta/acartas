import { firstValueFrom, lastValueFrom } from 'rxjs';

import { API } from "../models/api";
import { Consultation } from '../models/consultation';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from "../models/patient";

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  constructor(private http: HttpClient) {
  }

  async getAllConsultation(): Promise<any> {
    try {
      const observable = this.http.get<any>(API.consultation);
      return await lastValueFrom(observable);
    } catch (error) {
      console.error('An error occurred while fetching consultations:', error);
      throw error;
    }
  }

  async getConsultationById(id: number): Promise<Consultation> {
    try {
      const observable = this.http.get<Consultation>(API.consultation + `/${id}`);
      return await firstValueFrom(observable);
    } catch (error) {
      console.error('An error occurred while fetching consultation:', error);
      throw error;
    }
  }

  async postConsultation(consultation: Consultation): Promise<Consultation> {
    try {
      const observable = this.http.post<Consultation>(API.consultation, consultation);
      return await lastValueFrom(observable);
    } catch (error) {
      console.error('An error occurred while posting the consultation:', error);
      throw error;
    }
  }

  async patchConsultation(id: number, consultation: Consultation): Promise<any> {
    try {
      const observable = this.http.patch(API.consultation + `/${id}`, consultation);
      return await lastValueFrom(observable);
    } catch (error) {
      console.error('An error occurred while updating the consultation:', error);
      throw error;
    }
  }

  async deleteConsultation(id: number): Promise<void> {
    try {
      const observable = this.http.delete<void>(API.consultation + `/${id}`);
      return await lastValueFrom(observable)
    } catch (error) {
      console.error('An error occurred while deleting the consultation:', error);
      throw error;
    }
  }

  async getConsultationByPatientId(patientId: number): Promise<Consultation> {
    try {
      const observable = this.http.get<Consultation>(API.consultation + `/patient/${patientId}`);
      return await firstValueFrom(observable);
    } catch (error) {
      console.error('An error occurred while fetching consultation by Patient:', error)
      throw error;
    }
  }
}
