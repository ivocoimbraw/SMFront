import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Documento, DocumentoPage, DocumentoSave } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {
  private url;
  api = inject(ApiService);
  http = inject(HttpClient);

  constructor() {
    this.url = `${this.api.getBaseUrl()}/documento`;
  }

  saveDocumento(documento: DocumentoSave): Observable<void> {
    return this.http.post<void>(`${this.url}`, documento);
  }

  // Método para obtener documentos por ID de cita
  findByCitaId(idCita: number): Observable<Documento[]> {
    return this.http.get<Documento[]>(`${this.url}/cita/${idCita}`);
  }

  // Método para obtener documentos paginados
  getDocumentos(page: number): Observable<DocumentoPage> {
    return this.http.get<DocumentoPage>(`${this.url}/${page}`);
  }

}
