import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon.interface';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-lista-pokemon',
  templateUrl: './lista-pokemon.component.html',
  styleUrl: './lista-pokemon.component.css'
})
export class ListaPokemonComponent implements OnInit{
  listaPokemon: Pokemon[] = []

  constructor(private pokemonService: PokemonService){}
  ngOnInit(): void {
    this.pokemonService.getListaPokemon().subscribe((respuesta) =>
    this.listaPokemon= respuesta.results)
  }
  getImagenPokemon(value: String){
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${value.split('/')[6]}.png`
  }
}
