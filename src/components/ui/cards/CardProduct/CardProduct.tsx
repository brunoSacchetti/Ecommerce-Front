import { FC, useState, useEffect } from "react";
import { alertError } from "../../../../helpers/alerts";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../hooks/redux";
import { setProductActive } from "../../../../redux/slices/Products";
import styles from "./CardProduct.module.css";
import { IconCustom } from "../../Icon/Icon";
import { Button } from "@mui/material";
import IArticuloManufacturado from "../../../../types/ArticuloManufacturado";
import { ImagenService } from "../../../../services/ImagenService";
import IImagen from "../../../../types/IImagen";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL;

interface ICardProduct {
  product: IArticuloManufacturado;
}

export const CardProduct: FC<ICardProduct> = ({ product }) => {
  const imageService = new ImagenService(`${API_URL}/ArticuloManufacturado`);
  
  const [images, setImages] = useState<IImagen[]>([]);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await imageService.getImagesByArticuloId(product.id);
        setImages(data);
      } catch (error) {
        Swal.fire("Error", "Error al obtener las imágenes", "error");
      }
    };

    fetchImages();
  }, [product.id]);

  const handleClickAddToCart = () => {
    alertError("Proximamente", "Todavia no esta disponible");
  };

  const handleClickViewProduct = () => {
    dispatch(setProductActive(product));
    navigate("/product");
  };

  return (
    <div className={styles.containerProduct__CardProduct}>
      <div
        onClick={handleClickViewProduct}
        className={styles.containerImg__CardProduct}
      >
        <img src={images.length > 0 ? images[0].url : "platoHome.png"} alt={product.denominacion} />
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
            {product.descripcion.substring(0, 100)}...{" "}
            <span className={styles.viewMore__CardProduct}>ver más</span>
          </p>
        </div>
        <div className={styles.actionCard__CardProduct}>
          <b>${product.precioVenta}</b>
          <Button onClick={handleClickAddToCart} variant="outlined">
            Agregar
            <IconCustom icon="shopping_cart" />
          </Button>
        </div>
      </div>
    </div>
  );
};
