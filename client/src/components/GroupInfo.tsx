import {Dispatch, FC, SetStateAction} from 'react';
import {countTotalPrice} from "../utils/group";
import {Button, Form} from "react-bootstrap";
import {IGroup} from "../models/group";
import {IProduct} from "../models/product";
import {ModalType, useModalContext} from "../providers/ModalProvider";

interface IProps {
   group: IGroup
   products?: IProduct[]
   searchValue: {
      search: string
      setSearch: Dispatch<SetStateAction<string>>
   }
}

const GroupInfo: FC<IProps> = ({group, products, searchValue}) => {

   const {setModal} = useModalContext()
   const {search, setSearch} = searchValue;

   const showAddProduct = (group: IGroup) => () => setModal({type: ModalType.ADD_PRODUCT, data: {group}})
   const showEditGroup = (group: IGroup) => () => setModal({type: ModalType.EDIT_GROUP, data: {group}})
   const showDeleteGroup = (group: IGroup) => () => setModal({type: ModalType.DELETE_GROUP, data: {group}})

   return (
       <div className="group_info">
          {group &&
              <div>
                  <h3>{group.name}</h3>
                  <div>{group.description}</div>
                  <div>Total price: {!products ? group.totalPrice : countTotalPrice(products)}</div>
              </div>
          }
          <div className="group_info_controls">
             <Form.Control type="search"
                           placeholder="Search products..."
                           className="search_bar"
                           value={search}
                           onChange={e => setSearch(e.target.value)}/>
             <Button className="add_product_btn" onClick={showAddProduct(group)}>Add Product</Button>
          </div>
          <div className="group_menu">
             <button className="icon_button" onClick={showEditGroup(group)}>
                <i className="fa-solid fa-pen"/>
             </button>
             <button className="icon_button" onClick={showDeleteGroup(group)}>
                <i className="fa-solid fa-trash"/>
             </button>
          </div>
       </div>
   );
};

export default GroupInfo;
