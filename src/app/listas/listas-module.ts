import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListasComponent } from '../components/listas/listas.component';
import { IonicModule } from '@ionic/angular/lazy';
import { FormsModule } from '@angular/forms';
import { FiltroListaModule } from '../pipes/filtro-lista/filtro-lista-module';


@NgModule({
  declarations: [
    ListasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiltroListaModule
  ],
  exports:
  [
    ListasComponent
]
})
export class ListasModule { }
