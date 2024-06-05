import Carousel from "react-material-ui-carousel";
import styles from "./Carrouse.module.css";

interface ICarrousel {
  images: string[];
}
export const Carrousel = ({ images }: ICarrousel) => {
  return (
    <div className={styles.containerPincipalCarrousel__carrousel}>
      <Carousel>
        {images.map((item, i) => (
          <div key={i} className={styles.containerImg__carrousel}>
            <img src={item} className={styles.img__carrousel} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
