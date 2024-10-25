import { Component, Input, OnInit, inject } from '@angular/core';
import { DescripcionPokemon, DetallePokemon } from '../../models/detallePokemon.interface';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PokemonService } from '../../services/pokemon.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pokemon-modal',
  templateUrl: './pokemon-modal.component.html',
  styleUrl: './pokemon-modal.component.css'
})
export class NgbdModalContent implements OnInit{

  @Input() PokemonSeleccionado: DetallePokemon | undefined;
  pokemonDescription: string = '';

  constructor(private pokemonService: PokemonService, private http: HttpClient){}
  ngOnInit(): void {
    if (this.PokemonSeleccionado) {
      this.getPokemonDescription(this.PokemonSeleccionado.name);
      this.pokemonService.getOnePokemon(this.PokemonSeleccionado.name).subscribe(
        (detalle: DetallePokemon) => {
          this.PokemonSeleccionado = detalle;
        }
      );
    }
  }
  getPokemonDescription(pokemonName: string): void {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonName.toLowerCase()}/`;

    this.http.get<DescripcionPokemon>(apiUrl).subscribe((descripcion) => {
      this.pokemonDescription = this.extractFlavorText(descripcion);
    });
  }
	activeModal = inject(NgbActiveModal);

  getImagePokemon(){
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.PokemonSeleccionado?.id}.png`
}
  capitalize(value: String){
    let primeraLetra = value.charAt(0);
    let resto = value.slice(1);
    return primeraLetra.toUpperCase() + resto.toLowerCase();
  }
  private extractFlavorText(descripcion: DescripcionPokemon): string {
    const flavorTextEntry = descripcion.flavor_text_entries.find(entry => entry.language.name === 'es');
    return flavorTextEntry!.flavor_text;
  }

  fondoTipos(nombreTipo: String){
    switch(nombreTipo){
      
    }
  }
}

export class PokemonModalComponent{

  constructor(private modalService = inject(NgbModal)){}

}
