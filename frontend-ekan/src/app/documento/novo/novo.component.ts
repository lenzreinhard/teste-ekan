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
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.css']
})
export class NovoComponent implements OnInit{

  constructor(private documentoService:DocumentoService,private fb: FormBuilder,private dialogRef: MatDialogRef<NovoComponent>,private toast:ToastrService,private authService:AuthService)
  {

  }
  salvar(){
    var thiss=this;
    this.documentoService.adicionarDocumento(this.form.value).subscribe((response:any)=>{
      window.location.reload();
        this.dialogRef.close();
        this.toast.success("Documento enviado com sucesso!");

    },(error) => {
      this.toast.error(error.error);
      thiss.authService.adicionarUsuario({"firstname":new Date().toLocaleTimeString(),"lastname":"teste","email":new Date().toLocaleTimeString(),"password":"ekan"}).subscribe((resp:any)=>{
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

  ngOnInit(): void {
    this.validation();
  }

  validation() {
    this.form = this.fb.group({
      tipoDocumento:['',[Validators.required]],
      descricao:['',[Validators.required]],
      documento:['',[Validators.required]],
      doc:['',],
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
