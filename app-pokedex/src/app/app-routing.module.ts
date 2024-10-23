import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPokemonComponent } from './components/lista-pokemon/lista-pokemon.component';
import { ListaItemComponent } from './components/lista-item/lista-item.component';
import { ListaMovimientosComponent } from './components/lista-movimientos/lista-movimientos.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: 'pokemon', component: ListaPokemonComponent},
  {path: 'item', component: ListaItemComponent},
  {path: 'movimientos', component: ListaMovimientosComponent},
  {path: '', redirectTo: '/pokemon', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
