import { FC, useState, useEffect } from "react";
import { alertError } from "../../../../helpers/alerts";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { setProductActive } from "../../../../redux/slices/Products";
import styles from "./CardProduct.module.css";
import { IconCustom } from "../../Icon/Icon";
import { Button } from "@mui/material";
import IArticuloManufacturado from "../../../../types/ArticuloManufacturado";
import { ImagenService } from "../../../../services/ImagenService";
import IImagen from "../../../../types/IImagen";
import Swal from "sweetalert2";
import IArticulo from "../../../../types/IArticulo";
import {
  addProductToCart,
  removeProductFromCart,
  updateProductQuantity,
} from "../../../../redux/slices/cartSlice";

const API_URL = import.meta.env.VITE_API_URL;

interface ICardProduct {
  product: IArticulo;
}

export const CardProduct: FC<ICardProduct> = ({ product }) => {
  const imageServiceManufacturado = new ImagenService(
    `${API_URL}/ArticuloManufacturado`
  );

  const imageServiceInsumo = new ImagenService(`${API_URL}/ArticuloInsumo`);

  const [images, setImages] = useState<IImagen[]>([]);
  const { productsList } = useAppSelector((state) => state.cart);


  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  /* useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await imageServiceManufacturado.getImagesByArticuloId(product.id);
        setImages(data);
      } catch (error) {
        Swal.fire("Error", "Error al obtener las imágenes", "error");
      }
    };

    fetchImages();
  }, [product.id]); */

  useEffect(() => {
    const fetchImages = async () => {
      try {
        let data;
        if (product.tipo === "insumo") {
          data = await imageServiceInsumo.getImagesByArticuloId(product.id);
        } else if (product.tipo === "manufacturado") {
          data = await imageServiceManufacturado.getImagesByArticuloId(
            product.id
          );
        } else {
          // Manejar el caso en el que el tipo de producto no sea "insumo" ni "manufacturado"
          console.error("Tipo de producto no válido:", product.tipo);
          return; // Salir de la función sin cambiar el estado de las imágenes
        }
        setImages(data);
      } catch (error) {
        Swal.fire("Error", "Error al obtener las imágenes", "error");
      }
    };

    fetchImages();
  }, [product.id, product.tipo]);

  /* const handleClickAddToCart = () => {
    alertError("Proximamente", "Todavia no esta disponible");
  }; */

  const handleAddOrRemoveProduct = (product: IArticulo) => {
    // Verifica si el producto ya está en el carrito
    if (productsList.find((pdt) => pdt.id === product.id)) {
      dispatch(removeProductFromCart(product.id)); // Asume que esta acción existe y está correctamente definida
    } else {
      dispatch(addProductToCart(product));
    }
  };

  
  const handleClickViewProduct = () => {
    dispatch(setProductActive(product));
    navigate("/product");
  };

  const isInCart = productsList.find((pdt) => pdt.id === product.id);

  return (
    <div className={styles.containerProduct__CardProduct}>
      <div
        onClick={handleClickViewProduct}
        className={styles.containerImg__CardProduct}
      >
        <img
          src={images.length > 0 ? images[0].url : "platoHome.png"}
          alt={product.denominacion}
        />
      </div>
      <div className={styles.containerProprItem__CardProduct}>
        <div
          onClick={handleClickViewProduct}
          className={styles.containerProps__CardProduct}
        >
          <p className={styles.titleCardItem__CardProduct}>
            {product.denominacion}
          </p>
        </div>
        <div
          onClick={handleClickViewProduct}
          className={styles.containerProps__CardProduct}
        >
          <p className={styles.descriptionItem__CardProduct}>
            {product.descripcion === undefined ? (
              "Descripción no disponible"
            ) : (
              <>
                {product.descripcion.substring(0, 100)}...
                <span className={styles.viewMore__CardProduct}>ver más</span>
              </>
            )}
          </p>
        </div>
        <div className={styles.actionCard__CardProduct}>
          <b>${product.precioVenta}</b>
          <Button
            className={`btn ${isInCart ? "btn-danger" : "btn-success"} `}
            style={{ width: "30%", margin: "10px" }}
            onClick={() => handleAddOrRemoveProduct(product)}
          >
            {isInCart ? "Remove" : "Add"} to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};
