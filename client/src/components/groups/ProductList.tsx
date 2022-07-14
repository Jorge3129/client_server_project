import React, {useEffect, useState} from 'react';
import productApi from "../../api/product-api";
import {IProduct} from "../../models/product";

const ProductList = () => {

   const [products, setProducts] = useState<IProduct[]>();

   useEffect(() => {
      productApi.getAllProducts().then(data => {
         if (Array.isArray(data)) setProducts(data);
      })
   }, []);


   return (
       <div>
          <ul>
             {products && products.map(product => (
                 <li key={product.id}>
                    <h2>{product.name}</h2>
                    <div>{product.description}</div>
                 </li>
             ))}
          </ul>
       </div>
   );
};

export default ProductList;
