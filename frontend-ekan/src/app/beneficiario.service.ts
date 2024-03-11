import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { host } from './consts';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BeneficiarioService{

  constructor(private http:HttpClient) { }
  headers: any = [];

  public setToken(){
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
  }

  public getBeneficiarios(){
    this.setToken();


    return this.http.get(`${host}/beneficiario`,{headers:this.headers});
  }

  public adicionarBeneficiario(body:any){
    this.setToken();
    return this.http.post(`${host}/beneficiario`,body,{headers:this.headers});
  }

  public atualizaBeneficiario(id:any,body:any)
  {
    this.setToken();
    return this.http.put(`${host}/beneficiario/${id}`,body,{headers:this.headers});
  }

  public excluiBeneficiario(id:any)
  {
    this.setToken();
    return this.http.delete(`${host}/beneficiario/${id}`,{headers:this.headers});
  }

  private beneficiarioSelecionado:any=[];
  public getBeneficiarioSelecionado(){
    return this.beneficiarioSelecionado;
  }
  public setBeneficiarioSelecionado(b:any){
    this.beneficiarioSelecionado = b;
  }

  private beneficiarioIdSelecionado:any;
  public getBeneficiarioIdSelecionado(){
    return this.beneficiarioIdSelecionado;
  }
  public setBeneficiarioIdSelecionado(id:any){
    this.beneficiarioIdSelecionado = id;
  }
}
