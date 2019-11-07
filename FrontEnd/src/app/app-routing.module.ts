import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { PrincipalComponent } from './principal/principal.component';
import { ContatoComponent } from './contato/contato.component';
import { SobreComponent } from './sobre/sobre.component';
import { NovoPostComponent } from './novo-post/novo-post.component';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { BuscaComponent } from './busca/busca.component';
import { CrudPostComponent } from './crud-post/crud-post.component';

const routes: Routes = [

  {
    path: 'principal',
    component: PrincipalComponent
    
  },
  {
    path: 'novopost',
    component: NovoPostComponent
  },
  {
    path: 'editar/:id',
    component: CrudPostComponent
  },
  {
    path: 'cadastro',
    component: CadastroComponent
  },
  {
    path: 'contato',
    component: ContatoComponent
  },
  {
    path: 'sobre',
    component: SobreComponent
  },
  {
    path: 'comentario/:id',
    component: ComentariosComponent,
    data: { title: 'Comentários' }
  },
  {
    path: 'busca/:string',
    component: BuscaComponent,
  },
  {
    path: '',
    redirectTo: '/principal',
    pathMatch: 'full'
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
