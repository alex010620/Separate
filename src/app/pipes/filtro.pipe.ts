/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable arrow-body-style */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(arreglo: any[], texto: string): any[] {
    if (texto === '') {
      console.log(arreglo);
      return arreglo;
    }
    texto = texto.toLowerCase();
  return arreglo.filter(item =>{
     return item.Nombre.toLowerCase()
              .includes(texto);
    });
  }

}
