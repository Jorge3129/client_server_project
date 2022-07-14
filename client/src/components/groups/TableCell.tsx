import {Dispatch, FC, SetStateAction, useEffect} from 'react';
import {IProduct} from "../../models/product";
import ProductMenu from "./ProductMenu";

interface IProps {
   product: IProduct,
   field: string
   showMenu: number
   setShowMenu: Dispatch<SetStateAction<number>>
}

const TableCell: FC<IProps> = ({product, field, setShowMenu, showMenu}) => {

   const menuButton =
       <span onClick={() => setShowMenu(menu => menu ? 0 : product.id)} className="product_menu_button">
          <i className="fa-solid fa-ellipsis-vertical"/>
       </span>

   return (
       <td key={product.id + field}>
          <div className="table_cell">
             <span className="table_cell_title">
                {product[field as keyof IProduct]}
             </span>
             {field === "name" && menuButton}
             {field === "name" && showMenu === product.id && <ProductMenu setShowMenu={setShowMenu} product={product}/>}
          </div>
       </td>
   );
};

export default TableCell;
