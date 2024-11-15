import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Cita, CitaPage } from '../models/cita.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private url;
  api = inject(ApiService);
  http = inject(HttpClient);

  constructor() {
    this.url = `${this.api.getBaseUrl()}/cita`;
  }

  createCita(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(this.url, cita);
  }

  findCitaByPacienteId(idPaciente:number, page: number): Observable<CitaPage> {
    const urlPaciente =  this.url + '/'+ page + '/paciente/' + idPaciente;
    console.log(urlPaciente);
    return this.http.get<CitaPage>(urlPaciente);
  }

  findCitaById(citaId: number): Observable<Cita> {
    const url = this.url + "/cita/" + citaId;
    return this.http.get<Cita>(url);
  }

}
