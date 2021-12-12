
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-inferrable-types */

/* eslint-disable no-var */
/* eslint-disable prefer-const */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public base64Image: string = "https://cdn-icons-png.flaticon.com/512/4599/4599504.png";
  ionicForm: FormGroup;
  isSubmitted = false;
  response: any;
  constructor(private formbuilder: FormBuilder,
              private camera: Camera,
              public alertController: AlertController,
              private http: HttpClient) { }

  ngOnInit() {
    this.ionicForm = this.formbuilder.group({
    Nombre: ['',[Validators.required]],
    Tipo: ['',[Validators.required]],
    Telefono: ['',[Validators.required]],
    Direccion: ['',[Validators.required]],
    Descripcion: ['',[Validators.required]],
    Foto: ['Foto'],
    Latitud: ['',[Validators.required]],
    Longitud: ['',[Validators.required]]
  });
  }

  onSubmit() {
    this.isSubmitted = false;
    if (!this.ionicForm.valid) {
     this.presentAlert();
      return false;
    } else {
     this.post(this.ionicForm.value);
    }
  }
  get errorControl() {
    return this.ionicForm.controls;
  }

 async post(data: any){
    this.http.post('https://separate.herokuapp.com/api/insert-new-bussine',data).subscribe(async dta =>{
      this.response = dta;
      if (this.response.ok == true) {
       await this.presentAlertReponseTrueFalsePostData('Exito!!!','Los datos se guardaron con exito...');
        this.ionicForm.reset();
      } else {
      await this.presentAlertReponseTrueFalsePostData('Opss','No podimos guardar los datos...');
      }
    });
  }

  takePicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
    });
  }

  loadPicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: false,
      targetHeight: 1024,
      targetWidth: 1024,
      correctOrientation: true,
      saveToPhotoAlbum: true
    };
    this.camera.getPicture(options).then(imageData => {
     this.base64Image = `data:image/jpeg;base64,${imageData}`;
    }, (err) => {
     console.log(err);
    });
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Opss',
      message: 'Debes de llenar todos los campos...',
      buttons: ['OK'],
    });
    await alert.present();
  }
  async presentAlertReponseTrueFalsePostData(tipo, mensaje) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: tipo,
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
