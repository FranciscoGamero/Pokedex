import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListaPokemonResponse } from '../models/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) {}

  getListaPokemon(): Observable<ListaPokemonResponse>{
    return this.http.get<ListaPokemonResponse>('https://pokeapi.co/api/v2/pokemon')
  }
}
