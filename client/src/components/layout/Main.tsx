import React, {useEffect, useState} from 'react';
import {Outlet} from 'react-router-dom';
import './styles/Main.css'
import {useGroupContext} from "../../providers/GroupsProvider";
import GroupItem from "./GroupItem";
import {Button} from "react-bootstrap";
import AddGroupModal from "../modals/AddGroupModal";
import {ModalType, useModalContext} from "../../providers/ModalProvider";

const Main = () => {

   const {loading, groups} = useGroupContext();
   const {modal, clearModal, setModal} = useModalContext()

   const showAddGroup = () => setModal({type: ModalType.ADD_GROUP})

   return (
       <main className="container-fluid flex-grow-1 p-0 d-flex">
          <section className="groups_sidebar">
             <div className="groups_sidebar_title">
                <span>Groups</span>
             </div>
             <ul className="group_list p-0 m-0">{loading ? <div>Loading...</div> : (
                 groups && (groups.length ?
                     groups.map(group => <GroupItem key={group.id} group={group}/>)
                     : "No groups yet..."))}
             </ul>
             <div className="add_group_button_container">
                <Button onClick={showAddGroup}>Add Group</Button>
             </div>
          </section>
          <Outlet/>
          <AddGroupModal show={modal.type === ModalType.ADD_GROUP} onHide={clearModal}/>
       </main>
   );
};

export default Main;

