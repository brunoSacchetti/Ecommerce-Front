import { useState } from "react";
import { IconCustom } from "../Icon/Icon";
import { ProductService } from "../../../servicesBorrar/ProductService";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  setProducts,
  sortProductsByPrice,
} from "../../../redux/slices/Products";
import { setPrice } from "../../../redux/slices/Filters";
import styles from "./Fiters.module.css";
const URLAPI = import.meta.env.VITE_API_URL;
export const Filters = () => {
  const filtersValues = useAppSelector((state) => state.filters);
  const [openPrice, setOpenPrices] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);

  const handlePricesOptions = () => {
    setOpenPrices(!openPrice);
    if (openCategories) setOpenCategories(!openCategories);
  };

  const productService = new ProductService(`${URLAPI}/products`);

  const dispatch = useAppDispatch();

  const handleSetfilterPriceActive = async (price: string | null) => {
    if (price) {
      price === "Mayor Precio"
        ? dispatch(sortProductsByPrice(false))
        : dispatch(sortProductsByPrice(true));
      dispatch(setPrice(price));
    } else {
      const response = filtersValues.category
        ? await productService.getByCategory(filtersValues.category)
        : await productService.getAll();

      dispatch(setProducts(response));
      dispatch(setPrice(null));
    }
    setOpenPrices(false);
  };

  return (
    <>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div className={styles.containerPrincipal__filters}>
          {(filtersValues.category || filtersValues.price) && (
            <div className={styles.container__filterActives}>
              {filtersValues.category && (
                <p>
                  {filtersValues.category} {filtersValues.price && ">"}
                </p>
              )}

              {filtersValues.price && <p>{filtersValues.price}</p>}
            </div>
          )}
          <div
            onClick={handlePricesOptions}
            className={styles.container__filters}
          >
            <h3>Filtro</h3>
            <IconCustom icon="payment" />
          </div>

          {openPrice && (
            <div className={styles.containerPrices}>
              {["Limpiar filtro", "Mayor Precio", "Menor Precio"].map(
                (el, index) => (
                  <div
                    className={styles.containerPricesDiv}
                    key={index}
                    onClick={() => {
                      if (el !== "Limpiar filtro") {
                        handleSetfilterPriceActive(el);
                      } else {
                        handleSetfilterPriceActive(null);
                      }
                    }}
                  >
                    <p>{el}</p>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
