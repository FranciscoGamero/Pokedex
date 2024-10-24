export interface DetallePokemon {
    abilities: Ability[]
    base_experience: number
    height: number
    held_items: any[]
    id: number
    is_default: boolean
    location_area_encounters: string
    name: string
    order: number
    past_abilities: any[]
    past_types: any[]
    species: Species
    types: Type[]
    weight: number
  }
  export interface Ability {
    ability: Ability2
    is_hidden: boolean
    slot: number
  }
  
  export interface Ability2 {
    name: string
    url: string
  }
  export interface Species {
    name: string
    url: string
  }
  export interface Type {
    slot: number
    type: Type2
  }
  
  export interface Type2 {
    name: string
    url: string
  }
  export interface DescripcionPokemon {
    flavor_text_entries: FlavorTextEntry[]
  }
  export interface FlavorTextEntry {
    flavor_text: string
    language: Language
  }
  export interface Language {
    name: string
    url: string
  }