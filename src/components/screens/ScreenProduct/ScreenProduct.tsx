import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IconCustom } from "../../ui/Icon/Icon";
import { useEffect, useState } from "react";
import { Carrousel } from "../../ui/Carrousel/Carrousel";
import { Footer } from "../../ui/Footer/Footer";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { resetProductActive } from "../../../redux/slices/Products";
import { alertError } from "../../../helpers/alerts";
import { ImagenService } from "../../../services/ImagenService";
import IImagen from "../../../types/IImagen";
import Swal from "sweetalert2";

import styles from "./ScreenProduct.module.css";

const API_URL = import.meta.env.VITE_API_URL;

export const ScreenProduct = () => {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const handleNavigationBack = () => {
    dispatch(resetProductActive());
    navigation(-1);
  };

  const [amount, setAmount] = useState(1);
  const [images, setImages] = useState<IImagen[]>([]);
  const product = useAppSelector((state) => state.product.productActive);

  const imageServiceManufacturado = new ImagenService(`${API_URL}/ArticuloManufacturado`);
  const imageServiceInsumo = new ImagenService(`${API_URL}/ArticuloInsumo`);


  const incrementAmount = () => {
    setAmount((prev) => prev + 1);
  };
  const decrementAmount = () => {
    if (amount > 0) {
      setAmount((prev) => prev - 1);
    }
  };
  const handleAddToCart = () => {
    alertError("Proximamente", "Todavia no esta disponible");
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        let data;
        if (product?.tipo === "insumo") {
          data = await imageServiceInsumo.getImagesByArticuloId(product.id);
        } else if (product?.tipo === "manufacturado") {
          data = await imageServiceManufacturado.getImagesByArticuloId(product.id);
        } else {
          // Manejar el caso en el que el tipo de producto no sea "insumo" ni "manufacturado"
          console.error("Tipo de producto no válido:", product?.tipo);
          return; // Salir de la función sin cambiar el estado de las imágenes
        }
        setImages(data);
      } catch (error) {
        Swal.fire("Error", "Error al obtener las imágenes", "error");
      }
    };
  
    fetchImages();
  }, [product?.id, product?.tipo]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.containerPrincipal__Product}>
        <div className={styles.container__Product}>
          <div className={styles.buttonBack__product}>
            <Button onClick={handleNavigationBack} variant="contained">
              <IconCustom icon="arrow_back" /> Volver atras
            </Button>
          </div>
          <div className={styles.container__gridProduct}>
            <div className={styles.container__imageAndTitle}>
              <h2>{product.denominacion}</h2>
              <Carrousel images={images.map(img => img.url)} />
            </div>
            <div className={styles.containerProps}>
              <div style={{ textAlign: "center" }}>
                <div>
                  <p style={{ fontSize: "2vh" }}>{product.descripcion}</p>
                </div>
                <div>${product.precioVenta}</div>
              </div>
              <div className={styles.productContainerActions__Product}>
                <div className={styles.productAmount__Product}>
                  <Button
                    disabled={amount === 0}
                    variant="contained"
                    onClick={decrementAmount}
                  >
                    <IconCustom icon={`${amount > 1 ? "remove" : "delete"}`} />
                  </Button>
                  <h2>Cantidad: {amount}</h2>
                  <Button variant="contained" onClick={incrementAmount}>
                    <IconCustom icon="add" />
                  </Button>
                </div>
                <Button
                  onClick={handleAddToCart}
                  color="success"
                  variant="contained"
                >
                  Agregar al carrito <IconCustom icon="add_shopping_cart" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
