import Carousel from "nuka-carousel";
import s from "./Carousel.module.css";
import BannerOne from "../../assets/Banner_30oFF.png";
import BannerTwo from "../../assets/2_X_1_AGENDAS.png";
import BannerThree from "../../assets/banner1.jpg";

const CarouselComponent: React.FC = () => {
  return (
    <Carousel
      className={s.CarouselContainer}
      autoplay={true}
      wrapAround={true}
      autoplayInterval={4500}
      renderCenterLeftControls={({ previousSlide }) => (
        <button
          className={s.iButtonLeft}
          onClick={previousSlide}
        >
          <i>
            &#60;
          </i>
        </button>
      )}
      renderCenterRightControls={({ nextSlide }) => (
        <button
          className={s.iButtonRight}
          onClick={nextSlide}
        >
          <i>
            &#62;
          </i>
        </button>
      )}
    >
      <img className={s.bannerone} src={BannerOne} alt='banner' />
      <img className={s.bannertwo} src={BannerTwo} alt='banner' />
      <img className={s.bannerthree} src={BannerThree} alt='banner' />
    </Carousel>
  );
};

export default CarouselComponent;
