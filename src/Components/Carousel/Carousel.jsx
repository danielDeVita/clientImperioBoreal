import Carousel from 'nuka-carousel';
import s from './Carousel.module.css';
import BannerOne from '../../assets/banner1.jpg'
import BannerTwo from '../../assets/banner3.jpg'
import BannerThree from '../../assets/escolares.jpg'

const CarouselComponent = () => {
  return (
  <Carousel className={s.CarouselContainer} autoplay={true} wrapAround = {true}
  renderCenterLeftControls={({ previousSlide }) => (
    <button style={{marginLeft:"80px", backgroundColor:"transparent", border:"none", cursor:"pointer" }} onClick={previousSlide}>
      <i style={{color:"black", fontSize:"50px"}} >&#60;</i>
    </button>
  )}
  renderCenterRightControls={({ nextSlide }) => (
    <button style={{marginRight:"80px", backgroundColor:"transparent", border:"none", cursor:"pointer"   }}  onClick={nextSlide}>
      <i style={{color:"black", fontSize:"50px"}}>&#62;</i>
    </button>
  )}
  renderBottomCenterControls={false}

  >
    <img className={s.bannerone} src={BannerOne} alt="banner" />
    <img className={s.bannertwo} src={BannerTwo} alt="banner" />
    <img className={s.bannerthree} src={BannerThree} alt="banner" />
  </Carousel>
  )
}

export default CarouselComponent