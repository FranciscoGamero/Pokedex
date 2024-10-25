import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetalleMovimiento, ListaMovimientoResponse } from '../models/movimiento.interface';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  constructor(private http: HttpClient) { }
  
  getListaMovimiento(): Observable<ListaMovimientoResponse>{
    return this.http.get<ListaMovimientoResponse>('https://pokeapi.co/api/v2/move?limit=25');
  }


  getOneMovimiento(name: string): Observable<DetalleMovimiento> {
    return this.http.get<DetalleMovimiento>(
      `https://pokeapi.co/api/v2/move/${name}`
    );
  }

}
