import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon.interface';
import { PokemonService } from '../../services/pokemon.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContent } from '../pokemon-modal/pokemon-modal.component';
import { Observable } from 'rxjs';
import { DetallePokemon } from '../../models/detallePokemon.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lista-pokemon',
  templateUrl: './lista-pokemon.component.html',
  styleUrl: './lista-pokemon.component.css'
})
export class ListaPokemonComponent implements OnInit{
  listaPokemon: Pokemon[] = []

  constructor(private pokemonService: PokemonService, private modalService: NgbModal, private http: HttpClient){}
  ngOnInit(): void {
    this.pokemonService.getListaPokemon().subscribe((respuesta) =>
    this.listaPokemon= respuesta.results)
  }
  getImagenPokemon(value: String){
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${value.split('/')[6]}.png`
  }
  getOnePokemon(name: string): Observable<DetallePokemon> {
    return this.http.get<DetallePokemon>(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
  }
  capitalizeNombrePokemon(value: String){
    let primeraLetra = value.charAt(0);
    let resto = value.slice(1);
    return primeraLetra.toUpperCase() + resto.toLowerCase();
  }
  openModal(pokemon: Pokemon) {
    const modalRef = this.modalService.open(NgbdModalContent, { size: 'lg' }); // Abre el modal
    modalRef.componentInstance.PokemonSeleccionado = pokemon;  // Pasamos los datos del Pokémon seleccionado al modal
    
  }
}
