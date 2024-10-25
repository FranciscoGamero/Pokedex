import { Component, OnInit } from '@angular/core';
import { Movimiento, DetalleMovimiento } from '../../models/movimiento.interface';
import { MovimientoService } from '../../services/movimiento.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lista-movimientos',
  templateUrl: './lista-movimientos.component.html',
  styleUrls: ['./lista-movimientos.component.css']
})
export class ListaMovimientosComponent implements OnInit {

  listaMovimiento: Movimiento[] = [];
 
  movimientoDetalles: { [key: string]: DetalleMovimiento } = {};

  constructor(private movimientoServicio: MovimientoService, private http: HttpClient) {}

  ngOnInit(): void {
    this.movimientoServicio.getListaMovimiento().subscribe((resp) => {
      this.listaMovimiento = resp.results;
      this.listaMovimiento.forEach(movimiento => {
        this.getMovimientoDetalles(movimiento);
      });
    });
  }

  getMovimientoDetalles(movimiento: Movimiento): void {
    this.movimientoServicio.getOneMovimiento(movimiento.name).subscribe(detalle => {
      this.movimientoDetalles[movimiento.name] = detalle;
    });
  }

  getImagenUrl(imagen: string): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${imagen}.png`;
  }
}