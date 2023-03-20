import React, { useState } from "react";
import axios from "axios";
import style from "./createProductForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../Redux/store";
import { useDispatch } from "react-redux";
import { getProducts } from "../../Redux/actions";

interface Product {
  descriptionName: string;
  category: string;
  price: number;
  priceBusiness: number;
  priceVAT: number;
  priceVATBusiness: number;
  image: File | null;
}

interface Errors {
  descriptionName?: string;
  category?: string;
  price?: string;
  priceBusiness?: string;
  priceVAT?: string;
  priceVATBusiness?: string;
}

const validateInputs = (product: Product, touched: any): Errors => {
  const errors: Errors = {};

  if (touched.descriptionName && !product.descriptionName)
    errors.descriptionName = "Por favor ingrese un nombre para el producto.";
  if (touched.category && !product.category)
    errors.category = "Por favor ingrese una categoría para el producto.";
  if (touched.price && product.price <= 0)
    errors.price = "El precio debe ser mayor a cero.";
  if (touched.priceBusiness && product.priceBusiness <= 0)
    errors.priceBusiness =
      "El precio de venta a empresas debe ser mayor a cero.";
  if (touched.priceVAT && product.priceVAT <= 0)
    errors.priceVAT =
      "El precio con IVA para consumidores finales debe ser mayor a cero.";
  if (touched.priceVATBusiness && product.priceVATBusiness <= 0)
    errors.priceVATBusiness =
      "El precio con IVA para empresas debe ser mayor a cero.";

  return errors;
};

const CreateProductForm: React.FC = () => {
  const [touched, setTouched] = useState({
    descriptionName: false,
    category: false,
    price: false,
    priceBusiness: false,
    priceVAT: false,
    priceVATBusiness: false,
  });

  const [product, setProduct] = useState<Product>({
    descriptionName: "",
    category: "",
    price: 0,
    priceBusiness: 0,
    priceVAT: 0,
    priceVATBusiness: 0,
    image: null
  });

  const [errors, setErrors] = useState<Errors>({
    descriptionName: "",
    category: "",
    price: "",
    priceBusiness: "",
    priceVAT: "",
    priceVATBusiness: "",
  });
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
    setTouched({
      ...touched,
      [e.target.name]: true,
    });
    setErrors(
      validateInputs(product, {
        ...touched,
        [e.target.name]: true,
      })
    );
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    setProduct(prevFormData => ({
      ...prevFormData,
      image: selectedFile || null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {

      const dataToSend = new FormData();

      dataToSend.append('descriptionName', product.descriptionName);
      dataToSend.append('category', product.category)
      dataToSend.append('price', String(product.price))
      dataToSend.append('priceBusiness', String(product.priceBusiness))
      dataToSend.append('priceVAT', String(product.priceVAT))
      dataToSend.append('priceVATBusiness', String(product.priceVATBusiness))
      if (product.image) {
        dataToSend.append('image', (product.image))
      }
      const config = {
        headers: {
          "content-type": "application/json; charset=utf-8"
        }
      };
      if (Object.keys(errors).length === 0) {
        await axios.post("http://localhost:3001/products", dataToSend);
        console.log(product);
        alert("Producto creado");
        setProduct({
          descriptionName: "",
          category: "",
          price: 0,
          priceBusiness: 0,
          priceVAT: 0,
          priceVATBusiness: 0,
          image: null
        });

        dispatch(getProducts())
        navigate("/dashboard");
      } else {
        alert("Faltan completar campos");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={style.logoContainer}>
        <Link to="/">
          <img
            alt="logo"
            className={style.logoStyle}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMkAAAD7CAMAAAD3qkCRAAABJlBMVEX///92HmEOsbzkGBz9whaviaRxClt0GV9xAFr//f7jAACDOXBsAFQvLi5tAFX9wAAZFxcwLy/h0t0Aq7ehcZXy6vAoJycjIiLo6Ojx8fG9vb2ofZyzs7ORkJBJSEjX1tZ6enrGq77n3OSTWIQAAADkDhM7OjpZwsqS1NroTlBfX1/9xzPLssRmAE2YY4qviKSamZl8KmifbZGMS3u8nLP74OCioqJPTk52dnZoZ2fLy8sUEhLYxdPayNVgAEWGQXT+4Jz/+u7/9uH+5Kn+7cf9zE7qXmD1ubrwkpP97+/scnTc8vSz4uYzucN5zNOGhob+2H7+7879z1j+3Iv+4aL91G39zlbnQkT4zs/mLzLsb3HoR0rypabuiYv1vLz51NWr3+PL6+4frRbxAAAKW0lEQVR4nO2aC1faSBTHg+JMAiG8JAgUAbHaWhDF1CfWvlvXVre7fW4fq9//S+ydmUzegK7WxHPu75xiMpmJ95+5/zsTrKIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCILEiDYYzF2LwVzcEmw0nVwPdTNuCTaamroeNBu3BBtUgkp+H6gElfw+blhJq9lswY/aWZMfwGezztrZwcY9jffZYCfbcLDAW/d5I4y4J+7QXltr78evpH5wwAJaWDbNwoZSYz+arL1gmlVggR2vVM1qYYcFDZerJj+EroVd9nMf2kxzuR6/kmqVKykUi2ZbabEfXIlZXFlbKZo82MVicW+tzZQUiotruWKBjagVTNakrOXM3bZZXEySktwanDlK4EypigAXcznRuVUwt5VWlfeQSlZyRfgo5pKjJLcHIW1Xd3MeJWZYyQZ09SlZzK14eiRBidk0D5SzwoZ595VsLx4s7BXq1clKttlH0pW0C/uLhVaUkmKxsLzAlRTXzlaKhXqylWxsF7ZzVTt3QMlO6x582EqqUolZtQtakpXUC2u5xZpUAvNQLR5s20r29zWuJLe7a+5oCVfShCee23WV5A4OilyI3yf7VfMs6Uo0yJ0NRwn4RLP7+GoXrDw7SVeigB3qXiUSfxUGvQlXcqbsFJZbC1OVQO2qKYE1fjFJazwoadXrSqSSYvGs3ZRK9nKFlkfJTs48ayZi3yX3wlXuYzgQe+Fq1aPElHvhA9gvNwt8RG25yqtxfTlnmrnle7ErabX5u0Wt3RaxLNgH7bMNp0/zDNgQF+vKPvvgI0Rl299bWdn7H5t6fGdEJb+RgBJymdjpHVBCBqpBUxOhRqrh7eJXUplvNBqDTkWed7qp1JYlVvcldq1hHSqes3nRc8SOR+KC1Wj0rq9E17TOpj5BC9WPekrJGKtkqc+/v+93xGlXp4AhupT4NaJ3PWf9Ej8Z6IQYDTFmaOiDG1DCltvRlj4myYi+zn7zJCU63AQu9ysi2hQlKZrS+UNmw3R4THpHnhnGE6FknULObolbzBPyv/4kE5wTEc98hBaqGgORC5OVkEqJpAwee0elm4qyRUVoMIxWKl1K1u0zVdPsXWWWZrOU/gYlkO9zxG8Yamx25MXDiUpURTmiasdWAqnUIK4S3rYllbhB0O6QGrUbUiICt2S4Wi/rGoboWyM5ojJg8+UUsLASjSmRc+JXQmSbX0lFp/MDoi/djBJ6RGEWqKo3luS1w65IMqIPnbbSsE/4DGXpRCXRczJGSckgc5ZqjG5GCQwXZQuKy6ETWMNQDXXOKaq9I6aNshlaH6eEKDWa6h9GKoHsmiMeJXYC9FS1A/+sG1MiyxbVs05F16yOe5gyqFPAxiqBCaNkqEQracyTlCrPUmpfBA+mHB0apHGDSmTZot6JEFRgelj2yQvjlUC/7ChaSYoQ2EbUnDPdsu9llJZ0MVc3pgRCtoh49K5h4Peuc3vobgEbn129DqFjsisFtbZr3xFmaLguFG9SvVJheXmzSpyy5RYsOCf+AjZBCfh4SIkVqYRC0GKp8TleTxmaYthrwPVrV7anuc2ibPE5qMk5GnrmqGaNX080ZWgHE1G7unJSPErYdCxVYDVbur4SlXuDWDVPTA2d+cIAZ9Cgb5hn2KJPrq5kQGgqqOSQb2PAYKNrK1F7/LlTvzc0i4p1nk2NZ4jrGYtcWUlHtZPIowTa+PMSZfhaSoxS2BscWD8o6bvri8I9IxadEQ8haj2BFHKUbAWUwPMXSeRRAvPU7XTWqSjD11Wi+LzhXi915332sD0jGiOV0MYQdpB8EnsQe6cnHzZXAp4QScT8b1k8Z9d5gZAbsnnQZVnWdZS43ggtJvbleXGZWPblSCV8zVDF19YwfSr06ctZgPkirq6U/X6S5ZubniEcBGsnJcbV30R9SthDp3ahKgV7jsJTFqHkiQ4YXVvqoaobhi7rLlyDtaPfX5dnus7eT7S+/gSm6fCJ/oTPUB/a+1f/v1YBJYrcWxH9yGuYiD1ZpBKtwvBmZ693qLnXoO7xT9mTddV8PxTRHpkU05WoHV9baV3sWFLy6Vcsle+TDa9nFGbVJH0jwV9CjE2/lsqcLjZZ7C1xaaiHlxtepNl6QpLyf+7stAm5XG58+8OuSLas/wsPURxCSRgv9guVLK0OYotP3I18xJBwYYgXUV6Dy6KdV2CPhn+6xOI4tljHi73keVwuqMyp4Rbe07+AJoGX8sB+0sLlLv5w7e+PvLP3UkkI+Ucv5KGovmFXONgvx15HPc2nf3+MlyOfzuf/fmafVBqqXZHCX81qsso5mxXl+Z/5fP7RrYU6hXw6DVo+PbdP7a08fFh+ewykPZwXsg9/5dngRClhWl65hhFfBXm/+RLfcvk2Ky8e5cXQhClhWtKuYYa2YbrcMKOQtGdP83Jc8pRwMa5hBoZIpmyvk5LpJjcrzB7uqCQq8Rums2mIqhzYlLx85dWRTo7jfc/Xbxj5hxRvWXbs4fR/GkvYUTz7mA7Elv4or7GFUDWcTcmzv4My3MUoXmQ9DT/oP2WSVeacavzhU7DX55eBG8WFlnl7bB+Go/zrg79zwB5etcc/v9xm2BFomUzmj8f2ybOQYbyZ8zEduJp+Ksvc19eZzMPbDj2AlpmdvZ95+FWevwiHy9sj7OFUhTffMvdn7ydBCdPy7YfM86gUmpB4x2/vg47ZpChhWlzDPA/FHdIm0+rxHxl5g6QoATKZf/61W4O55JPhFmhmDzk6SUrYxHz/JS8Eq7LU8cpvj9lkKgkY5nNQC2xkgvZIjhIlEBAzzE/HML6q7NlcuvZwh72OS4HDr+8BLWCY145hnqbly4u7tPx6GDHi65jb3yr//hN+wl98hvHYQ/vxLazj5+Mxt74lHpzIo+OfmVCSzTqG+fD50/NLdVQu3t1m/C6r5dULeRz9qI/9Ax5PnDzl3fvyg1sL3sfqzEz5/blzOi39JxoKZnimPBOjEtBSfuB8/R5Vkr694Ze0H7MTipxyclrmN4tTCfv9p65hgssE88HbY2aPkESPPVbL9p1iVsKSzDFMYOkWSRTW8d1NO7CHc5/YlUAMM+dOu3c7FYXnjUapMXvMJEkJ0+JW5bBhvPZ4G7RHwpQw87tVOWwYxx7O+Iv35eAd4lISDIQZxl3b3nwJG8Z9uVTOZyKGx6Qk/ExFkjkd/Ibx2uPkQYSOmfLqSeQvugVOVstRAZ36tjF2Wt1/q116WByAZyOSxLeNgSURNiVvnCHvpk1lbEQlvM8wv754NiVTe8fKpZ/y1BmMn5OIOhbK/Isoe5Rn4rVHmNqYauQ87jETdx5jzGM5j4xVWCBaZ1LsEeYiKsnAMKdRzTGuHpchuJOytUTJq02/W8xEJlIwrc7jjvJyRJrboyNJVXcakYaxdSSt6k4j0jDJ2JRcnZBhElx1p+EzzJ2yRxhnh3Ln7BHm5BQWwbtpjzDnd9YeCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgV+c/mat35VFOYbIAAAAASUVORK5CYII="
          />
        </Link>
      </div>
      <Link to="/dashboard">
        <p className={style.backBtn}>
          <i className="fa-solid fa-arrow-left"></i>
        </p>
      </Link>
      <div className={style.divFormContainer}>
        <form className={style.formContainer} onSubmit={handleSubmit}>
          <h1 className={style.formTitulo}>Crea un nuevo producto</h1>

          <label className={style.formLabel} htmlFor="descriptionName">
            Nombre:{" "}
          </label>
          <input
            className={style.formInput}
            value={product.descriptionName}
            onChange={handleInputChange}
            id="descriptionName"
            type="text"
            name="descriptionName"
          />
          {errors?.descriptionName && (
            <p style={{ color: "red" }}>{errors?.descriptionName}</p>
          )}
          {/*El descriptionName ERROR y category ERROR se renderizan mal, el resto anda bien.*/}
          <label className={style.formLabel} htmlFor="category">
            Categoría:{" "}
          </label>
          <input
            className={style.formInput}
            value={product.category}
            onChange={handleInputChange}
            id="category"
            type="text"
            name="category"
          />
          {errors?.category && (
            <p style={{ color: "red" }}>{errors?.category}</p>
          )}

          <label className={style.formLabel} htmlFor="price">
            Precio:{" "}
          </label>
          <input
            min="0"
            className={style.formInput}
            value={product.price}
            onChange={handleInputChange}
            id="price"
            type="number"
            name="price"
          />
          {errors?.price && product?.price !== 0 && (
            <p style={{ color: "red" }}>{errors.price}</p>
          )}

          <label className={style.formLabel} htmlFor="priceBusiness">
            Precio venta empresas:{" "}
          </label>
          <input
            min="0"
            className={style.formInput}
            value={product.priceBusiness}
            onChange={handleInputChange}
            id="priceBusiness"
            type="number"
            name="priceBusiness"
          />
          {errors?.priceBusiness && product?.priceBusiness !== 0 && (
            <p style={{ color: "red" }}>{errors.priceBusiness}</p>
          )}

          <label className={style.formLabel} htmlFor="priceVAT">
            Precio Consumidor Final C/IVA:{" "}
          </label>
          <input
            min="0"
            className={style.formInput}
            value={product.priceVAT}
            onChange={handleInputChange}
            id="priceBusiness"
            type="number"
            name="priceVAT"
          />
          {errors?.priceVAT && product?.priceVAT !== 0 && (
            <p style={{ color: "red" }}>{errors.priceVAT}</p>
          )}

          <label className={style.formLabel} htmlFor="priceVATBusiness">
            Precio Empresa C/IVA:{" "}
          </label>
          <input
            min="0"
            className={style.formInput}
            value={product.priceVATBusiness}
            onChange={handleInputChange}
            id="priceVATBusiness"
            type="number"
            name="priceVATBusiness"
          />
          {errors?.priceVATBusiness && product?.priceVATBusiness !== 0 && (
            <p style={{ color: "red" }}>{errors.priceVATBusiness}</p>
          )}

          <label className={style.formLabel} htmlFor="image">Imagen</label>
          <input
            className={style.formInput}

            onChange={handleAvatarChange}
            id="image"
            type="file"
            name="image"
          />

          <button className={style.formButton} type="submit">
            Crear producto
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateProductForm;
