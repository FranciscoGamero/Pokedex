import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListaPokemonResponse } from '../models/pokemon.interface';
import { DetallePokemon } from '../models/detallePokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) {}

  getListaPokemon(): Observable<ListaPokemonResponse>{
    return this.http.get<ListaPokemonResponse>('https://pokeapi.co/api/v2/pokemon')
  }
  getOnePokemon(nombre: string): Observable<DetallePokemon> {
    return this.http.get<DetallePokemon>(
      `https://pokeapi.co/api/v2/pokemon/${nombre}`
    );
  }
}
