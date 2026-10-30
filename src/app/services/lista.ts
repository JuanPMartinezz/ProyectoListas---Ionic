import { Injectable, signal } from '@angular/core';
import { Lista } from '../models/lista.model';
import { AlertController, ToastController } from '@ionic/angular/lazy';

@Injectable({
    providedIn: "root"
})

export class ListaService{
  
    private readonly estadoListas = signal<Lista[]>([]);
    readonly listas = this.estadoListas.asReadonly();

    /**
     * @function crearLista
     * @description Crea nueva lista y la agrega al listado de listas
     * @param nombreLista 
     * @returns 
     */

    constructor(public alertController: AlertController, public toastController:ToastController){
        this.cargarStorage();
    }

    crearLista(nombreLista: string){
        const objetoLista = new Lista(nombreLista);
        this.estadoListas.update((listas)=>[...listas,objetoLista]);
        this.persistirStorage();

return objetoLista.titulo;
}

/** 
 * @function guardarStorage
 * @descriptionGuarda el estado de la lista en localstorage
 */

guardarStorage(){
    this.estadoListas.update((listas) => [...listas]);
    this.persistirStorage();
}

/** 
 * @function persistirStorage
 * @description Persiste el estado de las listas en localStorage
 */

private persistirStorage(){
    const stringListas = JSON.stringify(this.estadoListas());
    localStorage.setItem("listas",stringListas);
}

/** 
 * @function cargarStorage
 * @description Carga el estado de las listas desde LocalStorage
 */

private cargarStorage(){
    const listaStorage = localStorage.getItem("listas");
    if(listaStorage==null){
        this.estadoListas.set([]);
        return;
    }else{
        const objLista: Lista[] = JSON.parse(listaStorage);
        this.estadoListas.set(objLista);
    }
}

/** 
 * @function eliminarLista
 * @description Elimina lista del estado de listas y persiste el cambio en localStorage
 * @param lista De tipo lista, es la lista a eliminar
 */

eliminarLista(lista:Lista){
    this.estadoListas.update((listas)=> listas.filter((listaItem)=>listaItem.id !== lista.id));
    this.persistirStorage;
}

/** 
 * @function editarLista
 * @description edita una lista del estado de listas y persiste el cambio en LocalStorage
 * @param lista de tipo lista, es la lista a editar
 */

editarlista(lista:Lista){
    let listaEditar = this.listas().find((listaItem) => listaItem.id == lista.id);

    if(listaEditar){
        listaEditar.titulo = lista.titulo;
        this.guardarStorage();
    }
}

/**
 * @function presentToast
 * @description Muetra un toast con el mensaje y color especificado
 * @param mensage Texto a mostrar en toast
 * @param color Color del toast
 */
  async presentToast(mensage: string, color: string){
    let toast = await this.toastController.create({
      message: mensage,
      duration:2000,
      color:color
    });
    toast.present();
  }


/**
 * @description: Valida que el input no esté vacio
 * @param input De tipo Any, es el input a validar
 * @returns devuelve un boolean. Si el imput es valido: True, sino Falss
 */

  validarInput(input: any): boolean {
    if (input && input.titulo) {
      return true;
    }
    this.presentToast("Debe ingresar un valor","danger");
    return false;
  }

  obtenerLista(idLista:  string | number){
    const id = Number(idLista); //Parseo a number
    let lista = this.listas().find((itemLista)=> itemLista.id == id);

    return lista;
  }



}



