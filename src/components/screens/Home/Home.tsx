import { useEffect, useState } from "react";
import { CategoryService } from "../../../servicesBorrar/CategoryService";
import { ICategories } from "../../../typesBorrar/ICategories";
import { CardCategory } from "../../ui/cards/CardCategory/CardCategory";
import styles from "./Home.module.css";
import { Footer } from "../../ui/Footer/Footer";
import { ICategoria } from "../../../types/Categoria";
import { CategoriaService } from "../../../services/CategoriaService";
import { Header } from "../../ui/Header/Header";
const URLAPI = import.meta.env.VITE_API_URL;
export const Home = () => {
  const [categories, setCategories] = useState<ICategoria[]>([]);

  const categoriaService = new CategoriaService(`${URLAPI}/categoria`);

  const getCategories = async () => {
    const res = await categoriaService.getAll();
    setCategories(res);
  };

  useEffect(() => {
    getCategories();
  }, []);
  console.log(categories);
  
  return (
    <>
    <Header/>
      <div className={styles.containerPrincipal__home}>
        <div className={styles.containerimg__home}>
          <img src="./POLLOLOGO.png" />
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
{/*       <Footer /> */}
    </>
  );
};
