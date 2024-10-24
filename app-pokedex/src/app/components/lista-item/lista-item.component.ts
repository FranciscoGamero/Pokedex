import { Component, Input, OnInit } from '@angular/core';
import { DetalleObjeto, Item } from '../../models/item.interface';
import { ItemService } from '../../services/item.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lista-item',
  templateUrl: './lista-item.component.html',
  styleUrl: './lista-item.component.css'
})
export class ListaItemComponent implements OnInit {

  listaItem: Item[]=[];

 ItemSeleccionado: DetalleObjeto | undefined;
  itemDescripcion: string = '';

  constructor(private itemServicio: ItemService, private http: HttpClient){}

  ngOnInit(): void {
    this.itemServicio.getListaItem().subscribe((resp) => {
      this.listaItem = resp.results.map(item => {
        this.getItemDescription(item);
        return item;
      });
    });
       
  }


  getItemDescription(item: Item): void {
    this.itemServicio.getOneItem(item.name).subscribe(detalle => {
      const flavorTextEntry = detalle.flavor_text_entries.find(entry => entry.language.name === 'es');
      item.descripcion = flavorTextEntry?.text || '';
    });
  }

  getImagenUrl(imagen: String){
    return`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${imagen}.png`;
  }
}

