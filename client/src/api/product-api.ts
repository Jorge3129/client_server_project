import {IProduct} from "../models/product";
import {BaseAPI} from "./base-api";
import {API_URL} from "./constants";
import {NoId} from "../models/utils";


class ProductApi extends BaseAPI {

   constructor() {
      super(API_URL + '/products');
   }

   public async getAllProducts(): Promise<IProduct[]> {
      return this.get<IProduct[]>("")
          .then(res => res.data)
          .catch(err => err.response.data)
   }

   public async postProduct(product: NoId<IProduct>): Promise<IProduct> {
      return this.post<IProduct>("", product)
          .then(res => res.data)
          .catch(err => err.response.data)
   }

   public async updateProduct(product: IProduct): Promise<any> {
      return this.put("/" + product.id, product)
          .then(res => res.data)
          .catch(err => err.response.data)
   }

   public async deleteProduct(id: number): Promise<any> {
      return this.delete("/" + id)
          .then(res => res.data)
          .catch(err => err.response.data)
   }
}

export default new ProductApi()
