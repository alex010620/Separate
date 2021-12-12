/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable eqeqeq */
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ModalNegocioPage } from '../modal-negocio/modal-negocio.page';
import { HttpClient } from '@angular/common/http';
import { loadingController } from '@ionic/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  data: any;
  negocios: any;
  verificacion: boolean;
  dataDelete: any;
  buscador: string = '';
  constructor(public modalController: ModalController,
  public alertController: AlertController,
  private http: HttpClient,
  public loadingController: LoadingController) { }

  ngOnInit() {
   if (localStorage.getItem('.')) {
    this.get();
   } else {
    this.get();
   }
  }

  async presentModal(data) {
    const modal = await this.modalController.create({
      component: ModalNegocioPage,
      cssClass: 'my-custom-class',
      componentProps: {
        datos:data
      }
    });
    return await modal.present();
  }
  async get(){
    this.http.get('https://separate.herokuapp.com/api/select-all-bussines').subscribe(async dta =>{
      this.data = dta;
      this.verificacion = this.data.ok;
      this.negocios = this.data.data;
    });
  }
  async presentAlertConfirm(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '!Cuidado!',
      message: '¿Estas seguro de eliminar este negocio?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Si',
          handler: () => {
           this.deleteNegocio(id);
            console.log('Confirm Okay');
          },
        },
      ],
    });

    await alert.present();
  }
  deleteNegocio(id){
    this.presentLoading();
    this.http.delete('https://separate.herokuapp.com/api/delete_negocios_for_id/'+id).subscribe(dta =>{
      this.dataDelete = dta;
      if (this.dataDelete.ok == true) {
        loadingController.dismiss();
        this.presentAlert('Exito!', 'Se a eliminado el negocio');
        this.get();
      } else {
        loadingController.dismiss();
        this.presentAlert('Opss', 'Ocurrio un error... Intentelo de nuevo.');
      }
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Un momento...'
    });
    await loading.present();
  }

  async presentAlert(tipo, mensaje) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: tipo,
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }
  doRefresh(event) {
    this.get();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
  getItems(ev: any) {
    this.buscador = ev.target.value;
  }

}
