/* eslint-disable no-var */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
declare var google;
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  map: any;
  verificacion: any;
  data: any;
  negocios: any[] = [];
  marckets: any[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.get();
  }
  async get(){
    this.http.get('https://separate.herokuapp.com/api/select-all-bussines').subscribe(async dta =>{
      this.data = dta;
      this.verificacion = this.data.ok;
      this.negocios = this.data.data;

       this.negocios.forEach(datas=>{
    const market = {
      position: {
        lat: parseFloat(datas.Latitud),
        lng: parseFloat(datas.Longitud),
      },
      title: datas.Nombre
    };
   this.marckets.push(market);
  });
   this.loadMap(this.marckets);
    });
  }
  loadMap(data) {
    const myLatLng = {lat:18.735693 , lng:-70.162651 };
    const mapEle: HTMLElement = document.getElementById('map');
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 7
    });
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.renderMarker();
    });
  }
  renderMarker(){
    this.marckets.forEach(marker =>{
    this.addMarker(marker);
    });
  }
  addMarker(market: any) {
    console.log(market);
    return new google.maps.Marker({
      position: market.position,
      map: this.map,
      title: market.title
    });
  }
}
