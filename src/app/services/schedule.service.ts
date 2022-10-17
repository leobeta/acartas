import { API } from "../models/api";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Schedule } from "../models/schedule";

@Injectable({
  providedIn: 'root'
})

export class ScheduleService {

  constructor(private http: HttpClient) {
  }

  getAllActiveSchedule(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(API.schedule);
  }

  getScheduleById(id: string): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(API.schedule + `/${id}`);
  }

  postSchedule(schedule: Schedule): Observable<any> {
    return this.http.post<Schedule>(API.schedule, schedule)
  }

  patchSchedule(id: number, schedule: Schedule): Observable<any> {
    return this.http.patch(API.schedule + `/${id}`, schedule);
  }

  deleteSchedule(id: number): Observable<void> {
    return this.http.delete<void>(API.schedule + `/${id}`);
  }
}
