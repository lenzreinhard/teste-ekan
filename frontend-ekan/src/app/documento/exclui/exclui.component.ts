import {Component, Inject, OnInit, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { DocumentoService } from '../../documento.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-exclui',
  templateUrl: './exclui.component.html',
  styleUrl: './exclui.component.css'
})
export class ExcluiComponent{
  constructor(private documentoService:DocumentoService,private fb: FormBuilder,private dialogRef: MatDialogRef<ExcluiComponent>,private toast:ToastrService,private authService:AuthService)
  {

  }
  excluir(){
    var thiss =this;
    this.documentoService.excluiDocumento(this.documentoService.getDocumentoIdSelecionado()).subscribe((response:any)=>{
      this.toast.success("Documento excluído com sucesso!");
      window.location.reload();
      this.dialogRef.close();
    },(error) => {
        this.toast.error(error.error);
        thiss.authService.adicionarUsuario({"firstname":"ekan","lastname":"teste","email":new Date().toLocaleTimeString(),"password":"ekan"}).subscribe((resp:any)=>{
          sessionStorage.setItem("token",resp.access_token);
          this.toast.success("Usuário incluído com sucesso!");
        },(err) => {
        this.toast.error(error.error);
      });
  });
  }
  cancelar(){
      this.dialogRef.close();      
  }
}
