import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {IProduct} from "../models/product";
import groupApi from "../api/group-api";
import {IGroup} from "../models/group";

export const useFetchGroupProducts = (group?: IGroup) => {
   const [products, setProducts] = useState<IProduct[]>();

   useEffect(() => {
      if (!group) return;
      groupApi.getGroupProducts(group.id).then(data => {
         if (Array.isArray(data)) setProducts(data);
      })
   }, [group]);

   return [products, setProducts] as [(IProduct[] | undefined), Dispatch<SetStateAction<(IProduct[] | undefined)>>]
}
