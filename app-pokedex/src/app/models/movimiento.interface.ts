export interface ListaMovimientoResponse {
    count: number
    next: string
    previous: any
    results: Movimiento[]
  }
  
  export interface Movimiento {
    name: string
    url: string
  }