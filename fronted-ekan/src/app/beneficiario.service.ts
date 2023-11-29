import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { host } from './consts';

@Injectable({
  providedIn: 'root'
})
export class BeneficiarioService {

  constructor(private http:HttpClient) { }

  public getBeneficiarios(){
    return this.http.get(`${host}/beneficiario`);
  }

  public adicionarBeneficiario(body:any){
    return this.http.post(`${host}/beneficiario`,body);
  }

  public atualizaBeneficiario(id:any,body:any)
  {
    return this.http.put(`${host}/beneficiario/${id}`,body);
  }

  public excluiBeneficiario(id:any)
  {
    return this.http.delete(`${host}/beneficiario/${id}`);
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
