import { AppBar, Toolbar } from "@mui/material";
import { IconCustom } from "../Icon/Icon";
import { alertError } from "../../../helpers/alerts";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";
export const Header = () => {

  const total = useAppSelector((state) => state.cart.totalCount);

  const handleAlert = () => {
    alertError("Proximamente", "Todavia no esta disponible");
  };
  const navigate = useNavigate();
  const returnCategories = () => {
    navigate("/");
  };
  return (
    <AppBar position="static" style={{ backgroundColor: "var(--primary)" }}>
      <Toolbar variant="dense">
        <div className={styles.containerItems__Header}>
          <IconCustom icon="arrow_back" fnOnclick={returnCategories} />
          <div className={styles.containerActions}>
            <IconCustom fnOnclick={handleAlert} icon="account_circle" />
            <div className="ms-auto">
              <Link className="btn btn-primary position-relative" style={{marginRight: "220px"}} to="/cart">
                <span className="material-symbols-outlined m-1 mt-0">shopping_cart</span>
                Carrito
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {isNaN(total) ? 0 : total}{" "}
                  <span className="visually-hidden">products in cart</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};