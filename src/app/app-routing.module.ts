import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
	{
		path: 'pessoas',
		loadChildren: () => import('./components/pessoa/pessoa.module').then(m => m.PessoaModule)
	},
    {
		path: 'quartos',
		loadChildren: () => import('./components/quarto/quarto.module').then(m => m.QuartoModule)
	},
	{
		path: 'movimentacao',
		loadChildren: () => import('./components/movimentacao/movimentacao.module').then(m => m.MovimentacaoModule)
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
