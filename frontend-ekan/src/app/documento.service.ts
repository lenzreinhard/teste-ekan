import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { host } from './consts';
@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  constructor(private http:HttpClient) { }
  headers: any = [];

  public setToken(){
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
  }

  public getDocumentos(){
    this.setToken();
    return this.http.get(`${host}/documento?download=${1}`,{headers:this.headers});
  }

  public adicionarDocumento(body:any){
    var formData = new FormData();
    this.setToken();
    formData.append("Documento",body.doc,body.descricao);
    return this.http.post(`${host}/documento`,formData,{headers:this.headers});
  }

  public atualizaDocumento(id:any,body:any)
  {
    var formData = new FormData();
    this.setToken();
    formData.append("Documento",body.doc,body.descricao);
    return this.http.put(`${host}/documento/${id}`,formData,{headers:this.headers});
  }

  public excluiDocumento(id:any)
  {
    this.setToken();
    return this.http.delete(`${host}/documento/${id}`,{headers:this.headers});
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
