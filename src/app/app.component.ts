import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: 'inicio', icon: 'home' },
    { title: 'Registro', url: 'registro', icon: 'add' },
    { title: 'Mapa', url: 'mapa', icon: 'map' },
  ];
  constructor() {}
}
