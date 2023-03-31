import Card from "../Card/Card";
import style from "./CardContainer.module.css";
import { productProps } from "../../props.d";
import { Product } from "../../types";

const CardContainer: React.FC<productProps> = ({ productsFiltered }) => {
  if (!productsFiltered) {
    return <div>No hay productos para mostrar</div>;
  }
  return (
    <>
      <div className={style.cardContainer}>
        {productsFiltered.map((product: Product) => {
          return (
            <Card
              key={product._id}
              descriptionName={product.descriptionName}
              category={product.category}
              price={product.price}
              _id={product._id}
              image={product.image}
              stock={product.stock}
            />
          );
        })}
      </div>
    </>
  );
};

export default CardContainer;
