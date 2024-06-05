import { Button, TextField } from "@mui/material";
import styles from "./SearchBar.module.css";
import { IconCustom } from "../Icon/Icon";
import { ChangeEvent } from "react";
import { ProductService } from "../../../servicesBorrar/ProductService";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setProducts } from "../../../redux/slices/Products";
import { setPrice, setSearch } from "../../../redux/slices/Filters";
const URLAPI = import.meta.env.VITE_API_URL;

export const SearchBar = () => {
  const dispatch = useAppDispatch();

  const onchange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  const productService = new ProductService(`${URLAPI}/products`);
  const { category, searchBar } = useAppSelector((state) => state.filters);
  const handleSearchByName = async () => {
    if (category) {
      const res = await productService.findByNameAndCategory(
        category,
        searchBar
      );
      dispatch(setProducts(res));
      dispatch(setPrice(null));
    }
  };

  return (
    <div className={styles.containnerPrincipal__SearchBar}>
      <div className={styles.containner__SearchBar}>
        <TextField
          style={{ width: "98%" }}
          onChange={onchange}
          autoComplete="off"
          label="Ingrese un producto"
          name="product"
          value={searchBar}
          InputProps={{
            endAdornment: (
              <Button onClick={handleSearchByName} variant="contained">
                <IconCustom icon="search" />
              </Button>
            ),
          }}
        />
      </div>
    </div>
  );
};
