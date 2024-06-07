import { Base } from "../../Base";
import { Estado } from "../../enum/Estado";
import { FormaPago } from "../../enum/FormaPago";
import { TipoEnvio } from "../../enum/TipoEnvio";
import { DetallePedidoPost } from "./DetallePedidoPost";

export interface PedidoPost extends Base<PedidoPost> {
    horaEstimadaFinalizacion: string,
    total: number,
    totalCosto: number,
    estado: Estado,
    tipoEnvio: TipoEnvio,
    formaPago: FormaPago,
    fechaPedido: string,
    idSucursal: number
    detallePedido: DetallePedidoPost[]
}