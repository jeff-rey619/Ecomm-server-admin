import React, { useState } from 'react';
import './AddProduct.css'
import UploadArea from '../../assets/upload_area.svg'
import { json } from 'react-router-dom';
function AddProduct(props) {
    const [image, setImage] = useState(false);
    const [product_Details, setProductDetails] = useState({
        name: '',
        image: "",
        category: "women",
        new_price: "",
        old_price:""
        
    })

    function imageHandler(e) {
        setImage(e.target.files[0])
    }

    const changeHandler = (e) => {
        setProductDetails({...product_Details , [e.target.name]:e.target.value})
    }

    const add_product = async() => {
        console.log(product_Details)
        let responseData;
        let product = product_Details;

        let formData = new FormData();
        formData.append('product', image);

        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            
            },
            body: formData,
            
        }).then((res) => 
             
            res.json()
            
            
        )
            .then((data) => {
                
                responseData = data;
              console.log(responseData)
            })
        
        if (responseData.Succes) {
console.log(product)
            product.image = responseData.Image_url;

            await fetch('http://localhost:4000/addproduct', {
                 method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            
                },
            body: JSON.stringify(product)
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res)
                (res.success ? alert("success") : alert("not success"))
                }
            )
        }
    }
    return (
        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>
                    Product title
                </p>
                <input value={product_Details.name} type="text" name="name" onChange={changeHandler} placeholder='Type here' id="" />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>
                        Price
                    </p>
                    <input value={product_Details.old_price} type="text" name="old_price" onChange={changeHandler} placeholder='Type here' id="" />
                </div>
                 <div className="addproduct-itemfield">
                    <p>
                        Offer  Price
                    </p>
                    <input value={product_Details.new_price} type="text" name="new_price" onChange={changeHandler} placeholder='Type here' id="" />
                </div>
            </div>

            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select name="category" value={product_Details.category} onChange={changeHandler} className='add-product-selector'>
                    <option value="Women">Women</option>
                    <option value="Men">Men</option>
                      <option value="Kid">Kid</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img  src={image?URL.createObjectURL(image):UploadArea} className='addproduct-thumbnail-img' alt="" />
                </label>
                <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
            </div>
            <button onClick={() => {
    add_product()
            }} className="addproduct-btn">
                Add
            </button>
        </div>
    );
}

export default AddProduct;