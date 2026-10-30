
import { Component, OnInit, Input } from '@angular/core';
import { ListaService } from '../../services/lista';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
  standalone: false,
})
export class ListasComponent implements OnInit {

  @Input() tipo: string = "";

  constructor(
    public listaService: ListaService,
    private router: Router
  ) {}

  ngOnInit() {}

  get listasFiltradas(): Lista[] {
    switch (this.tipo.toLowerCase()) {

      case 'por hacer':
        return this.listaService.listas().filter(
          lista => !lista.completada
        );

      case 'haciendo':
        return this.listaService.listas().filter(
          lista => !lista.completada && lista.actividad.length > 0
        );

      case 'terminado':
        return this.listaService.listas().filter(
          lista => lista.completada
        );

      default:
        return this.listaService.listas();
    }
  }

  async editarLista(listaItem: Lista) {
    let alerta = await this.listaService.alertController.create({
      header: "Editar lista",
      inputs: [
        {
          type: "text",
          name: "titulo",
          placeholder: "Ingresar nuevo nombre de la lista",
          value: listaItem.titulo
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel"
        },
        {
          text: "Editar",
          handler: (data: any) => {
            let esValido: boolean =
              this.listaService.validarInput(data);

            if (esValido) {
              listaItem.titulo = data.titulo;
              this.listaService.editarlista(listaItem);
              this.listaService.presentToast(
                "Lista editada correctamente!",
                "success"
              );
            }
          }
        }
      ]
    });

    await alerta.present();
  }

  eliminarLista(listaItem: Lista) {
    this.listaService.eliminarLista(listaItem);
    console.log("Eliminar Lista", listaItem);
  }

  listaSeleccionada(listaItem: Lista) {
    const URL = "/agregar/" + listaItem.id;
    this.router.navigateByUrl(URL);
  }
}
