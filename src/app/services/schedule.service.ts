import { firstValueFrom, lastValueFrom } from "rxjs";

import { API } from "../models/api";
import { ConsultationService } from "./consultation.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Agenda } from "../models/schedule";

@Injectable({
  providedIn: 'root'
})

export class ScheduleService {

  constructor(private http: HttpClient, private consultationService: ConsultationService) {
  }

  async getAllSchedule(): Promise<any> {
    try {
      const observable = this.http.get<any>(API.schedule);
      return await lastValueFrom(observable)
    } catch (error) {
      console.error('An error occurred while fetching schedules:', error);
      throw error;
    }

  }

  async getScheduleById(id: string): Promise<any> {
    try {
      const observable = this.http.get<Agenda>(API.schedule + `/${id}`);
      return await firstValueFrom(observable)
    } catch (error) {
      console.error('An error occurred while fetching the schedule:', error);
      throw error;
    }
  }

  async getScheduleStatistics(): Promise<any> {
    try {
      const observable = this.http.get<any>(API.schedule + '/stats/statistics');
      return await lastValueFrom(observable);
    } catch (error) {
      console.error('An error occurred while fetching the schedule statistics:', error);
      throw error;
    }
  }

  async postSchedule(schedule: Agenda): Promise<any> {
    try {
      const observable = this.http.post<Agenda>(API.schedule, schedule);
      return await lastValueFrom(observable);
    } catch (error) {
      console.error('An error occurred while posting the schedule:', error);
      throw error;
    }
  }

  async getScheduleByDate(fecha: string): Promise<any> {
    try {
      const observable = this.http.get<any>(API.schedule + `/date/${fecha}`);
      return await firstValueFrom(observable);
    } catch (error) {
      console.error('An error ocurred trying to find a schedule with: ' + error);
      throw error;
    }
  }


  async patchSchedule(id: number, schedule: Agenda): Promise<any> {
    try {
      const observable = this.http.patch(API.schedule + `/${id}`, schedule);
      return await lastValueFrom(observable);
    } catch (error) {
      console.error('An error occurred while updating the schedule:', error);
      throw error;
    }
  }

  async deleteSchedule(id: number): Promise<void> {
    try {
      const observable = this.http.delete<void>(API.schedule + `/${id}`);
      return await lastValueFrom(observable)
    } catch (error) {
      console.error('An error occurred while deleting the schedule:', error);
      throw error;
    }
  }
}
