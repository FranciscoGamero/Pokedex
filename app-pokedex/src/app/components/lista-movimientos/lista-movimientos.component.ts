import { Component, OnInit } from '@angular/core';
import { Movimiento } from '../../models/movimiento.interface';
import { MovimientoService } from '../../services/movimiento.service';

@Component({
  selector: 'app-lista-movimientos',
  templateUrl: './lista-movimientos.component.html',
  styleUrl: './lista-movimientos.component.css'
})
export class ListaMovimientosComponent implements OnInit {

  listaMovimiento: Movimiento[]=[]

  constructor(private movimientoServicio: MovimientoService){}

  ngOnInit(): void {
      this.movimientoServicio.getListaMovimiento().subscribe((resp)=>{
        this.listaMovimiento = resp.results;
      })
  }
}
