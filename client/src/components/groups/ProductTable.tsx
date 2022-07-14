import {FC} from 'react';
import {IProduct} from '../../models/product';
import {useSort} from "../../hooks/useSort";
import SortAngle from "../SortAngle";
import {titleCase} from "../../utils/format";
import './styles/ProductTable.css'

interface IProps {
   products: IProduct[]
}

const fields = ["id", "name", "description", "manufacturer", "price", "amount", "groupId"]

const ProductTable: FC<IProps> = ({products}) => {

   const [sortedProducts, {sort, chooseSort}] = useSort<IProduct>(products)

   const head =
       <tr>{fields.map(field =>
           <th key={field} onClick={e => chooseSort(field)}>
              <div className="table_cell">
                 <span className="table_cell_title">
                 {titleCase(field)}
                    <SortAngle className="sort_angle" show={sort && sort.prop === field} up={sort?.asc}/>
                 </span>
              </div>
           </th>)}
       </tr>

   const rows = sortedProducts.map(product =>
       <tr key={product.id} className="data_row">{
          fields.map(field =>
              <td key={product.id + field}>
                 <div className="table_cell">
                    <span className="table_cell_title">
                       {product[field as keyof IProduct]}
                    </span>
                 </div>
              </td>)}
       </tr>)

   return (
       <div className="product_table_container">
          <div className="product_table_scroll_container">
             <table className="product_table">
                <thead>{head}</thead>
                <tbody>{rows}</tbody>
             </table>
          </div>
       </div>
   );
};

export default ProductTable;

