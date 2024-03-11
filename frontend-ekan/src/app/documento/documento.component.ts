import { Component, OnInit } from '@angular/core';
import { DocumentoService } from '../documento.service';
import { NovoComponent } from './novo/novo.component';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { EditarComponent } from './editar/editar.component';
import { ExcluiComponent } from './exclui/exclui.component';
import { saveAs } from 'file-saver';
import { Subject } from 'rxjs';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrl: './documento.component.css'
})
export class DocumentoComponent implements OnInit{
  

  constructor(private documentoService:DocumentoService, private dialog: MatDialog,private datePipe:DatePipe,private authService:AuthService,private toast:ToastrService)
  {

  }
  dtoptions: DataTables.Settings = {};
  dtTrigger:Subject<any>=new Subject<any>();
  documentos:any=[];
  ngOnInit(): void {
    this.authenticate();
    this.documentoService.setToken();
    this.documentoService.getDocumentos().subscribe((data:any)=>{
      for(let i = 0; i < data.length ; i++)
      {
        //data[i].dataInclusao = structuredClone(this.datePipe.transform(structuredClone(data[i].dataInclusao), 'dd/MM/yyyy HH:mm:ss','pt-BR') || '');
        //data[i].dataAtualizacao = structuredClone(this.datePipe.transform(structuredClone(data[i].dataAtualizacao), 'dd/MM/yyyy HH:mm:ss','pt-BR') || '');
        this.documentos = data;
      }
    });
  }

  novo(){
    const dialogRef = this.dialog.open(NovoComponent,{
      data:{
      },
    });
  }

  editar(item:any)
  {
    this.documentoService.setDocumentoSelecionado(item);
    this.documentoService.setDocumentoIdSelecionado(item.id);
    const dialogRef = this.dialog.open(EditarComponent,{
      data:{
      },
    });
  }
  excluir(id:any)
  {
    this.documentoService.setDocumentoIdSelecionado(id);
    const dialogRef = this.dialog.open(ExcluiComponent,{
      data:{
      },
    });
  }

  save(item:any){
    const base64 = '...';
    const imageName = item.descricao;

    const byteString = window.atob(item.documento);
   const arrayBuffer = new ArrayBuffer(byteString.length);
   const int8Array = new Uint8Array(arrayBuffer);
   for (let i = 0; i < byteString.length; i++) {
     int8Array[i] = byteString.charCodeAt(i);
   }
   const file = new Blob([int8Array], {type: item.tipoDocumento});    
    saveAs(file,item.descricao);
  }

  authenticate(){
    if(sessionStorage.getItem("token")==null)
    {
      this.authService.adicionarUsuario({"firstname":"ekan","lastname":"teste","email":new Date().toLocaleTimeString(),"password":"ekan"}).subscribe((resp:any)=>{
        sessionStorage.setItem("token",resp.access_token);
        this.toast.success("Usuário incluído com sucesso!");
      },(error) => {
      this.toast.error(error.error);
    });
    }else{
      this.toast.success("Usuário já autenticado!");
    }
  }
  
}
