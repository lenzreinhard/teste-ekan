import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { BeneficiarioService } from '../beneficiario.service';
import { DocumentoService } from '../documento.service';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

import { NovoBComponent } from './novo-b/novo-b.component';
import { EditarBComponent } from './editar-b/editar-b.component';
import { ExcluiBComponent } from './exclui-b/exclui-b.component';
import { saveAs } from 'file-saver';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-beneficiario',
  templateUrl: './beneficiario.component.html',
  styleUrl: './beneficiario.component.css'
})
export class BeneficiarioComponent {
  constructor(private beneficiarioService:BeneficiarioService,private documentoService:DocumentoService, private dialog: MatDialog,private datePipe:DatePipe,private authService:AuthService,private toast:ToastrService)
  {

  }
  dtoptions: DataTables.Settings = {};
  dtTrigger:Subject<any>=new Subject<any>();
  beneficiarios:any=[];
 
  ngOnInit(): void {
    this.authenticate();
    this.beneficiarioService.setToken();
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
    }
    else{
      this.toast.success("Usuário já autenticado!");
    }
  }
}
