import { useSelector, } from 'react-redux';
import Card from '../Card/Card';
import style from './CardContainer.module.css';
import { RootState, } from '../../Redux/store';

interface Product {
    descriptionName: string;
    category: string;
    price: number;
    priceBusiness: number;
    priceVAT: number;
    priceVATBusiness: number;
  }
  interface Props {
    productProps: Product[];
  }
  

const CardContainer: React.FC<Props> = ({productProps}) => {

    return (
        <>
            <div className={style.cardContainer}>
                {
                    productProps.map((product: any) => {
                        return (
                            <Card
                                key={product._id}
                                descriptionName={product.descriptionName}
                                category={product.category}
                                price={product.price}
                                priceBusiness={product.priceBusiness}
                                priceVAT={product.priceVAT}
                                priceVATBusiness={product.priceVATBusiness}
                                id={product._id} 
                                img={''}                            />
                        )
                    })
                }
            </div>
        </>
    )
}

export default CardContainer