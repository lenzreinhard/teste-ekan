import {Component, Inject, OnInit, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { DocumentoService } from '../../documento.service';

@Component({
  selector: 'app-exclui',
  templateUrl: './exclui.component.html',
  styleUrl: './exclui.component.css'
})
export class ExcluiComponent{
  constructor(private documentoService:DocumentoService,private fb: FormBuilder,private dialogRef: MatDialogRef<ExcluiComponent>)
  {

  }
  excluir(){
    this.documentoService.excluiDocumento(this.documentoService.getDocumentoIdSelecionado()).subscribe((response:any)=>{
      window.location.reload();
        this.dialogRef.close();
    });
  }
  cancelar(){
      this.dialogRef.close();      
  }
}
