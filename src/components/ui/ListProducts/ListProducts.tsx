import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  setProducts,
  sortProductsByPrice,
} from "../../../redux/slices/Products";
import { ProductService } from "../../../servicesBorrar/ProductService";
import styles from "./ListProducts.module.css";
import { CardProduct } from "../cards/CardProduct/CardProduct";
import { ArticuloManufacturadoService } from "../../../services/ArticuloManufacturadoService";
import IArticuloManufacturado from "../../../types/ArticuloManufacturado";

const API_URL = import.meta.env.VITE_API_URL;

export const ListProducts = () => {
  const dispatch = useAppDispatch();
  
  const articuloManufacturadoService = new ArticuloManufacturadoService(`${API_URL}/ArticuloManufacturado`);

  const getAllProductsFromDb = async () => {
    const res = await articuloManufacturadoService.getAll();
    dispatch(setProducts(res as IArticuloManufacturado[]));

    if (filters.price) {
      dispatch(
        sortProductsByPrice(filters.price === "Mayor Precio" ? false : true)
      );
    }
  };


  /* const getProductsByName = async (name: string) => {
    if (filters.category) {
      const res = await articuloManufacturadoService.findByNameAndCategory(
        filters.category,
        name
      );
      dispatch(setProducts(res));
      if (filters.price) {
        dispatch(
          sortProductsByPrice(filters.price === "Mayor Precio" ? false : true)
        );
      }
    }
  }; */

 /*  const getProductByCategory = async (category: string) => {
    const res = await productService.getByCategory(category);
    dispatch(setProducts(res));
    if (filters.price) {
      dispatch(
        sortProductsByPrice(filters.price === "Mayor Precio" ? false : true)
      );
    }
  }; */

  const filters = useAppSelector((state) => state.filters);

 /*  useEffect(() => {
    if (filters.category) {
      getProductByCategory(filters.category);
    } else if (filters.searchBar !== "") {
      getProductsByName(filters.searchBar);
    } else {
      getAllProductsFromDb();
    }
  }, []); */

  useEffect(() => {
     getAllProductsFromDb();
  }, []);

  const products = useAppSelector((state) => state.product.products);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className={styles.containerPrincipal__ListProducts}>
        <div className={styles.containerProducts__ListProducts}>
          {products.map((el) => (
            <CardProduct key={el.id} product={el} />
          ))}
        </div>
      </div>
    </div>
  );
};
