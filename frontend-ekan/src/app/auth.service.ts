import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { host } from './consts';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) { }

  public adicionarUsuario(body:any){
    return this.http.post(`${host}/auth/register`,body);
  }

  public auhtorizeUsuario(body:any){
    return this.http.post(`${host}/authenticate`,body);
  }
}

