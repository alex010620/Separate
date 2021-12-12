import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditNegociosPage } from './edit-negocios.page';

const routes: Routes = [
  {
    path: '',
    component: EditNegociosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditNegociosPageRoutingModule {}
