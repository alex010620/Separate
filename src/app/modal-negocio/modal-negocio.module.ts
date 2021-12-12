import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalNegocioPageRoutingModule } from './modal-negocio-routing.module';

import { ModalNegocioPage } from './modal-negocio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalNegocioPageRoutingModule
  ],
  declarations: [ModalNegocioPage]
})
export class ModalNegocioPageModule {}
