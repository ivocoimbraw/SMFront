import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Doctor, DoctorPage, Persona } from '../models/doctor.model';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { DoctorAdapter } from '@app/adapters/doctor.adapter';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private url;
  api = inject(ApiService);
  http = inject(HttpClient);

  constructor() {
    this.url = `${this.api.getBaseUrl()}/doctor`;
  }

  createDoctor(doctor: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(this.url, doctor);
  }

  findAllDoctor(pageNumber: number): Observable<DoctorPage> {
    const endpoint: string = '/all' + '/' + pageNumber;
    return this.http.get<DoctorPage>(this.url+endpoint);
  }

  updateDoctor(doctor: Persona): Observable<Persona> {
    return this.http.put<Persona>(this.url, doctor);
  }

}
