import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../services/app.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NovoPostComponent } from './novo-post/novo-post.component';
import { PrincipalComponent } from './principal/principal.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { SobreComponent } from './sobre/sobre.component';
import { ContatoComponent } from './contato/contato.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';

import {  
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatTableModule,
  MatToolbarModule,
  MatGridListModule,
  MatDialogModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BuscaComponent } from './busca/busca.component';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { CRUDComentariosComponent } from './crud-comentarios/crud-comentarios.component';
import { CrudPostComponent } from './crud-post/crud-post.component';
import { LayoutModule } from '@angular/cdk/layout';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    CadastroComponent,
    SobreComponent,
    ContatoComponent,
    MenuComponent,
    NovoPostComponent,
    BuscaComponent,
    ComentariosComponent,
    CRUDComentariosComponent,
    CrudPostComponent
  ],
  imports: [
    NgxPaginationModule,
    LayoutModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,  
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule, 
    MatSelectModule,
    MatSidenavModule,  
    MatTableModule,
    MatToolbarModule,
    MatGridListModule,
    MatDialogModule
  ],
  entryComponents: [
    CrudPostComponent,
    PrincipalComponent,
    CRUDComentariosComponent
  ],
  providers: [
    AppService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
