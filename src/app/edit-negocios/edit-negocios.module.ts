import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EditNegociosPageRoutingModule } from './edit-negocios-routing.module';

import { EditNegociosPage } from './edit-negocios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditNegociosPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditNegociosPage]
})
export class EditNegociosPageModule {}
