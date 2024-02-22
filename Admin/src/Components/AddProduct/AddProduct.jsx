import React from 'react';
import './AddProduct.css'
function AddProduct(props) {
    return (
        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>
                    Product title
                </p>
                <input type="text" name="name" placeholder='Type here' id="" />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>
                        Price
                    </p>
                    <input type="text" name="old_price" placeholder='Type here' id="" />
                </div>
                 <div className="addproduct-itemfield">
                    <p>
                        Offer  Price
                    </p>
                    <input type="text" name="new_price" placeholder='Type here' id="" />
                </div>
            </div>

            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select name="category" className='add-product-selector'>
                    <option value="Women">Women</option>
                    <option value="Men">Men</option>
                      <option value="Kid">Kid</option>
                </select>
            </div>
        </div>
    );
}

export default AddProduct;