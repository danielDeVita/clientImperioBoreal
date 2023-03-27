import * as React from 'react'
import { CartContextType, KEY_LOCAL_STORAGE } from '../types.d'

const CartContext = React.createContext<CartContextType | null>(null)

interface ProviderProps {
    children: React.ReactNode;
}

const PropsProvider: React.FC<ProviderProps> = ({ children }) => {
    const [totalCart, setTotalCart] = React.useState<number>(0)
    const [userId, setUserId] = React.useState<string>('')

    React.useEffect(() => {
        const values = JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE.KEY) as string)
        setTotalCart(values?.length)
    }, [])

    return (
        <CartContext.Provider value={{
            totalCart,
            setTotalCart,
            userId,
            setUserId
        }}>
            {children}
        </CartContext.Provider>
    )
}

export { CartContext, PropsProvider }