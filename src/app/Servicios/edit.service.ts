import { Injectable, Output,EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class EditService {
  @Output() disparadorDeEdicion: EventEmitter<any> = new EventEmitter();
  constructor() { }
}
