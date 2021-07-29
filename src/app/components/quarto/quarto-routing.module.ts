import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuartoListComponent } from './quarto-list/quarto-list.component';

const routes: Routes = [
	{
		path: '',
		component: QuartoListComponent
	},
//   {
// 		path: 'novo',
// 		component: PessoaFormComponent
// 	},
//   {
// 		path: 'editar/:id',
// 		component: PessoaFormComponent
// 	},
//   {
// 		path: 'visualizar/:id',
// 		component: PessoaFormComponent
// 	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuartoRoutingModule { }
