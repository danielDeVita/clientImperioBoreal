import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Card from '../Card/Card';
import style from './CardContainer.module.css';
import { RootState, AppDispatch } from '../../Redux/store';
import { getProducts } from '../../Redux/actions';

const CardContainer: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const products = useSelector((state: RootState) => state.filteredProducts);

    // useEffect(() => {
    //     dispatch(getProducts())
    // }, [dispatch])

    return (
        <>
            <h1>Nuestros productos</h1>
            <div className={style.cardContainer}>
                {
                    products.map((product: any) => {
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