import {Component, Inject, OnInit, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { DocumentoService } from '../../documento.service';
import { ToastrService } from 'ngx-toastr';
import { R3SelectorScopeMode } from '@angular/compiler';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent implements OnInit{

  constructor(private documentoService:DocumentoService,private fb: FormBuilder,private dialogRef: MatDialogRef<EditarComponent>,private toast:ToastrService,private authService:AuthService)
  {

  }
  salvar(){
    var thiss =this;
    this.documentoService.atualizaDocumento(this.documentoService.getDocumentoIdSelecionado(),this.form.value).subscribe((response:any)=>{
      this.toast.success("Documento atualizado com sucesso!");
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
  documento:any=[];
  ngOnInit(): void {
    this.validation();
    this.documento = this.documentoService.getDocumentoSelecionado();
    const byteString = window.atob(this.documento.documento);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const file = new Blob([new Uint8Array(int8Array)], {type: this.documento.tipoDocumento});
    this.form.patchValue({doc:file});    
    this.form.patchValue({tipoDocumento:this.documento.tipoDocumento});
    this.form.patchValue({descricao:this.documento.descricao});
  }

  validation() {
    this.form = this.fb.group({
      tipoDocumento:['',[Validators.required]],
      descricao:['',[Validators.required]],
      documento:['',[Validators.required]],
      doc:['',[Validators.required]],
    });
  }

  onchange(event:any) {
    var selectedFile:File = event.target.files[0];
      if(selectedFile!=null)
      {
        var countdot = 0;
        for(var i = 0; i < selectedFile.name.length;i++)
        {
          if (selectedFile.name[i]==".")
          {
            countdot++;
          }
        }
        if(countdot == 1)
        {
          this.form.patchValue({descricao:selectedFile.name});
          this.form.patchValue({tipoDocumento:selectedFile.name.split(".")[1]});
          selectedFile.arrayBuffer().then(buff => {
              let x = new Uint8Array(buff); // x is your uInt8Array
              const blob = new Blob([new Uint8Array(x)], {type: selectedFile.type });
              this.form.patchValue({doc:blob});
          });
        }
        else{
          this.form.patchValue({descricao:""});
          this.form.patchValue({tipoDocumento:""});
          this.form.patchValue({doc:null});
        }
        
      }
  }

}
