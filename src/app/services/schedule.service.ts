import { firstValueFrom, lastValueFrom } from "rxjs";

import { API } from "../models/api";
import { ConsultationService } from "./consultation.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Schedule } from "../models/schedule";

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
      const observable = this.http.get<Schedule>(API.schedule + `/${id}`);
      return await firstValueFrom(observable)
    } catch (error) {
      console.error('An error occurred while fetching the schedule:', error);
      throw error;
    }
  }

  async postSchedule(schedule: Schedule): Promise<any> {
    try {
      if (!this.getScheduleByDate(schedule.date)) {
        const observable = this.http.post<Schedule>(API.schedule, schedule);
        return await lastValueFrom(observable);
      }
      return false;
    } catch (error) {
      console.error('An error occurred while posting the schedule:', error);
      throw error;
    }
  }


  async patchSchedule(id: number, schedule: Schedule): Promise<any> {
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

  async getScheduleByDate(fecha: string): Promise<boolean> {
    try {
      const observable = this.http.get<boolean>(API.schedule + `/date/${fecha}`);
      return await firstValueFrom(observable) ? true : false;
    } catch (error) {
      console.error('An error ocurred trying to find a schedule with: ' + error);
      throw error;
    }
  }
}
