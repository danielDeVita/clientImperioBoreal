import React from "react";
import style from "../Reviews/Reviews.module.css"

function Reviews() {

  return (
    <div className={style.container}>
      <h2 className={style.h4}><strong>Cantidad de comentarios:</strong></h2>
      <br /> 
      <p>Este producto aún no tiene reseñas. ¡Sé el primero en compartirnos tu opinión!</p>
      <br />
      <form>
        <div>
          <label className={style.label}>Valoración de tu compra</label>
          <select className={style.select} name="rating">
            <option value="">seleccionar</option>
            <option value="★☆☆☆☆">★☆☆☆☆</option>
            <option value="★★☆☆☆">★★☆☆☆</option>
            <option value="★★★☆☆">★★★☆☆</option>
            <option value="★★★★☆">★★★★☆</option>
            <option value="★★★★★">★★★★★</option>
          </select>
        </div>
        <textarea className={style.textarea}
          rows={5}
          name="description"
          placeholder="Escribe un comentario sobre tu compra"
        />
        <br />
        <input className={style.input} type="submit" value="Agregar Comentario" />
      </form>
    </div>
  );
}

export default Reviews;
