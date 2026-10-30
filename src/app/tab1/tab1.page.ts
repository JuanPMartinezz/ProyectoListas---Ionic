import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular/lazy';
import { Lista } from '../models/lista.model';
import { ListaService } from '../services/lista';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})

export class Tab1Page {

  constructor(public listaService:ListaService) { }
/**
 * @function AgregarLista
 * @description Muestra un alert para agregar una nueva lista
 */
  async AgregarLista() {
    let alerta = await this.listaService.alertController.create({
      header: "Agregar lista",
      inputs: [
        {
          type: "text",
          name: "titulo",
          placeholder: "Ingresar nombre de la lista"
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "Cancel"
        },
        {
          text: "Crear",
          handler: (data: any) => {
          let esValido:boolean = this.listaService.validarInput(data);
            if(esValido){
              let creadaOk = this.listaService.crearLista(data.titulo);
              if(creadaOk){
                this.listaService.presentToast("Lista Creada correctamente!","success");
              }
            }
          }
        }
      ]
    })
    await alerta.present();
    console.log('Hola Mundo!');
  }



}


