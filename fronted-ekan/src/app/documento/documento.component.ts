import { Component, OnInit } from '@angular/core';
import { DocumentoService } from '../documento.service';
import { Subject } from 'rxjs';
import { NovoComponent } from './novo/novo.component';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { EditarComponent } from './editar/editar.component';
import { ExcluiComponent } from './exclui/exclui.component';
@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrl: './documento.component.css'
})
export class DocumentoComponent implements OnInit{
  

  constructor(private documentoService:DocumentoService, private dialog: MatDialog,private datePipe:DatePipe)
  {

  }
  dtoptions: DataTables.Settings = {};
  dtTrigger:Subject<any>=new Subject<any>();
  documentos:any=[];
  ngOnInit(): void {
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
}
