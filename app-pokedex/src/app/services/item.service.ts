import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListaItemsResponse } from '../models/item.interface';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  

  constructor(private http: HttpClient) { }

  getListaItem(): Observable<ListaItemsResponse> {
   return this.http.get<ListaItemsResponse>('https://pokeapi.co/api/v2/item');
  }
}
