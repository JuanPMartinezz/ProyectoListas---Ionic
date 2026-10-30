import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaService } from '../services/lista';
import { Lista } from '../models/lista.model';
import { Actividad } from '../models/actividad.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
  standalone: false,
})
export class AgregarPage implements OnInit {

  lista:Lista;
  nombreItem:string;

  constructor(private router:ActivatedRoute, public listaService:ListaService, private changeDetector: ChangeDetectorRef) { 
    let idLista = this.router.snapshot.paramMap.get("idLista");
    this.lista = new Lista("");
    this.nombreItem ="";

    if(idLista){
      let objetoLista = this.listaService.obtenerLista(idLista);
      if(objetoLista){
        this.lista = objetoLista;
      }
    }
  }

  ngOnInit() {
  }

  agregar(){
    if(this.nombreItem.length===0){
      this.listaService.presentToast("El nombre del item no puede estar vacio","danger");
      return
    }
    const actividad = new Actividad(this.nombreItem);
    this.lista.actividad.push(actividad);
    this.validarActividades();
    this.nombreItem="";
    this.listaService.presentToast("Item agregado correctamente","success");
  }

  async editar(actividad:Actividad){
    let alerta = await this.listaService.alertController.create({
      header: "Editar lista",
      inputs:[
        {
          type:"text",
          name:"titulo",
          placeholder:"Ingresar nuevo nombre de la lista",
          value: actividad.descripcion
        }
      ],
      buttons:[
        {
          text:"Cancelar",
          role:"cancel"
        },
        {
          text:"Editar",
          handler:(data:{titulo?:string})=>{
            const esValido = this.listaService.validarInput(data);
            if(esValido){
              actividad.descripcion = data.titulo ?? "";
              this.listaService.guardarStorage();
              this.changeDetector.detectChanges();
              this.listaService.presentToast("Actividad editada correctamente","success");
            }
          }
        }
      ]
    })
    await alerta.present();
  }


  eliminar(actividad:Actividad){
    this.lista.actividad = this.lista.actividad.filter((item)=> item !== actividad);
    this.validarActividades();
  }

  cambioCheck(){
    this.validarActividades()
  }

  
validarActividades() {
  const totalActividades = this.lista.actividad.length;

  const pendientes = this.lista.actividad.filter(
    (item) => item.completado === false
  ).length;

  if (totalActividades > 0 && pendientes === 0) {
    this.lista.completada = true;
    this.lista.terminadaEn = new Date();
  } else {
    this.lista.completada = false;
    this.lista.terminadaEn = undefined;
  }

  this.listaService.guardarStorage();
}


}
