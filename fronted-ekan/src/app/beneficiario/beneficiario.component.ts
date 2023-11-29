import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { BeneficiarioService } from '../beneficiario.service';
import { DocumentoService } from '../documento.service';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { NovoBComponent } from './novo-b/novo-b.component';
import { EditarBComponent } from './editar-b/editar-b.component';
import { ExcluiBComponent } from './exclui-b/exclui-b.component';

@Component({
  selector: 'app-beneficiario',
  templateUrl: './beneficiario.component.html',
  styleUrl: './beneficiario.component.css'
})
export class BeneficiarioComponent {
  constructor(private beneficiarioService:BeneficiarioService,private documentoService:DocumentoService, private dialog: MatDialog,private datePipe:DatePipe)
  {

  }
  dtoptions: DataTables.Settings = {};
  dtTrigger:Subject<any>=new Subject<any>();
  beneficiarios:any=[];
 
  ngOnInit(): void {
    this.beneficiarioService.getBeneficiarios().subscribe((data:any)=>{
      for(let i = 0; i < data.length ; i++)
      {
        this.beneficiarios = data;
      }
    });
  }

  novo(){
    const dialogRef = this.dialog.open(NovoBComponent,{
      data:{
      },
    });
  }

  editar(item:any)
  {
    this.beneficiarioService.setBeneficiarioSelecionado(item);
    this.beneficiarioService.setBeneficiarioIdSelecionado(item.id);
    const dialogRef = this.dialog.open(EditarBComponent,{
      data:{
      },
    });
  }
  excluir(id:any)
  {
    this.beneficiarioService.setBeneficiarioIdSelecionado(id);
    const dialogRef = this.dialog.open(ExcluiBComponent,{
      data:{
      },
    });
  }
}
