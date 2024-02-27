import React, { useState, useEffect } from 'react';

import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png'

function ListProduct() {
    const [allProducts, setallProducts] = useState([]);

    const  fetchInfo = async ()=> {
        await fetch('http://localhost:4000/allproducts')
            .then((res) => 
                res.json()
      
               
          
            )
            .then((data) => {
                console.log(data);
                  setallProducts(data)
        })
            
    }

    useEffect(() => {
     fetchInfo()   
    },[])

    return (
        <div className='list-product'>
            <h1>
                All Products List
            </h1>
            <div className="listproducts-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
  
            </div>
            <div className="listproduct-allproducts">
                <hr/>
                {allProducts?.map((res , index) => {
                    return (
                        <>
                        
                      
            <div key={index} className="listproducts-format-main listproduct-format">
                            <img src={res.image} alt="" className="listproduct-product-icon" /> 
                            <p>
                                {res.name}
                            </p>
                            <p>
                                $ {res.old_price}
                            </p>
                            <p>
                                $ {res.new_price}
                            </p>
                            <p>
                                {res.category}
                            </p>
                            <img className='listproduct-remove-icon' src={cross_icon} alt='' />
                        </div>
                        <hr/>
                          </>
    )
})}
            
            </div>
        </div>
    );
}

export default ListProduct;