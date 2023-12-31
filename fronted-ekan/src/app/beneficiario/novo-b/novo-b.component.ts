import {Component, Inject, OnInit, Input} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { DocumentoService } from '../../documento.service';
import { BeneficiarioService } from '../../beneficiario.service';
import { MatFormFieldControl } from '@angular/material/form-field';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-novo-b',
  templateUrl: './novo-b.component.html',
  styleUrl: './novo-b.component.css'
})
export class NovoBComponent implements OnInit{

  constructor(private beneficiarioService:BeneficiarioService,private documentoService:DocumentoService,private fb: FormBuilder,private dialogRef: MatDialogRef<NovoBComponent>,private datePipe:DatePipe)
  {

  }
  salvar(){
    let ids:any = this.form.controls["documentoId"].value;
    for(let i = 0; i < ids.length; i++)
    {
      ids[i] = {"id":ids[i]};
    }
    this.form.controls["documentoId"].setValue = ids;
    this.beneficiarioService.adicionarBeneficiario(this.form.value).subscribe((response:any)=>{
        window.location.reload();
        this.dialogRef.close();
    });
  }
  cancelar(){
      this.dialogRef.close();      
  }

  form :  FormGroup | any;
  docs:any=[];
  ngOnInit(): void {
    this.validation();
    this.documentoService.getDocumentos().subscribe((data:any)=>{
      this.docs = data;
    })
  }

  validation() {
    this.form = this.fb.group({
      nome:['',[Validators.required]],
      telefone:['',[Validators.required]],
      dataNascimento:['',[Validators.required]],
      documentoId:['',[Validators.required]],
    });
  }

}
