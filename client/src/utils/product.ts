import {IFormProduct} from "../components/modals/AddProductModal";
import {NoId} from "../models/utils";
import {IProduct} from "../models/product";

export const convertFormProductToProduct = (data: IFormProduct, groupId: number): NoId<IProduct> => {
   return {...data, price: parseInt(data.price), amount: parseInt(data.amount), groupId}
}
