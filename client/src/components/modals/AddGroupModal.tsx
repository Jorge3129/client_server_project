/* eslint-disable react/jsx-no-undef */
import {FC} from 'react';
import {useForm} from "react-hook-form";
import {IGroup} from "../../models/group";
import {NoId} from "../../models/utils";
import {Button, CloseButton, Form, Modal} from "react-bootstrap";

interface IProps {
   show: boolean,
   onHide: () => void
}

type INewGroup = NoId<IGroup>

const AddGroupModal: FC<IProps> = (props) => {

   const {register, handleSubmit} = useForm<INewGroup>();
   const {onHide} = props;

   const onSubmit = async (data: INewGroup) => {
      onHide();
   }

   return (
       <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <CloseButton className="close" onClick={onHide}/>
          <Modal.Header>
             <Modal.Title id="contained-modal-title-vcenter">
                Add Group
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

export default AddGroupModal;

