import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Horario, HorarioPage } from '../models/horario.model';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  api = inject(ApiService);
  http = inject(HttpClient);
  private url =  `${this.api.getBaseUrl()}/horario`;

  findByEspecialidadAndDoctor(especialidadId:number, doctorId: number, pageNumber:number): Observable<HorarioPage> {
    let params = new HttpParams()
      .set('especialidadId', especialidadId.toString())
      .set('doctorId', doctorId.toString())
      .set('pageNumber', pageNumber.toString());
    return this.http.get<HorarioPage>(this.url, { params }).pipe(
      tap(response => {
        console.log('Response received:', response); // Imprime la respuesta completa
      }),
      catchError(error => {
        console.error('Error occurred:', error); // Imprime el error en la consola
        return throwError(error); // Devuelve el error para su manejo posterior
      })
    );
  }

}
