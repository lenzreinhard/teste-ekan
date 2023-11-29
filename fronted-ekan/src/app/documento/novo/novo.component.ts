import {Component, Inject, OnInit, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { DocumentoService } from '../../documento.service';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.css']
})
export class NovoComponent implements OnInit{

  constructor(private documentoService:DocumentoService,private fb: FormBuilder,private dialogRef: MatDialogRef<NovoComponent>)
  {

  }
  salvar(){
    this.documentoService.adicionarDocumento(this.form.value).subscribe((response:any)=>{
      window.location.reload();
        this.dialogRef.close();
    });
  }
  cancelar(){
      this.dialogRef.close();      
  }

  form :  FormGroup | any;

  ngOnInit(): void {
    this.validation();
  }

  validation() {
    this.form = this.fb.group({
      tipoDocumento:['',[Validators.required]],
      descricao:['',[Validators.required]],
    });
  }

}
