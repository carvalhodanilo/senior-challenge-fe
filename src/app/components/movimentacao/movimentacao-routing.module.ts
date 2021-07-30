import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovimentacaoListComponent } from './movimentacao-list/movimentacao-list.component';

const routes: Routes = [
	{
		path: '',
		component: MovimentacaoListComponent
	},
//   {
// 		path: 'novo',
// 		component: MovimentacaoFormComponent
// 	},
//   {
// 		path: 'editar/:id',
// 		component: MovimentacaoFormComponent
// 	},
//   {
// 		path: 'visualizar/:id',
// 		component: MovimentacaoFormComponent
// 	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimentacaoRoutingModule { }
