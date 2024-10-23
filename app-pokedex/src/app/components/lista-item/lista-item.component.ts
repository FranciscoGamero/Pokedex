import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item.interface';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-lista-item',
  templateUrl: './lista-item.component.html',
  styleUrl: './lista-item.component.css'
})
export class ListaItemComponent implements OnInit {

  listaItem: Item[]=[];

  constructor(private itemServicio: ItemService){}

  ngOnInit(): void {
      this.itemServicio.getListaItem().subscribe((resp)=>{
        this.listaItem = resp.results;
      })
  }


  getImagenUrl(imagen: String){
    return`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${imagen}.png`;
  }

}
