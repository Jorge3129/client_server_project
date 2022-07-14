import {useMemo, useState} from "react";
// @ts-ignore
import * as _ from 'lodash'

export interface SortOption {
   prop: string
   asc: boolean
}

interface SortValue {
   sort: SortOption,
   chooseSort: (prop: string) => void
}

export const useSort = <T>(items: T[]) => {
   const [sort, setSort] = useState<SortOption>()

   const sortedItems = useMemo(() => {
      if (!sort) return items;
      return _.orderBy(items, [sort.prop], [sort.asc ? "asc" : "desc"])
   }, [sort, items])

   const chooseSort = (prop: string) => {
      if (sort?.prop === prop) setSort({...sort, asc: !sort.asc})
      else setSort({prop, asc: true})
   }

   return [sortedItems, {sort, chooseSort}] as [Array<T>, SortValue]
}
