import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role, RoleId } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private url;
  api = inject(ApiService);
  http = inject(HttpClient);

  constructor() {
    this.url = `${this.api.getBaseUrl()}/role`;
  }

  createRole(role: Role): Observable<RoleId> {
    return this.http.post<RoleId>(this.url,role);
  }

  getAllRole(): Observable<Role> {
    return this.http.get<Role>(this.url);
  }

}
