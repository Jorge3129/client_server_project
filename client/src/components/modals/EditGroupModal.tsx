import {FC, useEffect} from 'react';
import {useForm} from "react-hook-form";
import {IGroup} from "../../models/group";
import {NoId} from "../../models/utils";
import {Button, CloseButton, Form, Modal} from "react-bootstrap";
import groupApi from "../../api/group-api";
import {useGroupContext} from "../../providers/GroupsProvider";
import './styles/Modal.css'
import {useModalContext} from "../../providers/ModalProvider";
import {convertProductToForm} from "../../utils/product";

interface IProps {
   show: boolean,
   onHide: () => void
}

const EditGroupModal: FC<IProps> = ({show, onHide}) => {

   const {setGroups} = useGroupContext();
   const {modal} = useModalContext();
   const group = modal.data?.group
   const {register, handleSubmit, reset} = useForm<IGroup>({defaultValues: group});

   const onSubmit = async (data: IGroup) => {
      const res = await groupApi.updateGroup(data);
      console.log(res)
      if (!res) setGroups(groups => {
         const initGroups = groups || []
         const index = initGroups.findIndex(p => p.id === data.id);
         return [...initGroups.slice(0, index), data, ...initGroups.slice(index + 1)]
      })
      onHide();
   }

   useEffect(() => {
      const group = modal.data?.group
      reset(group)
   }, [modal])

   return (
       <Modal {...{show, onHide}} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <CloseButton className="close" onClick={onHide}/>
          <Modal.Header>
             <Modal.Title id="contained-modal-title-vcenter">
                Edit Group
             </Modal.Title>
          </Modal.Header>
          <Modal.Body>
             <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                   <Form.Label>Name</Form.Label>
                   <Form.Control type="text" {...register("name")} placeholder="Enter name"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                   <Form.Label>Description</Form.Label>
                   <Form.Control type="text" {...register("description")} placeholder="Enter description"/>
                </Form.Group>
                <Button variant="primary" type="submit">
                   Submit
                </Button>
             </Form>
          </Modal.Body>
       </Modal>
   );
};

export default EditGroupModal;

