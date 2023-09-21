import { Link } from 'react-router-dom'
import React, { Component, useEffect, useRef, useState } from 'react'
import Header from './Header'
import SideNav from './SideNav'
import axiosClient from '../axios-client';


function Category() {

    const nameRef = useRef();

    const [image, setImage] = useState(null);
    const [items, setItems] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
        //   console.log(event.target.files[0]);
    };

    // const handleInputChange = (event) => {
    //   const { name, value } = event.target;
    //   setData((prevData) => ({
    //     ...prevData,
    //     [name]: value,
    //   }));
    // };

    const handleSubmit = (event) => {
        event.preventDefault();
        //   const payload = {
        //     name: data.name,
        //     image: image,
        //   }
        const formData = new FormData();
        formData.append('category_name', nameRef.current.value);
        formData.append('image', image);


        axiosClient.post('/addcategory', formData)
            .then(res => {
                if (res.data.status == 200) {
                    // alert(res.data.message);
                    fetchCategory();
                    nameRef.current.value = "";
                    let addCategory = document.querySelector(".addCategory-form-container")
                    return (
                        addCategory.style.display = "none"
                    )
                    // discordFun()
                }
                else if (res.data.status == 422) {
                    alert("all");
                }
            })

        // alert(res.data.message);

    };
    useEffect(() => {
        fetchCategory();
    }, [])

    function fetchCategory() {

        axiosClient.get('/getcategory')
            .then(res => {
                setItems(res.data);
                setLoading(false);

                // console.log("amrish,akash");

            })
    }
    function hoverCategory(e) {
        let categoryContainer = document.querySelector(".plusIconForCategory")
        e.target.categoryContainer.style.visibility = "visible"
    }
    return (
        <React.Fragment>
            <Header />
            <SideNav />
            <div className="all-count-container">
                <div className="product-header-part">
                    <div className="product-type-container">
                        <Link to="/inventory" className="product" style={{ borderStyle: "none", color: '#fff' }}>Products</Link>
                        <Link to="/category" className="category" style={{ borderStyle: "none", color: '#0DF2DC' }}>Category </Link>
                    </div>
                    <div className="addCategory-btn-container">
                        <button className="addNew" onClick={addCategory}>Add Category</button>
                        <button className="filter"><i class="fi fi-rs-bars-filter"></i>Filters</button>
                    </div>
                </div>
                <div className="category-main-container">
                    {isLoading ? (
                        <div className="loading-animation">
                            <div className="spinner"></div>
                        </div>
                    ) : (
                        items.map(item => (
                            <div className="category-container" key={item.id} onMouseOver={hoverCategory}>
                                <p>{item.category_name}</p>
                                <img src={`http://localhost:8000/${item.image}`} alt="" />
                                <div className='hoverCategoryContainer'>
                                    <h4 className='viewProducts'>View Products</h4>
                                    <i className="fi fi-rs-plus plusIconForCategory"></i>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className="addCategory-form-container" style={{ display: 'none' }}>
                    <form onSubmit={handleSubmit} encType='multipart/form-data'>
                        <div className='TopcategoryContainer'>
                            <h2>New Category</h2>
                            <i className="fi fi-rs-circle-xmark closeIcon" onClick={discordFun}></i>
                        </div>
                        <div className="category-image-container">
                            <div className="imageDot">
                                <i className="fa-regular fa-image"></i>
                                <label className='labelBox' for="inputTag" onClick={imageFun} style={{ color: 'red' }}>
                                    <span className='selectImage'>Select Image </span><br />
                                    <div className='changeImg'>
                                        <img alt="" className="image" />
                                    </div>
                                    <input id="inputTag" type="file" onChange={handleImageChange} />
                                    <br />
                                    <span id="imageName"></span>
                                </label>
                            </div>
                        </div>
                        <div className="innerContainer product-container brandName">
                            <span className="typeName">Category Name</span>
                            <input type="text" ref={nameRef} placeholder="Enter category name" />
                        </div>
                        <div className="footer-container">
                            <button className="addCategory">Add Category</button>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Category

function discordFun() {
    let addCategory = document.querySelector(".addCategory-form-container")
    return (
        addCategory.style.display = "none"
    )
}

function addCategory() {
    let addCategory = document.querySelector(".addCategory-form-container")
    return (
        addCategory.style.display = "block"
    )
}

function imageFun() {
    const imgInput = document.querySelector('#inputTag')
    let imgEl = document.querySelector('.image')
    const selectImage = document.querySelector(".selectImage")
    imgInput.addEventListener('change', () => {
        if (imgInput.files && imgInput.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imgEl.src = e.target.result;
                imgEl.style.height = "100px"
                imgEl.style.width = "100px";
            }
            reader.readAsDataURL(imgInput.files[0]);
        }
    })
}