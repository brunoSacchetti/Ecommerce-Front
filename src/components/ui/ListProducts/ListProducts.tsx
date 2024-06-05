import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  setProducts,
  sortProductsByPrice,
} from "../../../redux/slices/Products";
import { ProductService } from "../../../services/ProductService";
import styles from "./ListProducts.module.css";
import { CardProduct } from "../cards/CardProduct/CardProduct";
const URLAPI = import.meta.env.VITE_API_URL;
export const ListProducts = () => {
  const dispatch = useAppDispatch();
  const productService = new ProductService(`${URLAPI}/products`);

  const getAllProductsFromDb = async () => {
    const res = await productService.getAll();
    dispatch(setProducts(res));

    if (filters.price) {
      dispatch(
        sortProductsByPrice(filters.price === "Mayor Precio" ? false : true)
      );
    }
  };

  const getProductsByName = async (name: string) => {
    if (filters.category) {
      const res = await productService.findByNameAndCategory(
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
  };

  const getProductByCategory = async (category: string) => {
    const res = await productService.getByCategory(category);
    dispatch(setProducts(res));
    if (filters.price) {
      dispatch(
        sortProductsByPrice(filters.price === "Mayor Precio" ? false : true)
      );
    }
  };

  const filters = useAppSelector((state) => state.filters);

  useEffect(() => {
    if (filters.category) {
      getProductByCategory(filters.category);
    } else if (filters.searchBar !== "") {
      getProductsByName(filters.searchBar);
    } else {
      getAllProductsFromDb();
    }
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
