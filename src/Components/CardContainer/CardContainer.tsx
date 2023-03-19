import { useSelector, } from 'react-redux';
import Card from '../Card/Card';
import style from './CardContainer.module.css';
import { RootState, } from '../../Redux/store';


const CardContainer: React.FC = ({currentProducts}:any) => {

    const products = useSelector((state: RootState) => state.filteredProducts);

    return (
        <>
            <h1>Nuestros productos</h1>
            <div className={style.cardContainer}>
                {
                    currentProducts.map((product: any) => {
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