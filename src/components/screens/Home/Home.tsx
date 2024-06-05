import { useEffect, useState } from "react";
import { CategoryService } from "../../../services/CategoryService";
import { ICategories } from "../../../types/ICategories";
import { CardCategory } from "../../ui/cards/CardCategory/CardCategory";
import styles from "./Home.module.css";
import { Footer } from "../../ui/Footer/Footer";
const URLAPI = import.meta.env.VITE_API_URL;
export const Home = () => {
  const [categories, setCategories] = useState<ICategories[]>([]);

  const categoryService = new CategoryService(`${URLAPI}/categories`);

  const getCategories = async () => {
    const res = await categoryService.getAll();
    setCategories(res);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className={styles.containerPrincipal__home}>
        <div className={styles.containerimg__home}>
          <img src="./platoHome.png" />
          <div className={styles.text__home}>
            <h2>4 Tiempos</h2>
          </div>
        </div>
        <div className={styles.containerCategories}>
          <div>
            <h4>Categorias</h4>
          </div>
          <div className={styles.containerCardsCategories}>
            {categories.map((el) => (
              <CardCategory key={el.id} category={el} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
