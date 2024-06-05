import { FC } from "react";
import { alertError } from "../../../../helpers/alerts";
import { Iproduct } from "../../../../types/Iproduct";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../hooks/redux";
import { setProductActive } from "../../../../redux/slices/Products";
import styles from "./CardProduct.module.css";
import { IconCustom } from "../../Icon/Icon";
import { Button } from "@mui/material";

interface ICardProduct {
  product: Iproduct;
}

export const CardProduct: FC<ICardProduct> = ({ product }) => {
  const handleClickAddToCart = () => {
    alertError("Proximamente", "Todavia no esta disponible");
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
        <img src={product.images[0]} />
      </div>
      <div className={styles.containerProprItem__CardProduct}>
        <div
          onClick={handleClickViewProduct}
          className={styles.containerProps__CardProduct}
        >
          <p className={styles.titleCardItem__CardProduct}>
            {product.denomination}
          </p>
        </div>
        <div
          onClick={handleClickViewProduct}
          className={styles.containerProps__CardProduct}
        >
          <p className={styles.descriptionItem__CardProduct}>
            {product.description.substring(0, 100)}...{" "}
            <span className={styles.viewMore__CardProduct}>ver más</span>
          </p>
        </div>
        <div className={styles.actionCard__CardProduct}>
          <b>${product.price}</b>
          <Button onClick={handleClickAddToCart} variant="outlined">
            Agregar
            <IconCustom icon="shopping_cart" />
          </Button>
        </div>
      </div>
    </div>
  );
};
