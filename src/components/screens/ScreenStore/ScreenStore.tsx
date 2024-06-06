import { Filters } from "../../ui/Filters/Filters";
import { Footer } from "../../ui/Footer/Footer";
import { Header } from "../../ui/Header/Header";
import { ListProducts } from "../../ui/ListProducts/ListProducts";
import { SearchBar } from "../../ui/SearchBar/SearchBar";

export const ScreenStore = () => {
  return (
    <>
      <Header />
      <SearchBar />
      <Filters />
      <ListProducts />
      <Footer />
    </>
  );
};
