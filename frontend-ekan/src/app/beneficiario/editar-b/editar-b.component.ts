import {Component, Inject, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { DocumentoService } from '../../documento.service';
import { BeneficiarioService } from '../../beneficiario.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-editar-b',
  templateUrl: './editar-b.component.html',
  styleUrl: './editar-b.component.css'
})
export class EditarBComponent implements OnInit{

  constructor(private beneficiarioService:BeneficiarioService,private documentoService:DocumentoService,private fb: FormBuilder,private dialogRef: MatDialogRef<EditarBComponent>,private datePipe:DatePipe,private toast:ToastrService,private authService:AuthService)
  {

  }

  salvar(){
    var thiss = this;
    let ids:any = this.form.controls["documentoId"].value;
    for(let i = 0; i < ids.length; i++)
    {
      ids[i] = {"id":ids[i]};
    }
    this.form.controls["documentoId"].setValue = ids;
    this.beneficiarioService.atualizaBeneficiario(this.beneficiarioService.getBeneficiarioIdSelecionado(),this.form.value).subscribe((response:any)=>{
      this.toast.success("Beneficiário atualizado com sucesso!");
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

  form :  FormGroup | any;
  docs:any=[];

  beneficiario:any=[];
  ngOnInit(): void {
    this.validation();
    this.beneficiario = this.beneficiarioService.getBeneficiarioSelecionado();
    this.documentoService.getDocumentos().subscribe((data:any)=>{
      this.docs = data;
    });
    let ids:any = this.beneficiario.documentoId;
    let ID = [];
    for(let i = 0; i < ids.length; i++)
    {
      ID.push(ids[i].id);
    }
    this.form.setValue({nome:this.beneficiario.nome,telefone:this.beneficiario.telefone,dataNascimento:this.beneficiario.dataNascimento,documentoId:ID});
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
