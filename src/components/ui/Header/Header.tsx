import { AppBar, Toolbar } from "@mui/material";
import { IconCustom } from "../Icon/Icon";
import { alertError } from "../../../helpers/alerts";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
export const Header = () => {
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
            <IconCustom fnOnclick={handleAlert} icon="shopping_cart" />
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};
