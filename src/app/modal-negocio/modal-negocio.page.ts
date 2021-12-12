/* eslint-disable radix */
/* eslint-disable no-var */
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { EditService } from '../Servicios/edit.service';
declare var google;
@Component({
  selector: 'app-modal-negocio',
  templateUrl: './modal-negocio.page.html',
  styleUrls: ['./modal-negocio.page.scss'],
})
export class ModalNegocioPage implements OnInit {
  negocio: any;
  map: any;
  constructor(public modalController: ModalController,
              private navParams: NavParams,
              public alertController: AlertController,
              private edit: EditService,
              private http: HttpClient) { }

  ngOnInit() {
    this.negocio = this.navParams.get('datos');
    const market = {
      position: {
        lat: parseFloat(this.negocio.Latitud),
        lng: parseFloat(this.negocio.Longitud),
      },
      title: this.negocio.Nombre
    };
    this.loadMap(market);
  }
  loadMap(data) {
    const mapEle: HTMLElement = document.getElementById('map');
    this.map = new google.maps.Map(mapEle, {
      center: data.position,
      zoom: 12
    });
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.addMarker(data);
    });
  }
  addMarker(market: any) {
    return new google.maps.Marker({
      position: market.position,
      map: this.map,
      title: market.title
    });
  }
  editNegocio(negocio){
    this.edit.disparadorDeEdicion.emit(negocio);
    this.dismiss();
  }

  deleteNegocio(){
    this.http.delete('https://separate.herokuapp.com/api/delete_negocios_for_id/'+this.negocio.IdNegocio).subscribe(dta =>{
      alert('Negocio eliminado');
    this.dismiss();
    });
  }

  async presentAlertConfirm() {
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
            this.deleteNegocio();
            console.log('Confirm Okay');
          },
        },
      ],
    });

    await alert.present();
  }
  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
