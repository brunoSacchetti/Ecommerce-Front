import { useDispatch } from "react-redux";
import { addProductToCart, removeProductFromCart, resetCart, updateProductQuantity } from "../../../redux/slices/cartSlice";
import { useAppSelector } from "../../../hooks/redux";
import axios from "axios";
import { Header } from "../../ui/Header/Header";
import { PedidoService } from "../../../services/PedidoService";
import { PedidoDetalleService } from "../../../services/PedidoDetalleService";
import { DetallePedidoPost } from "../../../types/post/PedidoPost/DetallePedidoPost";
import { PedidoPost } from "../../../types/post/PedidoPost/PedidoPost";
import { Estado } from "../../../types/enum/Estado";
import { TipoEnvio } from "../../../types/enum/TipoEnvio";
import { FormaPago } from "../../../types/enum/FormaPago";

export const Cart = () => {

  const API_URL = import.meta.env.VITE_API_URL;

  //Services
  const pedidoService = new PedidoService(`${API_URL}/pedido`);
  const pedidoDetalleService = new PedidoDetalleService(`${API_URL}/DetallePedido`);

  const dispatch = useDispatch();
  const { productsList } = useAppSelector(state => state.cart);
  const productQuantities = useAppSelector((state) => state.cart.productQuantities);

  const handleRemoveInstrument = (productoId: number) => {
    dispatch(removeProductFromCart(productoId));
  };

  const handleIncrementQuantity = (id: number) => {
    dispatch(updateProductQuantity({ id, quantity: productQuantities[id] + 1 || 1 }));
  };
  
  const handleDecrementQuantity = (id: number) => {
    dispatch(updateProductQuantity({ id, quantity: productQuantities[id] - 1 || 0 }));
  };

  const handleSaveCart = async () => {
    try {
        let totalPedido = 0;

        const pedido: PedidoPost = {
            id: 0,
            eliminado: false,
            horaEstimadaFinalizacion: "18:30:00", // Esto es un ejemplo, debes proporcionar la hora real
            total: 0, // Se calculará más adelante
            totalCosto: 1000, // Se calculará más adelante
            estado: Estado.PREPARACION, // Estado predeterminado
            tipoEnvio: TipoEnvio.TAKE_AWAY, // Tipo de envío predeterminado
            formaPago: FormaPago.EFECTIVO, // Forma de pago predeterminada
            fechaPedido: new Date().toISOString(), // Fecha actual
            idSucursal: 1, // ID de la sucursal predeterminada
            detallePedidos: [], // Se llenará más adelante
        };

        // 2. Crear los detalles del pedido y calcular el total
        const detalles = [];

        for (const product of productsList) {
            const cantidad = productQuantities[product.id] || 1;
            const subTotal = product.precioVenta * cantidad;

            // Acumular el subtotal al total del pedido
            totalPedido += subTotal;

            const detalle: DetallePedidoPost = {
                id: 0,
                eliminado: false,
                cantidad,
                subTotal,
                idArticulo: product.id,
            };
            await pedidoDetalleService.post(`${API_URL}/DetallePedido`, detalle);
            detalles.push(detalle);
        }

        console.log(detalles);
        
        // Asignar el total calculado al pedido
        pedido.total = totalPedido;

        // 3. Asignar los detalles al pedido
        pedido.detallePedidos = detalles;

        console.log(pedido);
        

        // 4. Crear el pedido con los detalles
        const pedidoResponse = await pedidoService.post(`${API_URL}/pedido`, pedido);

        console.log(pedidoResponse);
        
        // 5. Reiniciar el carrito
        dispatch(resetCart());
        alert('El pedido se guardó correctamente');
    } catch (error) {
        console.error('Error al guardar el pedido:', error);
        alert('Hubo un error al guardar el pedido.');
    }
};
  
  
  

  return (
    <>
    <Header/>
      <h2>Carrito de Compra</h2>
      <button className="btn btn-primary mb-3" onClick={handleSaveCart}>Continuar</button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productsList.map(producto => {
            const quantity = productQuantities[producto.id] || 1;

            return (
              <tr key={producto.id}>
                <td>{producto.denominacion}</td>
                <td>${producto.precioVenta}</td>
                <td>
                  <button className="btn btn-sm btn-primary" onClick={() => handleDecrementQuantity(producto.id)}>
                    -
                  </button>
                  <span className="mx-2">{quantity}</span>
                  <button className="btn btn-sm btn-primary m-2" onClick={() => handleIncrementQuantity(producto.id)}>
                    +
                  </button>
                  <button className="btn btn-danger" onClick={() => handleRemoveInstrument(producto.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
