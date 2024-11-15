import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Doctor, DoctorPage } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DoctorEspecialidadService {
  api = inject(ApiService);
  http = inject(HttpClient);
  private url =  `${this.api.getBaseUrl()}/doctor-especialidad`;

  getDoctors(especialidadId: number, pageNumber: number = 0): Observable<DoctorPage> {
    let params = new HttpParams()
      .set('especialidadId', especialidadId.toString())
      .set('pageNumber', pageNumber.toString());
    return this.http.get<DoctorPage>(`${this.url}`, { params });
  }
}
