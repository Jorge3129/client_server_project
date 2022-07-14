import {Dispatch, FC, SetStateAction} from 'react';
import {useForm} from "react-hook-form";
import {ToString} from "../../models/utils";
import {Button, CloseButton, Form, Modal} from "react-bootstrap";
import {IProduct} from "../../models/product";
import productApi from "../../api/product-api";
import {convertFormProductToProduct} from "../../utils/product";
import {useModalContext} from "../../providers/ModalProvider";

interface IProps {
   show: boolean,
   onHide: () => void
   setProducts: Dispatch<SetStateAction<IProduct[] | undefined>>
}

export type IFormProduct = Omit<ToString<IProduct>, "id" | "groupId">

const AddProductModal: FC<IProps> = ({onHide, show, setProducts}) => {

   const {register, handleSubmit} = useForm<IFormProduct>();
   const {modal} = useModalContext();
   const group = modal.data?.group

   const onSubmit = async (data: IFormProduct) => {
      const groupId = group.id;
      if (!groupId) return;
      const newProduct = convertFormProductToProduct(data, groupId);
      const res = await productApi.postProduct(newProduct);
      console.log(res)
      if (typeof res === "object") setProducts(products => [...(products || []), res])
      onHide();
   }

   return (
       <Modal {...{onHide, show}} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <CloseButton className="close" onClick={onHide}/>
          <Modal.Header>
             <Modal.Title id="contained-modal-title-vcenter">
                <>Add Product to group <b>{group?.name}</b></>
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
                <Form.Group className="mb-3" controlId="formManufacturer">
                   <Form.Label>Description</Form.Label>
                   <Form.Control type="text" {...register("manufacturer")} placeholder="Enter manufacturer"/>
                </Form.Group> <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Description</Form.Label>
                <Form.Control type="number" {...register("price")} placeholder="Enter price"/>
             </Form.Group> <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Description</Form.Label>
                <Form.Control type="number" {...register("amount")} placeholder="Enter amount"/>
             </Form.Group>
                <Button variant="primary" type="submit">
                   Submit
                </Button>
             </Form>
          </Modal.Body>
       </Modal>
   );
};

export default AddProductModal;

