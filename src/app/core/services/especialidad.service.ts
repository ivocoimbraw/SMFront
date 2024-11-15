import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Especialidad, EspecialidadPage } from '../models/especialidad.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {
  api = inject(ApiService);
  http = inject(HttpClient);
  private url =  `${this.api.getBaseUrl()}/especialidad`;

  createEspecialidad(especialidad: Especialidad): Observable<Especialidad> {
    return this.http.post<Especialidad>(this.url, especialidad);
  }

  updateEspecialidad(especialidad: Especialidad) {
    return this.http.put<Especialidad>(this.url,especialidad);
  }

  findAllEspecialidad(pageNumber: number): Observable<EspecialidadPage> {
    const endpoint: string = '/all' + '/' + pageNumber;
    return this.http.get<EspecialidadPage>(this.url+endpoint);
  }

  findEspecialidadById(id: number): Observable<Especialidad> {
    const endpoint: string = '/' + id;
    return this.http.get<Especialidad>(this.url+endpoint);
  }

}
