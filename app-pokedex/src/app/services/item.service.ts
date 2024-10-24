import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetalleObjeto, ListaItemsResponse } from '../models/item.interface';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  

  constructor(private http: HttpClient) { }

  getListaItem(): Observable<ListaItemsResponse> {
   return this.http.get<ListaItemsResponse>('https://pokeapi.co/api/v2/item?limit=100');
  }

  getOneItem(name: string): Observable<DetalleObjeto> {
    return this.http.get<DetalleObjeto>(
      `https://pokeapi.co/api/v2/item/${name}`
    );
  }
}