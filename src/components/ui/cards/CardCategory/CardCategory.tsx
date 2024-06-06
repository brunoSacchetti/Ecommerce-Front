import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";


import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { setCategory, setCategoryData } from "../../../../redux/slices/Filters";

import { FC } from "react";
import { ICategoria } from "../../../../types/Categoria";
interface ICardCategory {
  category: ICategoria;
}
export const CardCategory: FC<ICardCategory> = ({ category }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const handleSelectCategory = () => {
    dispatch(setCategory(category.denominacion));
    dispatch(setCategoryData(category));
    navigate("/store");
  };
  
  const cat = useAppSelector((state) => state.filters.categoryData);
  console.log(cat);

  return (
    <Card
      onClick={() => {
        handleSelectCategory();
      }}
      sx={{ width: `100%`, height: "90%" }}
    >
      <CardMedia component="img" height={"70%"} image={"POLLOLOGO.png"} />
      <CardContent>
        <h2 style={{ textAlign: "center", fontSize: "2.1vh" }}>
          {category.denominacion}
        </h2>
      </CardContent>
    </Card>
  );
};
