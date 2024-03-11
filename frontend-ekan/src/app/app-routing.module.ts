import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentoComponent } from './documento/documento.component';
import { BeneficiarioComponent } from './beneficiario/beneficiario.component';

const routes: Routes = [
  {path: 'documentos', component: DocumentoComponent},
  {path: '', component: BeneficiarioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
