import {IProduct} from "../models/product";

export const countTotalPrice = (products: IProduct[]) => {
   return products.reduce((totalPrice, product) => totalPrice + product.price * product.amount, 0)
}
