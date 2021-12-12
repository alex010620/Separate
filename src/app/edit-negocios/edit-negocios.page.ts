/* eslint-disable no-var */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';
import { InicioPage } from '../inicio/inicio.page';
import { EditService } from '../Servicios/edit.service';

@Component({
  selector: 'app-edit-negocios',
  templateUrl: './edit-negocios.page.html',
  styleUrls: ['./edit-negocios.page.scss'],
  providers: [InicioPage]
})
export class EditNegociosPage implements OnInit {
  public base64Image: any;
  ionicForm: FormGroup;
  isSubmitted = false;
  response: any;
  data: any;
  negocio: any;
  public negocios: Array<any> = [];
  constructor(private formbuilder: FormBuilder,
              private camera: Camera,
              public alertController: AlertController,
              private http: HttpClient,
              private dataEdit: EditService,
              private ref: ChangeDetectorRef,
              private router: ActivatedRoute,
              private inicio: InicioPage,
              ) {
                this.loadForms();
              }
  ngOnInit() {
   var id = this.router.snapshot.paramMap.get('id');
    this.http.get('https://separate.herokuapp.com/api/select_negocios_for_id/'+id).subscribe(data=>{
      this.data = data;
      this.base64Image = this.data.data[0].Foto;
      this.loadDataForms(this.data.data[0]);
    });
  }

  loadDataForms(negocio){
    this.ionicForm.setValue({
      Nombre: negocio.Nombre,
      Tipo: negocio.Tipo,
      Telefono: negocio.Telefono,
      Direccion: negocio.Direccion,
      Descripcion: negocio.Descripcion,
      Foto: negocio.Foto,
      Latitud: negocio.Latitud,
      Longitud: negocio.Longitud
    });
  }

  loadForms(){
    this.ionicForm = this.formbuilder.group({
      Nombre: ['',[Validators.required]],
      Tipo: ['',[Validators.required]],
      Telefono: ['',[Validators.required]],
      Direccion: ['',[Validators.required]],
      Descripcion: ['',[Validators.required]],
      Foto: [''],
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
     this.put(this.ionicForm.value);
    }
  }
  get errorControl() {
    return this.ionicForm.controls;
  }

 async put(data: any){
    this.http.put('https://separate.herokuapp.com/api/update_negocios_for_id/'+this.data.data[0].IdNegocio,data).subscribe(async dta =>{
      this.response = dta;
      this.inicio.get();
      if (this.response.ok == true) {
       localStorage.setItem('.','.');
       await this.presentAlertReponseTrueFalsePostData('Exito!!!','Los datos se actualizaron con exito...');
      } else {
      await this.presentAlertReponseTrueFalsePostData('Opss','No podimos actualizaron los datos...');
      }
    });
  }
 volver(){
  this.inicio.get();
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
