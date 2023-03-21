import { ProductToStorage as Product } from "../types"

const useLocalStorage = (KEY: string) => {

    const createStorage = () => {
        if (!localStorage.getItem(KEY)) {
            localStorage.setItem(KEY, '[]')
        }
    }

    const getLocalStorage = () => {
        const values = JSON.parse(localStorage.getItem(KEY) as string)
        return values
    }

    const setItmes = (values: Product) => {
        const products = getLocalStorage()
        products.push(values)
        localStorage.setItem(KEY, JSON.stringify(products))
    }

    const deleteItems = (id: string | number) => {
        const products = getLocalStorage()
        const filteredProducst = products?.filter((item: Product) => item?.id !== id)
        localStorage.setItem(KEY, JSON.stringify(filteredProducst))
    }

    const clearStorage = () => {
        createStorage()
    }

    const validateProducst = (id: string | number): boolean => {
        const products = getLocalStorage()
        return products?.some(({ id }: Product) => id === id)
    }

    return {
        getLocalStorage,
        createStorage,
        setItmes,
        deleteItems,
        clearStorage,
        validateProducst
    }
}

export default useLocalStorage