import {Dispatch, FC, FormEvent, SetStateAction} from 'react';
import {Button, CloseButton, Form, Modal} from "react-bootstrap";
import {useModalContext} from "../../providers/ModalProvider";
import {IProduct} from "../../models/product";
import productApi from "../../api/product-api";
import './styles/Modal.css'

interface IProps {
   show: boolean,
   onHide: () => void
   setProducts: Dispatch<SetStateAction<IProduct[] | undefined>>
}

const DeleteProductModal: FC<IProps> = ({onHide, show, setProducts}) => {

   const {modal} = useModalContext();
   const product = modal.data?.product

   const onSubmit = async (e: FormEvent) => {
      e.preventDefault()
      const productId = product.id;
      if (!productId) return;
      const res = await productApi.deleteProduct(productId);
      console.log(res)
      setProducts(prods => (prods || []).filter(p => p.id !== productId))
      onHide();
   }

   return (
       <Modal {...{show, onHide}} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <CloseButton className="close" onClick={onHide}/>
          <Modal.Header>
             <Modal.Title id="contained-modal-title-vcenter">
                Delete product
             </Modal.Title>
          </Modal.Header>
          <Modal.Body>
             <div className="mb-3">
                Are you sure you want to delete product <b>{product?.name}</b>?
             </div>
             <Form onSubmit={onSubmit} noValidate>
                <Button className="me-2" variant="danger" type="submit">
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

export default DeleteProductModal;

