import {IGroup} from "../models/group"
import {createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useEffect, useState} from "react";
import groupApi from "../api/group-api";

interface IGroupContext {
   groups: IGroup[] | null
   loading: boolean
   setGroups: Dispatch<SetStateAction<IGroup[] | null>>
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

   const value = {groups, loading, setGroups};

   return <GroupContext.Provider value={value}>{children}</GroupContext.Provider>

}

export const useGroupContext = () => useContext(GroupContext);
