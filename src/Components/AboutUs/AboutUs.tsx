import React from 'react';
import { Link } from 'react-router-dom';
import style from '../AboutUs/AboutUs.module.css';

const AboutUs: React.FC = () => {
  return (
    <div className={style.container}>
      <h1>Bienvenidos Imperio Boreal</h1>
      <p>Somos una empresa comprometida con la educación y el desarrollo de nuestros clientes más jóvenes.
       Desde nuestra fundación, nos hemos enfocado en ofrecer una amplia variedad de productos de calidad,
        desde materiales escolares básicos hasta artículos especializados para diferentes necesidades y gustos.</p>
      <p>Nuestra misión es ser un aliado para nuestros clientes, ofreciendo los mejores productos al mejor 
        precio posible. Nos enorgullece ser una tienda de confianza para las familias y estudiantes de nuestra
         comunidad, ya que nos enfocamos en ofrecer no solo productos de calidad, sino también un servicio excepcional y una experiencia de compra agradable.</p>
      <p>Nos esforzamos por estar siempre al día en las últimas tendencias en materiales escolares y productos
         para el hogar, y trabajamos con proveedores de confianza para asegurarnos de que nuestros productos sean de alta calidad y seguros para su uso en el entorno escolar.</p>
      <p>Además, también nos preocupamos por la educación y el bienestar de nuestra comunidad, y por eso,
         trabajamos con escuelas y organizaciones locales para apoyar iniciativas y proyectos que promuevan
          la educación y el desarrollo de los jóvenes en nuestra comunidad.</p>
      <p>Estamos agradecidos por la confianza de nuestros clientes y nos esforzamos por ofrecer un servicio
         excepcional. Siempre estamos dispuestos a escuchar tus comentarios y sugerencias para seguir mejorando
          nuestros servicios y productos.</p>
      <p>¡Gracias por elegirnos como tu librería y tienda de útiles escolares de confianza!</p>
    
      <div className={style.containerBtn}>
        <Link to="/">
          <button>VOLVER</button>
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;