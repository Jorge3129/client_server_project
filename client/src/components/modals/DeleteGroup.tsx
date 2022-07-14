import {FC, FormEvent} from 'react';
import {Button, CloseButton, Form, Modal} from "react-bootstrap";
import groupApi from "../../api/group-api";
import {useGroupContext} from "../../providers/GroupsProvider";
import {useModalContext} from "../../providers/ModalProvider";
import {useNavigate} from "react-router-dom";

interface IProps {
   show: boolean,
   onHide: () => void
}

const DeleteGroupModal: FC<IProps> = (props) => {

   const {setGroups} = useGroupContext();
   const {onHide} = props;
   const {modal} = useModalContext();
   const group = modal.data?.group

   const navigate = useNavigate();

   const onSubmit = async (e: FormEvent) => {
      e.preventDefault()
      const groupId = group.id;
      if (!groupId) return;
      const res = await groupApi.deleteGroup(groupId);
      console.log(res)
      setGroups(groups => (groups || []).filter(g => g.id !== groupId))
      navigate('/')
      onHide();
   }

   return (
       <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <CloseButton className="close" onClick={onHide}/>
          <Modal.Header>
             <Modal.Title id="contained-modal-title-vcenter">
                Delete Group
             </Modal.Title>
          </Modal.Header>
          <Modal.Body>
             Are you sure you want to delete this group?
             <Form onSubmit={onSubmit} noValidate>
                <Button variant="danger" type="submit">
                   Delete
                </Button>
                <Button variant="secondary" type="submit">
                   Cancel
                </Button>
             </Form>
          </Modal.Body>
       </Modal>
   );
};

export default DeleteGroupModal;

