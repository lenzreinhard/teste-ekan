import { Component } from '@angular/core';
import { DocumentoService } from '../../documento.service';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BeneficiarioService } from '../../beneficiario.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-exclui-b',
  templateUrl: './exclui-b.component.html',
  styleUrl: './exclui-b.component.css'
})
export class ExcluiBComponent {
  constructor(private beneficiarioService:BeneficiarioService,private documentoService:DocumentoService,private fb: FormBuilder,private dialogRef: MatDialogRef<ExcluiBComponent>,private toast:ToastrService,private authService:AuthService)
  {

  }
  excluir(){
    var thiss=this;
    this.beneficiarioService.excluiBeneficiario(this.beneficiarioService.getBeneficiarioIdSelecionado()).subscribe((response:any)=>{
      this.toast.success("Documento excluído com sucesso!");
      window.location.reload();
      this.dialogRef.close();
    },(error) => {
      if(error.status==200)
      {
        this.toast.success("Documento excluído com sucesso!");
        window.location.reload();
        this.dialogRef.close();
      }
      else{
        this.toast.error(error.error);
        thiss.authService.adicionarUsuario({"firstname":"ekan","lastname":"teste","email":new Date().toLocaleTimeString(),"password":"ekan"}).subscribe((resp:any)=>{
          sessionStorage.setItem("token",resp.access_token);
          this.toast.success("Usuário incluído com sucesso!");
        },(err) => {
        this.toast.error(error.error);
      });
      }
  });
  }
  cancelar(){
      this.dialogRef.close();      
  }
}
