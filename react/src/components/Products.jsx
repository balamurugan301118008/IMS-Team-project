
import { Link, } from 'react-router-dom'
import React, { Component, useEffect, useRef, useState } from 'react'
import Header from './Header'
import SideNav from './SideNav'
import axiosClient from '../axios-client';


function Products() {

    const product_nameRef = useRef();
    const skuRef = useRef();
    const descriptionRef = useRef();
    const category_idRef = useRef();
    const priceRef = useRef();
    const quantityRef = useRef();
    const brand_nameRef = useRef();
    const sizeRef = useRef();
    const colorRef = useRef();
    const materialRef = useRef();
    const vendorNameRef = useRef();
    const brandNameRef = useRef();

    const searchRef = useRef();
    const vendorNewNameRef = useRef();

    /* --------- pagination -------*/

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    useEffect(() => {
        fetchData(currentPage);
        fetchBrand();
        fetchCategory();
        fetchVendor();

    }, [currentPage]);

    function fetchData(page) {
        try {
            axiosClient.get(`/paginated-data?page=${page}`)
                .then(res => {

                    setData(res.data.data);
                    setTotalPages(res.data.last_page);
                    setisLoaded(false)

                })


        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    const [isLoaded, setisLoaded] = useState(true);

    const [image, setImage] = useState(null);
    const [items, setItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState(null);
    const [brands, setBrand] = useState([]);
    const [vendors, setVendor] = useState([]);
    const [particularProduct, setParticularProduct] = useState([]);





    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };


    function ProductLists(event) {

        const particularProductId = event.target.id;

        axiosClient.get(`/getParticularProduct/${particularProductId}`)
            .then(res => {
                //     if(res.data){
                console.log(res.data);
                setParticularProduct(res.data);
                let block = document.querySelector(".allProductBackground")
                let none = document.querySelector(".product-list-mainContainer")
                return (
                    none.style.display = "none",
                    block.style.display = "block"
                )
                // }
            })


    }


    const HandleDelete = (event) => {
        event.preventDefault();
        const itemId = event.target.id;
        axiosClient.delete(`/deleteProduct/${itemId}`)
            .then(res => {
                if (res.data.status == 200) {
                    setMessage(res.data.message);
                    // fetchProducts();
                    fetchData(currentPage);
                    setisLoaded(false)

                    // fetchData(page);

                }
            })
    }


    function formatDate(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString(); // You can customize the formatting as needed
    }




    const HandleEdit = (event) => {
        event.preventDefault();
        const editId = event.target.id;
        axiosClient.get(`/editProduct/${editId}`)
            .then(res => {
                console.log(res);
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('product_name', product_nameRef.current.value);
        formData.append('sku', skuRef.current.value);
        formData.append('description', descriptionRef.current.value);
        formData.append('category_id', category_idRef.current.value);
        formData.append('price', priceRef.current.value);
        formData.append('quantity', quantityRef.current.value);
        formData.append('brand_name', brand_nameRef.current.innerText);
        formData.append('size', sizeRef.current.value);
        formData.append('color', colorRef.current.value);
        formData.append('material', materialRef.current.value);
        formData.append('vendor_name', vendorNameRef.current.innerText);
        formData.append('image', image);

        axiosClient.post('/addProduct', formData)
            .then(res => {
                if (res.data.status == 200) {
                    alert(res.data.message);
                    fetchData(currentPage);
                    window.location.reload();
                }
                else if (res.data.status == 422) {
                    alert("All fields are required *  ");
                }
            })
        // let productForm = document.querySelector(".addProduct-form-container")
        // productForm.style.display = "none";
    };



    // useEffect(() => {
    //     fetchProducts();
    // }, [])




    function fetchCategory() {
        axiosClient.get('/getcategory')
            .then(res => {
                setItems(res.data);
            })
    }



    function fetchBrand() {
        axiosClient.get('/getbrand')
            .then(res => {
                setBrand(res.data);
            })
    }

    function fetchVendor() {
        axiosClient.get('/getVendor')
            .then(res => {
                setVendor(res.data);
                // console.log(res.data);
            })
    }


    function onDataVendorShow() {
        // event.preventDefault();
        let drop = document.querySelector(".vendorListContainer")
        let downArrow = document.querySelector(".VendordownArrow")
        return (
            drop.style.display = "block",
            downArrow.className = "fa-solid fa-angle-up downArrow"
        )
    }


    function onHandleSumbit() {
        // console.log(brandNameRef.current.value);
        const formData = new FormData();
        formData.append('brand', brandNameRef.current.value);
        // console.log(brandRef.current.value);
        axiosClient.post('/addBrand', formData)
            .then(res => {
                if (res.data.status == 200) {
                    ReamovePop();
                    fetchBrand();
                    // console.log(res.data);
                }
            })
    }





    function onVendorSumbit() {
        // console.log(brandNameRef.current.value);
        const formData = new FormData();
        formData.append('vendor', vendorNewNameRef.current.value);
        // console.log(brandRef.current.value);
        axiosClient.post('/addVendor', formData)
            .then(res => {
                if (res.data.status == 200) {
                    alert(res.data.message)
                    ReamovePop();
                    fetchVendor();
                    // console.log(res.data);
                }
            })
    }

    function showInputValue(event) {
        let inp = document.querySelector(".brandInp")
        inp.innerText = event.target.innerText;
        let brandListContainer = document.querySelector(".brandListContainer")
        brandListContainer.style.display = "none"

    }

    function showInputValues(event) {
        let inp = document.querySelector(".vendorInp")
        inp.innerText = event.target.innerText;
        let vendorListContainer = document.querySelector(".vendorListContainer")
        vendorListContainer.style.display = "none"

    }
    function onDataShow() {
        let drop = document.querySelector(".brandListContainer")
        let downArrow = document.querySelector(".downArrow")
        return (
            drop.style.display = "block",
            downArrow.className = "fa-solid fa-angle-up downArrow"
        )
    }

    function onDeleteBrand(event) {
        const BrandId = event.target.id;
        axiosClient.delete(`/deleteBrand/${BrandId}`)
            .then(res => {
                if (res.data.status == 200) {
                    // setMessage(res.data.message);
                    fetchBrand();
                    onDataShow();
                    // fetchProducts();
                }
            })
    }
    function onDeleteVendor(event) {
        const BrandId = event.target.id;
        axiosClient.delete(`/deleteVendor/${BrandId}`)
            .then(res => {
                if (res.data.status == 200) {
                    // setMessage(res.data.message);
                    // fetchBrand();
                    // console.log("here");
                    // onDataShow();
                    fetchVendor();
                    // fetchProducts();
                }
                // console.log(res);
            })
    }

    function fetchProducts() {
        // setisLoaded(true)
        // console.log(isLoaded,'3');
        axiosClient.get('/getproduct')
            .then(res => {
                setProducts(res.data);
                setisLoaded(false);
            })


    }



    function onInpSearch(event) {
        event.preventDefault();
        let query = searchRef.current.value;
        axiosClient.get(`/search?query=${query}`)
            .then(res => {
                if (res.data) {

                    setData(res.data);
                    console.log(res.data);
                }
                else {
                    setData({ 'not': 'not' });
                }

            })
    }

    return (
        <React.Fragment>
            <Header />
            <SideNav />
            <div className="all-count-container">
                <div className='addBrandContainer' style={{ display: "none" }}>
                    <div className='brandInnerContainer'>
                        <h1>Add Brand</h1>
                    </div>
                    <div className="innerContainer brandName">
                        <span className="typeName">Brand Name</span>
                        <input type="text" name='description' ref={brandNameRef} placeholder="Enter Brand name" />
                    </div>
                    <div className='brand-footer-container'>
                        <button onClick={ReamovePop} className='backBrand'>Back</button>
                        <button className='addBrandBtn' onClick={onHandleSumbit}>Add Brand</button>
                    </div>
                </div>
                <div className='addVentorContainer' style={{ display: "none" }}>
                    <div className='brandInnerContainer'>
                        <h1>Add Vendor</h1>
                    </div>
                    <div className="innerContainer brandName">
                        <span className="typeName">Vendor Name</span>
                        <input type="text" name='description' ref={vendorNewNameRef} placeholder="Enter vendor name" />
                    </div>
                    <div className='brand-footer-container'>
                        <button onClick={RemoveVendorContainer} className='backBrand'>Back</button>
                        <button className='addBrandBtn' onClick={onVendorSumbit}>Add Vendor</button>
                    </div>
                </div>
                <div className="product-header-part">
                    <div className="product-type-container">
                        <Link to="/inventory" className="product" style={{ borderStyle: "none", color: '#0DF2DC' }}>Products</Link>
                        <Link to="/category" className="category" style={{ borderStyle: "none", color: '#ff' }}>Category </Link>
                    </div>
                </div>
                {message &&
                    <div className="message">
                        <p>{message}</p>
                    </div>
                }

                <div className="product-list-mainContainer">
                    <div className="product-list-topContainer">
                        <div className="searchBox">
                            <i className="fi fi-rs-search"></i>
                            <input type="text" placeholder="Search Products" onChange={onInpSearch} ref={searchRef} className="searchProduct" />
                        </div>
                        <div className="addNew-btn-container">
                            <button className="addNew" onClick={addProduct}>Add Product</button>
                            <button class="filter"><i class="fi fi-rs-bars-filter"></i>Filters</button>
                        </div>
                    </div>
                    <div className="product-list-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Product SKU</th>
                                    <th>Quantity</th>
                                    <th>Product Img</th>
                                    <th>Buying price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {isLoaded ? (
                                    <div className="loading-animation">
                                        <div className="spinner"></div>
                                    </div>
                                ) :
                                    (
                                        data.map(product => (
                                            <tr key={product.id}>
                                                <td className="productName productLine">{product.product_name}</td>
                                                <td className='productLine'>{product.sku}</td>
                                                <td className='productLine'>{product.quantity}</td>
                                                <td className='productLine'><img src={`http://localhost:8000/${product.image}`} alt="" className="productImages" />
                                                </td>
                                                <td className='productLine'>{product.price}</td>
                                                <td className='productAction-container'>
                                                    <td className='action viewProduct'><i class="fa-regular fa-eye viewProduct" onClick={ProductLists} id={product.id}></i></td>
                                                    <td className='action editProduct'><i className="fa-solid fa-pen-to-square" title='edit' id={product.id} onClick={HandleEdit}></i></td>
                                                    <td className='action deleteProduct'><i className="fa-solid fa-trash" id={product.id} onClick={HandleDelete}></i></td>
                                                </td>
                                            </tr>
                                        ))
                                    )

                                }

                            </tbody>
                        </table>
                    </div>
                    <div>
                        <div className='paginationContainer'>
                            <button className='paginatedPreBtn'
                                onClick={() => setCurrentPage(prevPage => prevPage - 1)}
                                disabled={currentPage === 1}
                            >
                                <i className="fa-solid fa-angle-left"></i>
                            </button>
                            <span className='pageNo'>{currentPage}</span>
                            <button className='paginatedNxtBtn'
                                onClick={() => setCurrentPage(prevPage => prevPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                <i className="fa-solid fa-angle-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='allProductBackground'>
                    <div className='productBackbtn'>
                        <button className='pBackBtn' onClick={ProductListRemove}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <div className='allproduct'>
                        {
                            particularProduct.map(product => (
                                <div className='displayFexlAllProduct'>
                                    <div className='productImage'>
                                        <img src={`http://localhost:8000/${product.image}`} className='allProductImage' />
                                    </div>
                                    <div className='productValues'>
                                        <div className='productName'>

                                            <h1 className='Pname'>{product.product_name}</h1>
                                        </div>
                                        <div className='productBrand'>
                                            <label className='pAllLab'>Brand :</label>
                                            <p className='PBrand'>Apple</p>
                                        </div>
                                        <div className='productDescription'>
                                            <label className='pAllLab'>Description :</label>
                                            <p className='pDescription'>description</p>
                                        </div>
                                        <div className='productSku'>
                                            <lable className='pAllLab'>SKU :</lable>
                                            <p className='pSku'>{product.sku}</p>
                                        </div>
                                        <div className='productQuantity'>
                                            <lable className='pAllLab'>Quantity :</lable>
                                            <p className='pQuantity'>{product.quantity}</p>
                                        </div>
                                        <div className='productBuyingPrice'>
                                            <lable className='pAllLab'>Price :</lable>
                                            <p className='pBPrice'>{product.price}</p>
                                        </div>
                                        <div className='productBuyingDate'>
                                            <lable className='pAllLab'>BuyingDate :</lable>
                                            <p className='pBuyingDate'>{formatDate(product.created_at)}</p>
                                        </div>
                                        <div className='productAddingDate'>
                                            <lable className='pAllLab'>AddingDate :</lable>
                                            <p className='pAddingDate'>{formatDate(product.updated_at)}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                            )}

                        <div className='allProductbtn'>
                            <div className='addToCartBtn'>
                                <button className='pAddToCartBtn'>Add To Cart</button>
                            </div>
                            <div className='productOrderBtn'>
                                <button className='pOrderBtn'>Order</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="addProduct-form-container" style={{ display: 'none' }}>
                    <div className='productTopContainer'>
                        <h2>New Product</h2>
                        <i className="fi fi-rs-circle-xmark closeProductIcon" onClick={discordFun}></i>
                    </div>

                    <form onSubmit={handleSubmit} encType='multipart/form-data' className='productForm'>
                        <div className="product-image-container">
                            <div className="imageDot">
                                {/* <i className="fa-regular fa-image"></i> */}
                                <label className='labelBox' htmlFor="inputTag" onClick={imageFun} style={{ color: 'red' }}>
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
                        <div className='productMainContainer'>
                            <div className='leftSideproductContainer'>
                                <div className="innerContainer product-container">
                                    <p className="typeName">Product Name</p>
                                    <input type="text" name='product_name' ref={product_nameRef} placeholder="Enter product name" />
                                </div>
                                <div className="innerContainer SKU-container">
                                    <p className="typeName">SKU</p>
                                    <input type="text" name='sku' ref={skuRef} placeholder="Enter product SKU" />
                                </div>
                                <div className="innerContainer SKU-container">
                                    <p className="typeName">description</p>
                                    <input type="text" name='description' ref={descriptionRef} placeholder="Enter product SKU" />
                                </div>
                                <div className="innerContainer Category-container">
                                    <p className="typeName">Category</p>
                                    <select id="categoryList" name='category_id' ref={category_idRef}>
                                        <option className='categoryOptions' value="Select category">Select a category</option>
                                        {
                                            items.map(item => (
                                                <option value={item.category_name} key={item.id}>{item.category_name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="innerContainer buyingPrice-container">
                                    <p className="typeName">price</p>
                                    <input type="number" name='price' ref={priceRef} placeholder="Enter buying price" />
                                </div>
                                <div className="innerContainer quantity-container">
                                    <p className="typeName">Quantity</p>
                                    <input type="number" name='quantity' ref={quantityRef} placeholder="Enter product quantity" />
                                </div>
                            </div>
                            <div className='rightSideproductContainer'>
                                <div className="innerContainer expireDate-container">
                                    <p className="typeName">Brand</p>
                                    <div className="inpBrand">
                                        <i className="fa-solid fa-angle-down downArrow" onClick={onDataShow}></i>
                                        <p className='brandInp' name='brand_name' onClick={onDataShow} ref={brand_nameRef} placeholder='Select a brand'></p>
                                        {/* <button className='brandArrowBtn'><i class="fa-solid fa-angle-down"></i></button> */}
                                    </div>
                                </div>
                                <div className="innerContainer expireDate-container">
                                    <p className="typeName">Size</p>
                                    <input type="text" name='size' ref={sizeRef} placeholder='Size' />
                                </div>
                                <div className="innerContainer expireDate-container">
                                    <p className="typeName">Color</p>
                                    <input type="text" name='color' ref={colorRef} placeholder='Color' />
                                </div>
                                <div className="innerContainer expireDate-container">
                                    <p className="typeName">Material</p>
                                    <input type="text" name='material' ref={materialRef} placeholder='Material' />
                                </div>
                                <div className="innerContainer expireDate-container">
                                    <p className="typeName">Vendor Name</p>
                                    <div className="inpBrand">
                                        <i className="fa-solid fa-angle-down downArrow" onClick={onDataVendorShow}></i>
                                        <p className='vendorInp' name='brand_name' onClick={onDataVendorShow} ref={vendorNameRef} placeholder='Select a brand'></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="footer-container">
                            <button className="addProduct">Add Product</button>
                        </div>
                    </form>
                    <div className='brandListContainer'>
                        <div>
                            <p className='selectBrand'>Select a Brand</p>
                            <i className="fi fi-rs-circle-xmark closeBrand" onClick={CloseBrandContainer}></i>
                            <ol className='downList'>
                                {
                                    brands.map(brand => (
                                        <div className='brandList' key={brand.id}>
                                            <li value={brand.brand_name} onClick={showInputValue} style={{ cursor: 'pointer' }} key={brand.id}>{brand.brand_name}</li>
                                            <i id={brand.id} className="fi fi-rs-trash trash" onClick={onDeleteBrand}></i>
                                        </div>
                                    ))
                                }
                            </ol>
                            <button onClick={Pop} className='brandBtn'><span><i className="fi fi-rs-plus" style={{ fontSize: "13px" }} ></i></span>Create Brand</button>
                        </div>
                    </div>

                    <div className='vendorListContainer' style={{ display: 'none' }}>
                        <div>
                            <p className='selectBrand'>Select a Vendor</p>
                            <i className="fi fi-rs-circle-xmark closeBrand" onClick={CloseVendorContainer}></i>
                            <ol className='downList'>
                                {
                                    vendors.map(vendor => (
                                        <div className='VendorList' key={vendor.id}>
                                            <li value={vendor.vendor_name} onClick={showInputValues} style={{ cursor: 'pointer' }} key={vendor.id}>{vendor.vendor_name}</li>
                                            <i id={vendor.id} className="fi fi-rs-trash trash deleteVendor" onClick={onDeleteVendor}></i>
                                        </div>
                                    ))
                                }
                            </ol>
                            <button onClick={AddVendorContainer} className='brandBtn'><span><i className="fi fi-rs-plus" style={{ fontSize: "13px" }} ></i></span>Create Vendor</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}




function ProductListRemove() {
    let block = document.querySelector(".allProductBackground")
    let none = document.querySelector(".product-list-mainContainer")
    return (
        none.style.display = "block",
        block.style.display = "none"
    )
}
function Pop() {
    let addBrandPop = document.querySelector(".addBrandContainer")
    return (
        addBrandPop.style.display = "block"
    )
}
function AddVendorContainer() {
    let addVentorContainer = document.querySelector(".addVentorContainer")
    return (
        addVentorContainer.style.display = "block"
    )
}
function RemoveVendorContainer() {
    let addVentorContainer = document.querySelector(".addVentorContainer")
    return (
        addVentorContainer.style.display = "none"
    )
}

function ReamovePop() {
    let addBrandPop = document.querySelector(".addBrandContainer")
    return (
        addBrandPop.style.display = "none"
    )
}
function CloseBrandContainer() {
    let brandListContainer = document.querySelector(".brandListContainer")
    brandListContainer.style.display = "none"
    let downArrow = document.querySelector(".downArrow")
    return (
        downArrow.className = "fa-solid fa-angle-down downArrow"
    )

}
function CloseVendorContainer() {
    let vendorListContainer = document.querySelector(".vendorListContainer")
    vendorListContainer.style.display = "none"
    let downArrow = document.querySelector(".downArrow")
    return (
        downArrow.className = "fa-solid fa-angle-down downArrow"
    )
}

export default Products

function addProduct() {

    let addCategory = document.querySelector(".addProduct-form-container")
    return (
        addCategory.style.display = "block"
    )

}



function discordFun() {

    let addCategory = document.querySelector(".addProduct-form-container")
    return (
        addCategory.style.display = "none"
    )

}
function imageFun() {
    const imgInput = document.querySelector('#inputTag')
    let imgEl = document.querySelector('.image')
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
    imageDot.addEventListener("hover", () => {
        selectImage.style.display = "block"
    })
}
