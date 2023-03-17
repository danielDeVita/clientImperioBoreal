import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getProducts } from '../../Redux/actions';
import Card from '../Card/Card';

const CardContainer = () => {

    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    console.log(products)
    useEffect(() => {
        dispatch(getProducts())
    }, [])

    return (
        <div><h1>Nuestros productos</h1>
            {
                products.map(product => {
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
                        />
                    )
                })
            }
        </div>
    )
}

export default CardContainer