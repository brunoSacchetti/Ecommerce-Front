import { useEffect, useState } from "react";
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
import IArticulo from "../../../types/IArticulo";
import IArticuloGenerico from "../../../types/ArticuloGenerico/IArticuloGenerico";
import { ICategoria } from "../../../types/Categoria";

const API_URL = import.meta.env.VITE_API_URL;

export const ListProducts = () => {
  const dispatch = useAppDispatch();
  
  //const articuloManufacturadoService = new ArticuloManufacturadoService(`${API_URL}/ArticuloManufacturado`);

  const categoriaActual = useAppSelector((state) => state.filters.categoryData);

  const [insumosGenericos, setInsumosGenericos] = useState<IArticulo[]>([]);
  const [articulosManufacturadosGenericos, setArticulosManufacturadosGenericos] = useState<IArticulo[]>([]);
  const [articuloGenerico, setArticuloGenerico] = useState<IArticulo[]>([]);

  const filterInsumos = async () => {
    const allInsumos: IArticulo[] = [];
    categoriaActual?.forEach((cat: ICategoria) => {
      const insumosNoElaborar = cat.insumos
        .filter((insumo: any) => !(insumo.esParaElaborar))
        .map((insumo: any) => ({
          id: insumo.id,
          denominacion: insumo.denominacion,
        }));
      allInsumos.push(...insumosNoElaborar);
    });
    setInsumosGenericos(allInsumos);
  };

  const filterArticulosManufacturados = async () => {
    const allArticulosManufacturados: IArticulo[] = [];
    console.log(categoriaActual);
    
    
    categoriaActual?.forEach((cat: ICategoria) => {
      const articulosManufacturados = cat.articulosManufacturados.map(
        (articulo: any) => ({
          id: articulo.id,
          denominacion: articulo.denominacion,
        })
      );
      allArticulosManufacturados.push(...articulosManufacturados);
    });
    setArticulosManufacturadosGenericos(allArticulosManufacturados);
  };

  useEffect(() => {
    setArticuloGenerico([...insumosGenericos, ...articulosManufacturadosGenericos]);
  }, [insumosGenericos, articulosManufacturadosGenericos]);

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    await filterInsumos();
    await filterArticulosManufacturados();
  };



  const getAllProductsFromDb = async () => {
    //const res = await articuloManufacturadoService.getAll();
    dispatch(setProducts(articuloGenerico as IArticulo[]));
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
