import { API } from '../models/api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  constructor(private http: HttpClient) { }

  async getAgendaStats(): Promise<any> {
    try {
      const observable = this.http.get<any>(API.dashboard + '/stats/agenda-stats');
      return await lastValueFrom(observable);
    } catch (error) {
      console.error('An error occurred while fetching the agenda statistics:', error);
      throw error;
    }
  }

  async getAgendaPatientsWithoutAppointment(): Promise<any> {
    try {
      const observable = this.http.get<any>(API.dashboard + '/stats/patients-without-appointment');
      return await lastValueFrom(observable);
    } catch (error) {
      console.error('An error occurred while fetching the agenda patients without appointment:', error);
      throw error;
    }
  }

  async getAgendaByQuarter(): Promise<any> {
    try {
      const observable = this.http.get<any>(API.dashboard + '/stats/agenda-by-quarter');
      return await lastValueFrom(observable);
    } catch (error) {
      console.error('An error occurred while fetching the agenda by quarter:', error);
      throw error;
    }
  }
}
