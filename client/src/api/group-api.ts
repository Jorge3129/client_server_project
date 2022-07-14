import {IGroup} from "../models/group";
import {BaseAPI} from "./base-api";
import {API_URL} from "./constants";
import {NoId} from "../models/utils";
import {IProduct} from "../models/product";


class GroupApi extends BaseAPI {

   constructor() {
      super(API_URL + '/groups');
   }

   public async getAllGroups(): Promise<IGroup[]> {
      return this.get<IGroup[]>("")
          .then(res => res.data)
          .catch(err => err.response.data)
   }

   public async getOneGroup(id: number): Promise<IGroup> {
      return this.get<IGroup>("/" + id)
          .then(res => res.data)
          .catch(err => err.response.data)
   }

   public async postGroup(group: NoId<IGroup>): Promise<IGroup> {
      return this.post<IGroup>("", group)
          .then(res => res.data)
          .catch(err => err.response.data)
   }

   public async updateGroup(group: IGroup): Promise<any> {
      return this.put("/" + group.id, group)
          .then(res => res.data)
          .catch(err => err.response.data)
   }

   public async deleteGroup(id: number): Promise<any> {
      return this.delete("/" + id)
          .then(res => res.data)
          .catch(err => err.response.data)
   }

   public async getGroupProducts(groupId: number): Promise<IProduct[]> {
      return this.get<IProduct[]>("/" + groupId + '/products')
          .then(res => res.data)
          .catch(err => err.response.data)
   }
}

export default new GroupApi()
