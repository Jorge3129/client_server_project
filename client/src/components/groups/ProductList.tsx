import React, {useEffect, useState} from 'react';
import productApi from "../../api/product-api";
import {IProduct} from "../../models/product";
import './styles/ProductList.css'
import {countTotalPrice} from "../../utils/group";

const ProductList = () => {

   const [products, setProducts] = useState<IProduct[]>();

   useEffect(() => {
      productApi.getAllProducts().then(data => {
         if (Array.isArray(data)) setProducts(data);
      })
   }, []);


   return (
       <div className="store_page">
          <div className="header">
             <div><b>Total Price:</b> {products && countTotalPrice(products)}</div>
          </div>
          <ul className="product_card_list">
             {products && products.map(product => (
                 <li className="product_card" key={product.id}>
                    <div><b>{product.name}</b></div>
                    <div>Description: {product.description}</div>
                    <div>Group Id: {product.groupId}</div>
                    <div>Price: {product.price}</div>
                    <div>Amount: {product.amount}</div>
                 </li>
             ))}
          </ul>
       </div>
   );
};

export default ProductList;
