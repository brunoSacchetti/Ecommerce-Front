import { Navigate, Route, Routes } from "react-router-dom";
import { ScreenStore } from "../components/screens/ScreenStore/ScreenStore";
import { ScreenProduct } from "../components/screens/ScreenProduct/ScreenProduct";
import { Home } from "../components/screens/Home/Home";
import { useAppSelector } from "../hooks/redux";

export const AppRouter = () => {
  const { category } = useAppSelector((state) => state.filters);
  const { productActive } = useAppSelector((state) => state.product);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/store"
        element={category ? <ScreenStore /> : <Navigate to="/" />}
      />
      <Route
        path="/product"
        element={productActive ? <ScreenProduct /> : <Navigate to="/store" />}
      />
    </Routes>
  );
};
