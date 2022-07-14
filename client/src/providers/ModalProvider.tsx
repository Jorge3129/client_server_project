import {createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useState} from 'react';
import {IGroup} from "../models/group";
import {IProduct} from '../models/product';

export enum ModalType {
   NONE,
   ADD_GROUP,
   EDIT_GROUP,
   DELETE_GROUP,
   ADD_PRODUCT,
   EDIT_PRODUCT,
   DELETE_PRODUCT
}

export type ModalInfo = {
   type: ModalType,
   data?: any
}

interface IModalContext {
   modal: ModalInfo
   setModal: Dispatch<SetStateAction<ModalInfo>>
   clearModal: () => void
}

export const ModalContext = createContext<IModalContext>(null!)

export const ModalProvider: FC<PropsWithChildren<any>> = ({children}) => {

   const [modal, setModal] = useState<ModalInfo>({type: ModalType.NONE});

   const clearModal = () => setModal({type: ModalType.NONE})

   return <ModalContext.Provider value={{modal, clearModal, setModal}}>{children}</ModalContext.Provider>
};

export const useModalContext = () => useContext(ModalContext);

