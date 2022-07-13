import {IGroup} from "../models/group"
import {createContext, FC, PropsWithChildren, useContext, useEffect, useState} from "react";
import groupApi from "../api/group-api";


interface IGroupContext {
   groups: IGroup[] | null
   loading: boolean
   fetchGroups: () => void
}

export const GroupContext = createContext<IGroupContext>(null!)

export const GroupsProvider: FC<PropsWithChildren<any>> = ({children}) => {

   const [groups, setGroups] = useState<IGroup[] | null>(null);
   const [loading, setLoading] = useState<boolean>(false);

   const fetchGroups = () => {
      setLoading(true);
      groupApi.getAllGroups().then(data => {
         if (Array.isArray(data)) setGroups(data);
      })
      setLoading(false);
   }

   useEffect(() => {
      fetchGroups()
   }, [])

   const value = {groups, loading, fetchGroups};

   return <GroupContext.Provider value={value}>{children}</GroupContext.Provider>

}

export const useGroupContext = () => useContext(GroupContext);
