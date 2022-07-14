import {INewFormProduct} from "../components/modals/AddProductModal";
import {NoId} from "../models/utils";
import {IProduct} from "../models/product";
import {IFormProduct} from "../components/modals/EditProductModal";

export const convertNewFormToNewProduct = (data: INewFormProduct, groupId: number): NoId<IProduct> => {
   return {...data, price: parseInt(data.price), amount: parseInt(data.amount), groupId}
}

export const convertFormToNewProduct = (data: IFormProduct & {}): IProduct => {
   return {
      ...data,
      price: parseInt(data.price) || 0,
      amount: parseInt(data.amount) || 0,
      groupId: parseInt(data.groupId) || 0,
      id: parseInt(data.id) || 0
   }
}

export const convertProductToForm = (data: IProduct): INewFormProduct | undefined => {
   if (!data) return;
   return {...data, price: data.price + '', amount: data.amount + ''}
}
