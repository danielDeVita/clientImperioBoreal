import style from "../Footer/Footer.module.css";
import { Link } from "react-router-dom";
import logoNegro from "../../assets/logoNegro.png";
import { FaFacebook } from 'react-icons/fa';
import {GrInstagram } from 'react-icons/gr';


interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <div className={style.footer}>
      
      <div className={style.infoLeft}>
          <Link to="/aboutUs" className={style.aboutUsStyle}>
        <div>
            ACERCA DE NOSOTROS
        </div>
        <div className={style.imgContainer}>
          <img className={style.logoNegroStyle} src={logoNegro} alt="logo" />
        </div>
          </Link>
      </div>
      <div className={style.infoCenter}>
        <h4>CONTACTO</h4>
        <p>
          Tel: +54 3525 63-8899
        </p>
        <p>
          Dirección: Calle 22 Norte 289,<br></br>Col. Caroya, Córdoba
        </p>
      </div>
      <div className={style.infoRight}>
      <h4>REDES SOCIALES</h4>

      <div className={style.socialIcons}>
        <a href="https://instagram.com/imperio.boreal?igshid=YjNmNGQ3MDY= ">
          Instagram
          <GrInstagram/>
        </a>
        <a href="https://www.facebook.com/imperio.borealcc">
          Facebook <FaFacebook/>
          
        </a>
        </div>
      </div>
      
    </div>
  );
};

export default Footer;
