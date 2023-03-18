import React, { FC } from "react";
import style from "../Footer/Footer.module.css";

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <div className={style.footer}>
      <div className={style.infoLeft}>
        <h4>Imperio Boreal</h4>
        <span>
          Tel: +54 3525 63-8899
          <br />
          Dirección:
          <br />
          Mail:
        </span>
      </div>
      <div className={style.infoRight}>
      <a href='https://instagram.com/imperio.boreal?igshid=YjNmNGQ3MDY= '>Instagram
      <img src="https://cdn-icons-png.flaticon.com/512/270/270798.png" alt="Instagram"/>
        </a> 
      </div>
    </div>
  );
};

export default Footer;
