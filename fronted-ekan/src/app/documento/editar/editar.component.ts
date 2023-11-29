import {Component, Inject, OnInit, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { DocumentoService } from '../../documento.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent implements OnInit{

  constructor(private documentoService:DocumentoService,private fb: FormBuilder,private dialogRef: MatDialogRef<EditarComponent>)
  {

  }
  salvar(){
    this.documentoService.atualizaDocumento(this.documentoService.getDocumentoIdSelecionado(),this.form.value).subscribe((response:any)=>{
      window.location.reload();
        this.dialogRef.close();
    });
  }
  cancelar(){
      this.dialogRef.close();      
  }

  form :  FormGroup | any;
  documento:any=[];
  ngOnInit(): void {
    this.validation();
    this.documento = this.documentoService.getDocumentoSelecionado();
    this.form.setValue({tipoDocumento:this.documento.tipoDocumento,descricao:this.documento.descricao});
  }

  validation() {
    this.form = this.fb.group({
      tipoDocumento:['',[Validators.required]],
      descricao:['',[Validators.required]],
    });
  }

}
