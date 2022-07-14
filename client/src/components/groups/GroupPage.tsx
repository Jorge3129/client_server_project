import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {IGroup} from '../../models/group';
import groupApi from "../../api/group-api";
import AddProductModal from "../modals/AddProductModal";
import ProductTable from "./ProductTable";
import {useFetchGroupProducts} from "../../hooks/useFetchGroupProducts";
import './styles/GroupPage.css'
import {ModalType, useModalContext} from "../../providers/ModalProvider";
import DeleteGroupModal from "../modals/DeleteGroup";
import GroupInfo from "./GroupInfo";
import EditGroupModal from '../modals/EditGroupModal';
import {useSearch} from "../../hooks/useSearch";
import DeleteProduct from "../modals/DeleteProduct";
import EditProductModal from "../modals/EditProductModal";
import {useGroupContext} from "../../providers/GroupsProvider";

const GroupPage = () => {
   const {groupId} = useParams();
   const numberGroupId = parseInt(groupId || '');
   const {groups} = useGroupContext();
   const [group, setGroup] = useState<IGroup>();
   const {modal, clearModal} = useModalContext()

   useEffect(() => {
      if (!numberGroupId || !groups) return;
      const newGroup = groups.find(g => g.id === numberGroupId)
      if (!newGroup) return;
      setGroup(newGroup)
   }, [numberGroupId, groups])

   const [products, setProducts] = useFetchGroupProducts(group);

   const [filteredProducts, searchValue] = useSearch(products);

   if (!group) return <div>"LOADING"</div>

   return (
       <section className="group_page flex-grow-1">
          <GroupInfo group={group} products={products} searchValue={searchValue}/>
          {!!filteredProducts?.length && <ProductTable products={filteredProducts}/>}
          <EditGroupModal show={modal.type === ModalType.EDIT_GROUP} onHide={clearModal}/>
          <DeleteGroupModal show={modal.type === ModalType.DELETE_GROUP} onHide={clearModal}/>
          <AddProductModal show={modal.type === ModalType.ADD_PRODUCT} onHide={clearModal} setProducts={setProducts}/>
          <EditProductModal show={modal.type === ModalType.EDIT_PRODUCT} onHide={clearModal} setProducts={setProducts}/>
          <DeleteProduct setProducts={setProducts} show={modal.type === ModalType.DELETE_PRODUCT} onHide={clearModal}/>
       </section>
   );
};

export default GroupPage;
