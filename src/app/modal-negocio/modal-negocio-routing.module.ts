import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalNegocioPage } from './modal-negocio.page';

const routes: Routes = [
  {
    path: '',
    component: ModalNegocioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalNegocioPageRoutingModule {}
