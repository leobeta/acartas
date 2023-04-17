import { firstValueFrom, lastValueFrom } from "rxjs";

import { API } from "../models/api";
import { Agenda } from "../models/agenda";
import { ConsultationService } from "./consultation.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class AgendaService {

  constructor(private http: HttpClient) {
  }

  async getAllAgenda(): Promise<any> {
    try {
      const observable = this.http.get<any>(API.agenda);
      return await lastValueFrom(observable)
    } catch (error) {
      console.error('An error occurred while fetching agendas:', error);
      throw error;
    }

  }

  async getAgendaById(id: string): Promise<any> {
    try {
      const observable = this.http.get<Agenda>(API.agenda + `/${id}`);
      return await firstValueFrom(observable)
    } catch (error) {
      console.error('An error occurred while fetching the agenda:', error);
      throw error;
    }
  }

  async postAgenda(agenda: Agenda): Promise<any> {
    try {
      const observable = this.http.post<Agenda>(API.agenda, agenda);
      return await lastValueFrom(observable);
    } catch (error) {
      console.error('An error occurred while posting the agenda:', error);
      throw error;
    }
  }

  async getAgendaByDate(fecha: string): Promise<any> {
    try {
      const observable = this.http.get<any>(API.agenda + `/date/${fecha}`);
      return await firstValueFrom(observable);
    } catch (error) {
      console.error('An error ocurred trying to find a agenda with: ' + error);
      throw error;
    }
  }


  async patchAgenda(id: number, agenda: Agenda): Promise<any> {
    try {
      const observable = this.http.patch(API.agenda + `/${id}`, agenda);
      return await lastValueFrom(observable);
    } catch (error) {
      console.error('An error occurred while updating the agenda:', error);
      throw error;
    }
  }

  async deleteAgenda(id: number): Promise<void> {
    try {
      const observable = this.http.delete<void>(API.agenda + `/${id}`);
      return await lastValueFrom(observable)
    } catch (error) {
      console.error('An error occurred while deleting the agenda:', error);
      throw error;
    }
  }
}
