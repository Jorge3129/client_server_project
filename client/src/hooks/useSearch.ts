import {Dispatch, SetStateAction, useMemo, useState} from "react";
import {IProduct} from "../models/product";

interface SearchValue {
   search: string,
   setSearch: Dispatch<SetStateAction<string>>
}

export const useSearch = (items?: IProduct[]) => {
   const [search, setSearch] = useState<string>("")

   const filteredItems = useMemo(() => {
      if (!search) return items;
      return items?.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
   }, [search, items])

   return [filteredItems, {search, setSearch}] as [IProduct[], SearchValue]
}
