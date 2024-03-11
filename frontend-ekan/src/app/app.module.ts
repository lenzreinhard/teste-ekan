import { NgModule ,CUSTOM_ELEMENTS_SCHEMA,LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule , MatDialogRef } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule }  from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { CommonModule, DatePipe, formatDate } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserModule, bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DocumentoComponent } from './documento/documento.component';
import { DocumentoService } from './documento.service';
import { NovoComponent } from './documento/novo/novo.component';
import localePtBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { EditarComponent } from './documento/editar/editar.component';
import { ExcluiComponent } from './documento/exclui/exclui.component';
import { BeneficiarioComponent } from './beneficiario/beneficiario.component';
import { BeneficiarioService } from './beneficiario.service';
import { NovoBComponent } from './beneficiario/novo-b/novo-b.component';
registerLocaleData(localePtBr);
import { IConfig, NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask, provideNgxMask } from 'ngx-mask';
import { EditarBComponent } from './beneficiario/editar-b/editar-b.component';
import { ExcluiBComponent } from './beneficiario/exclui-b/exclui-b.component';
import { provideToastr } from 'ngx-toastr';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

bootstrapApplication(AppComponent, {
    providers: [
        provideEnvironmentNgxMask(maskConfig),
    ],
}).catch((err) => console.error(err));
@NgModule({
  declarations: [
    AppComponent,
    DocumentoComponent,
    NovoComponent,
    EditarComponent,
    ExcluiComponent,
    BeneficiarioComponent,
    NovoBComponent,
    EditarBComponent,
    ExcluiBComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatTabsModule,
    MatCheckboxModule,
    MatListModule,
    CommonModule,
    MatPaginatorModule,
    DataTablesModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [
    provideClientHydration(),
    DocumentoService,
    BeneficiarioService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { }},
    {provide: MatDialogRef, useValue: {}},
    { provide: LOCALE_ID, useValue: 'pt-BR' } ,
    DatePipe,
    provideNgxMask(),
    provideToastr(),
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

