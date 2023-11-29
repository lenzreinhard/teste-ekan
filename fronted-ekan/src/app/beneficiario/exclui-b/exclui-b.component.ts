import { Component } from '@angular/core';
import { DocumentoService } from '../../documento.service';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BeneficiarioService } from '../../beneficiario.service';

@Component({
  selector: 'app-exclui-b',
  templateUrl: './exclui-b.component.html',
  styleUrl: './exclui-b.component.css'
})
export class ExcluiBComponent {
  constructor(private beneficiarioService:BeneficiarioService,private documentoService:DocumentoService,private fb: FormBuilder,private dialogRef: MatDialogRef<ExcluiBComponent>)
  {

  }
  excluir(){
    this.beneficiarioService.excluiBeneficiario(this.beneficiarioService.getBeneficiarioIdSelecionado()).subscribe((response:any)=>{
      window.location.reload();
        this.dialogRef.close();
    });
  }
  cancelar(){
      this.dialogRef.close();      
  }
}
