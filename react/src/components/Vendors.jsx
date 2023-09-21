import { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client.js";
import Header from "./Header.jsx";
import SideNav from "./SideNav.jsx";
import React from "react";

export function Vendors() {

    // fetchVendor()
    const vendorsNameRef = useRef();
    const emailRef = useRef();
    const phoneNoRef = useRef();
    const companyNameRef = useRef();
    const companyAddressRef = useRef();
    const companyEmailRef = useRef();
    const companyPhoneRef = useRef();
    const addVendorRef = useRef();
    const [vendors, setVendors] = useState([]);
    // const onSubmit = (ev) => {
    //     ev.preventDefault()
    //     const payload = {
    //         vendorsName: vendorsNameRef.current.value,
    //         vendorsCategory: emailRef.current.value,
    //         vendorQuantity: vendorQuantityRef.current.value,
    //         vendorAddress: vendorAddressRef.current.value,
    //     }
    // }
    // const [isLoaded, setisLoaded] = useState(true);

    // useEffect(() => {
    //     fetchVendor();

    // });

    function fetchVendor() {
        axiosClient.get('/getVendor')
            .then(res => {
                // console.log(res.data);
                setVendors(res.data)
            })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        // setisLoaded(true);

        const formData = new FormData();
        formData.append('vendor_name', vendorsNameRef.current.innerText);
        formData.append('vendor_email', emailRef.current.value);
        formData.append('vendor_phone_no', phoneNoRef.current.value);
        formData.append('company_name', companyNameRef.current.value);
        formData.append('company_address', companyAddressRef.current.value);
        formData.append('company_email', companyEmailRef.current.value);
        formData.append('company_phone_no', companyPhoneRef.current.value);


        axiosClient.post('/addVendorList', formData)
            .then(res => {
                if (res.data.status == 200) {
                    alert(res.data.message);
                    // fetchProducts();
                    fetchVendor();
                    console.log(vendors);

                }
                else if (res.data.status == 422) {
                    alert("all");
                }
            })
    };



    function onDataShow() {

        let drop = document.querySelector(".brandListContainer")
        let downArrow = document.querySelector(".downArrow")
        fetchVendor()
        return (
            drop.style.display = "block",
            downArrow.className = "fa-solid fa-angle-up downArrow"
        )
    }


    function onHandledelete(event) {

        event.preventDefault();

        const itemId = event.target.id;
        axiosClient.delete(`/deleteVendor/${itemId}`)
            .then(res => {
                if (res.data.status == 200) {
                    alert(res.data.message);
                    fetchVendor();
                }
            })

    }


    // function fetchVendor() {
    //     axiosClient.get('/getVendor')
    //         .then(res => {
    //             setVendors(res.data);
    //             console.log(res.data);
    //         })
    // }

    function onHandleSumbit() {
        // console.log('jere');
        const formData = new FormData();
        formData.append('vendor', addVendorRef.current.value);
        axiosClient.post('/addvendor', formData)
            .then(res => {
                if (res.data.status == 200) {
                    ReamovePop();
                    fetchVendor();
                    // console.log(res.data);
                }
            })
    }

    function RemoveVendor() {
        let formSectionAddVendor = document.querySelector(".addVendor-form-container")
        return (
            formSectionAddVendor.style.display = "none"
        )
    }
    return (
        <React.Fragment>
            <Header />
            <SideNav />
            <div class="all-count-container">
                <h1 className="vedorHeading">Vendor details</h1>
                <div className="vendorAllCon">
                    <div className="vendorsearchBars">
                        <div className="vendorsearchInput">
                            <input type="text" className="vendorSearchInput" id="vendorsSearchInput" placeholder="Search vendor" />
                            <i class="fa-solid fa-magnifying-glass" id="vendorSearchicons"></i>
                        </div>
                    </div>
                    <div className="vendorBtns">
                        <div className="addVendorBtn">
                            <button className="vendorAddbtn" onClick={addVendor}>Add Vendor</button>
                        </div>
                        <div className="fillterVendorBtn">
                            <button className="fillterVendorAddbtn">Fillter</button>
                            <img src="src/assets/images/Filters lines.png" id="vendorFilIcon" />
                        </div>
                    </div>

                    <div className="vendorProductDetails">
                        {/* vendor product details */}
                        <table>
                            <thead>
                                <tr>
                                    <th>Vendor Name</th>
                                    <th>vendor email</th>
                                    <th>vendor phone no.</th>
                                    <th>company Name</th>
                                    <th>company address</th>
                                    <th>Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {/* <tr>gokul</tr> */}
                                {
                                    vendors.map(product => (
                                        <tr key={product.id}>
                                            <td className="productName">{product.vendor_name}</td>
                                            <td>{product.vendor_email}</td>
                                            <td>{product.vendor_phone_no}</td>
                                            <td>{product.company_name}</td>
                                            <td>{product.company_address}</td>
                                            <td><i className="fa-solid fa-trash" id={product.id} style={{ color: 'red', cursor: 'pointer' }} onClick={onHandledelete}></i><i className="fa-solid fa-pen-to-square" title='edit' id={product.id} style={{ color: 'aqua', cursor: 'pointer' }}></i></td>
                                            {/* <td id={product.id} style={{ cursor:'pointer' }}className='viewProduct'>View</td>/ */}
                                        </tr>
                                    ))
                                }


                            </tbody>
                        </table>

                    </div>
                </div>
                <div className='addBrandContainer' style={{ display: "none" }}>
                    <div className='brandInnerContainer'>
                        <h1>Add Vendor</h1>
                    </div>
                    <div className="innerContainer brandName">
                        <p className="typeName">Vendor Name</p>
                        <input type="text" name='description' ref={addVendorRef} placeholder="Enter Vendor name" />
                    </div>
                    <div className='brand-footer-container'>
                        <button onClick={ReamovePop} className='backBrand'>Back</button>
                        <button className='addBrandBtn' onClick={onHandleSumbit}>Add Vendor</button>
                    </div>
                </div>
                <div className="allInputsVendorFormSection" >
                    <div className="addVendor-form-container">
                        <div>
                            <i className="fi fi-rs-circle-xmark removeForm" onClick={RemoveVendor}></i>
                        </div>
                        <form onSubmit={handleSubmit} encType='multipart/form-data' >
                            <div className="fromHeading">
                                <h1 id="fromHeadingHOne">New Vendor</h1>
                            </div>
                            <div className="innerContainer expireDate-container">
                                <p className="typeName">Vendor Name</p>
                                <div className="inpBrand">
                                    <i class="fa-solid fa-angle-down downArrow" onClick={onDataVendorShow}></i>
                                    <p className='vendorNameInp' name='brand_name' onClick={onDataVendorShow} ref={vendorsNameRef} placeholder='Select a brand'></p>
                                    {/* <button className='brandArrowBtn'><i class="fa-solid fa-angle-down"></i></button> */}
                                </div>
                            </div>
                            <div className="innerContainer buyingPrice-container">
                                <p className="typeName">Email</p>
                                <input type="email" className="vendorName" name='vendorName' ref={emailRef} placeholder="Email" />
                            </div>
                            <div className="innerContainer quantity-container">
                                <p className="typeName">Phone</p>
                                <input type="number" name='vendorPhone' className="vendorPhone" ref={phoneNoRef} placeholder="Phone" />
                            </div>
                            <div className="innerContainer expireDate-container">
                                <p className="typeName">Company Name</p>
                                <input type="text" name='companyName' className="companyName" ref={companyNameRef} placeholder='Company Name' />
                            </div>
                            <div className="innerContainer expireDate-container">
                                <p className="typeName">Company Email</p>
                                <input type="email" name='companyEmailRef' className="companyEmailRef" ref={companyEmailRef} placeholder='Company Email' />
                            </div>
                            <div className="innerContainer expireDate-container">
                                <p className="typeName">Company Phone</p>
                                <input type="number" name='companyPhoneRef' className="companyPhoneRef" ref={companyPhoneRef} placeholder='Company Address' />
                            </div>
                            <div className="innerContainer expireDate-container">
                                <p className="typeName">Company Address</p>
                                <input type="text" name='companyAddressRef' className="companyAddressRef" ref={companyAddressRef} placeholder='Company Address' />
                            </div>
                            <div className="footer-container">
                                <button className="addProduct">Add Vendor</button>
                            </div>
                        </form>
                        <div className='vendorListContainer'>
                            <div>
                                <p className='selectBrand'>Select a Vendor</p>
                                <i className="fi fi-rs-circle-xmark closeBrand" onClick={CloseVendorNameContainer}></i>
                                <ol className='downList'>
                                    {
                                        <div className='braandList'>
                                            {
                                                vendors.map(vendor => (
                                                    <div className='brandList' key={vendor.id}>
                                                        <li onClick={showInputValue} key={vendor.id} style={{ cursor: 'pointer' }}>{vendor.vendor_name}</li>
                                                        <i class="fi fi-rs-trash trash" onClick={onDeleteBrand}></i>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    }
                                </ol>
                                <button onClick={Pop} className='brandBtn'><span><i class="fi fi-rs-plus" style={{ fontSize: "13px" }} ></i></span>Create Vendor</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </div>
        </React.Fragment>
    )

}


function Pop() {
    let addBrandPop = document.querySelector(".addBrandContainer")
    return (
        addBrandPop.style.display = "block"
    )
}

function    showInputValue(event) {
    let inp = document.querySelector(".vendorNameInp")
    inp.innerText = event.target.innerText;
    let brandListContainer = document.querySelector(".vendorListContainer")
    brandListContainer.style.display = "none"

}

function addVendor() {

    let addVendorForm = document.querySelector(".addVendor-form-container")
    return (
        addVendorForm.style.display = "block"
    )

}

function CloseVendorNameContainer() {
    let brandListContainer = document.querySelector(".vendorListContainer")
    brandListContainer.style.display = "none"
    let downArrow = document.querySelector(".downArrow")
    return (
        downArrow.className = "fa-solid fa-angle-down downArrow"
    )

}




function ReamovePop() {
    let addBrandPop = document.querySelector(".addBrandContainer")
    return (
        addBrandPop.style.display = "none"
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



function onDataVendorShow() {
    // event.preventDefault();
    let drop = document.querySelector(".vendorListContainer")
    let downArrow = document.querySelector(".VendordownArrow")
    return (
        drop.style.display = "block",
        downArrow.className = "fa-solid fa-angle-up downArrow"
    )
}