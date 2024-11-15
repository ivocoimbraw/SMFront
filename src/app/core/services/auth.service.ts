import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import { jwtDecode } from "jwt-decode";
import { Paciente } from '../models/paciente.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string;
	http = inject(HttpClient);
  apiService = inject(ApiService);

  private tokenKey = 'authToken';
  private decodedToken: any;

  constructor () {
    this.apiUrl = `${this.apiService.getBaseUrl()}/auth`;
  }

  login(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login`;
    return this.http.post(url, { username, password }).pipe(
      tap((response: any) => {
        localStorage.setItem('authToken', response.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Decodifica el token si está almacenado
  getDecodedToken(): any {
    if (!this.decodedToken && this.getToken()) {
      this.decodedToken = jwtDecode(this.getToken()!);
    }
    return this.decodedToken;
  }

  // Verifica si el token ha expirado
  isTokenExpired(): boolean {
    const decoded = this.getDecodedToken();
    if (decoded && decoded.exp) {
      const expirationDate = new Date(decoded.exp * 1000); // La fecha de expiración en el token está en segundos
      return expirationDate < new Date();
    }
    return true;
  }

  getPacienteByUser(): Observable<Paciente> {
    const idPaciente: number = this.getDecodedToken().id;
    const url = `${this.apiService.getBaseUrl()}/user/`;
    return this.http.get<Paciente>(url + idPaciente);
  }

}
