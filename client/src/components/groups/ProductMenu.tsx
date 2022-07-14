import {Dispatch, FC, MouseEvent, SetStateAction, useEffect} from 'react';
import {IProduct} from '../../models/product';
import './styles/ProductMenu.css'
import {ModalType, useModalContext} from "../../providers/ModalProvider";

interface IProps {
   product: IProduct
   setShowMenu: Dispatch<SetStateAction<number>>
}

const ProductMenu: FC<IProps> = ({product, setShowMenu}) => {
   const {setModal} = useModalContext()

   const handleEdit = (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      setShowMenu(0);
      setModal({type: ModalType.EDIT_PRODUCT, data: {product}})
   }

   const handleDelete = (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      setShowMenu(0);
      setModal({type: ModalType.DELETE_PRODUCT, data: {product}})
   }

   return (
       <ul className="product_menu_list">
          <li onClick={handleEdit} className="product_menu_item">
             <span className="option_icon">
                <i className="fa-solid fa-pen"/>
             </span>
             <span className="option_title">Edit</span>
          </li>
          <li onClick={handleDelete} className="product_menu_item">
             <span className="option_icon">
                <i className="fa-solid fa-trash"/>
             </span>
             <span className="option_title">Delete</span>
          </li>
       </ul>
   );
};

export default ProductMenu;
