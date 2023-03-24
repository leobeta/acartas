import {API} from "../models/api";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {firstValueFrom, lastValueFrom} from "rxjs";
import {Schedule} from "../models/schedule";

@Injectable({
  providedIn: 'root'
})

export class ScheduleService {

  constructor(private http: HttpClient) {
  }

  async getAllSchedule(): Promise<any> {
    try {
      const observable = this.http.get<any>(API.schedule);
      const schedule = await lastValueFrom(observable);
      return schedule
    } catch(error) {
      console.error('An error occurred while fetching schedules:', error);
      throw error;
    }

  }

  async getScheduleById(id: string): Promise<any> {
    try {
      const observable = this.http.get<Schedule>(API.schedule + `/${id}`);
      const schedule = await firstValueFrom(observable);
      return schedule
    } catch(error) {
      console.error('An error occurred while fetching the schedule:', error);
      throw error;
    }
  }

  async postSchedule(schedule: Schedule): Promise<any> {
    try {
      const observable = this.http.post<Schedule>(API.schedule, schedule);
      const response = await lastValueFrom(observable);
      return response;
    } catch (error) {
      console.error('An error occurred while posting the schedule:', error);
      throw error;
    }
  }


  async patchSchedule(id: number, schedule: Schedule): Promise<any> {
    try {
      const observable = this.http.patch(API.schedule + `/${id}`, schedule);
      const response = await lastValueFrom(observable);
      return response;
    }catch(error) {
      console.error('An error occurred while updating the schedule:', error);
      throw error;
    }
  }

  async deleteSchedule(id: number): Promise<void> {
    try {
      const observable = this.http.delete<void>(API.schedule + `/${id}`);
      const response = await lastValueFrom(observable);
      return response
    }catch(error) {
      console.error('An error occurred while deleting the schedule:', error);
      throw error;
    }
  }
}
