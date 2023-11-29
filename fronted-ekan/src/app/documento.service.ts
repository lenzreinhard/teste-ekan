import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { host } from './consts';
@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  constructor(private http:HttpClient) { }

  public getDocumentos(){
    return this.http.get(`${host}/documento`);
  }

  public adicionarDocumento(body:any){
    return this.http.post(`${host}/documento`,body);
  }

  public atualizaDocumento(id:any,body:any)
  {
    return this.http.put(`${host}/documento/${id}`,body);
  }

  public excluiDocumento(id:any)
  {
    return this.http.delete(`${host}/documento/${id}`);
  }

  private documentoSelecionado:any=[];
  public getDocumentoSelecionado(){
    return this.documentoSelecionado;
  }
  public setDocumentoSelecionado(doc:any){
    this.documentoSelecionado = doc;
  }

  private documentoIdSelecionado:any;
  public getDocumentoIdSelecionado(){
    return this.documentoIdSelecionado;
  }
  public setDocumentoIdSelecionado(id:any){
    this.documentoIdSelecionado = id;
  }

}
