import {Dispatch, FC, SetStateAction, useEffect} from 'react';
import {useForm} from "react-hook-form";
import {Button, CloseButton, Form, Modal} from "react-bootstrap";
import './styles/Modal.css'
import {useModalContext} from "../../providers/ModalProvider";
import {IProduct} from "../../models/product";
import {convertFormToNewProduct, convertProductToForm} from "../../utils/product";
import productApi from "../../api/product-api";
import {ToString} from "../../models/utils";

interface IProps {
   show: boolean,
   onHide: () => void
   setProducts: Dispatch<SetStateAction<IProduct[] | undefined>>
}

export type IFormProduct = ToString<IProduct>

const EditProductModal: FC<IProps> = ({show, onHide, setProducts}) => {

   const {modal} = useModalContext();
   const product = modal.data?.product
   const formProduct = convertProductToForm(product);
   const {register, handleSubmit, reset} = useForm<IFormProduct>({defaultValues: formProduct});

   const onSubmit = async (data: IFormProduct) => {
      const newProduct = convertFormToNewProduct(data);
      const res = await productApi.updateProduct(newProduct);
      console.log(res)
      if (!res) setProducts(products => {
         const initProducts = products || []
         const index = initProducts.findIndex(p => p.id === newProduct.id);
         return [...initProducts.slice(0, index), newProduct, ...initProducts.slice(index + 1)]
      })
      onHide();
   }

   useEffect(() => {
      const product = modal.data?.product
      const formProduct = convertProductToForm(product);
      reset(formProduct)
   }, [modal])

   return (
       <Modal {...{show, onHide}} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <CloseButton className="close" onClick={onHide}/>
          <Modal.Header>
             <Modal.Title id="contained-modal-title-vcenter">
                Edit product
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
                   <Form.Label>Manufacturer</Form.Label>
                   <Form.Control type="text" {...register("manufacturer")} placeholder="Enter manufacturer"/>
                </Form.Group> <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" {...register("price")} placeholder="Enter price"/>
             </Form.Group> <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Amount</Form.Label>
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

export default EditProductModal;

