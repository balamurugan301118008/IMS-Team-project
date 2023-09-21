import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client.js";
import Header from "./Header.jsx";
import SideNav from "./SideNav.jsx";
import React from "react";
import SettingSideNav from "./SettingsSideNav.jsx";
import Category from "./Category.jsx";
import Order from "./Order.jsx";
import Reports from "./Reports.jsx";
import LowStockDetails from "./LowStockDetails.jsx";
// import { Link } from 'react-router-dom'

export function DefaultLayout() {

    const { user, token, setUser, setToken } = useStateContext()
    const [products, setProducts] = useState([]);


    if (!token) {
        return <Navigate to="/login" />
    }

    const onLogout = (e) => {
        e.preventDefault()

        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
            })


    }

    useEffect(() => {
        fetchProducts();
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data)
            })
    }, [])


    function fetchProducts() {

        axiosClient.get('/getproduct')
            .then(res => {
                setProducts(res.data.length);
                // console.log(res.data.length);
            })
    }

    return (

        <React.Fragment>
            <Header />
            <SideNav />
            <div className='all-count-container'>
                <div className="organization-logo-container">
                    <div className="organization-logo">
                        <img src="src/assets/images/dashboardImages/secondary logo 1.png" alt="Balla" />
                    </div>
                    <div>
                        <h2 className="hello-name">Hello,<span className="hello-name-User" >{user.name}</span>
                        </h2>
                        <p className="organization-small-name">DCKAP</p>
                    </div>
                    <div className="LogoutBtn">
                        <p className="LogoutButton" onClick={onLogout} >Logout</p>
                    </div>
                </div>
                <div className='main-stock-containers'>
                    <div className="stock-box-container">
                        <h4 className="stock-name">Total stocks</h4>
                        <img src="assets/images/dashboardImages/Quantity.png" alt="" />
                        <p className="count-stocks">{products}</p>
                        <h4 className="stock-type-name">Total products</h4>
                    </div>
                    <div className="stock-box-container">
                        <h4 className="stock-name">Stocks sold</h4>
                        <img src="assets/images/dashboardImages/Sales.png" alt="" />
                        <p className="count-stocks">50</p>
                        <h4 className="stock-type-name">Total products</h4>
                    </div>
                    <div className="stock-box-container">
                        <h4 className="stock-name">Remaining stocks</h4>
                        <img src="assets/images/dashboardImages/Purchase.png" alt="" />
                        <p className="count-stocks" style={{ color: '#F81919' }}>2</p>
                        <h4 className="stock-type-name">Total products</h4>
                    </div>
                    <div className="stock-box-container">
                        <h4 className="stock-name">Most selling products</h4>
                        <img src="assets/images/dashboardImages/allUsers.png" alt="" />
                        <p className="count-stocks">10</p>
                        <h4 className="stock-type-name">Laptop</h4>
                    </div>

                </div>
            </div>
        </React.Fragment>
    )

}

export function InventoryFun() {
    return (
        <React.Fragment>
            <Header />
            <SideNav />
            <Category />
        </React.Fragment>
    )
}


export function Products() {
    return (
        <React.Fragment>
            <Header />
            <SideNav />

        </React.Fragment>
    )
}
export function Integrations() {
    return (
        <React.Fragment>
            <Header />
            <SideNav />
            <div className='all-count-container'>
                <h1 style={{ color: 'aqua' }}>Integrations</h1>
            </div>
        </React.Fragment>
    )
}

// export function Vendors() {

//     // fetchVendor()
//     const vendorsNameRef = useRef();
//     const emailRef = useRef();
//     const phoneNoRef = useRef();
//     const companyNameRef = useRef();
//     const companyAddressRef = useRef();
//     const companyEmailRef = useRef();
//     const companyPhoneRef = useRef();
//     const addVendorRef = useRef();
//     const [vendors, setVendors] = useState([]);
//     // const onSubmit = (ev) => {
//     //     ev.preventDefault()
//     //     const payload = {
//     //         vendorsName: vendorsNameRef.current.value,
//     //         vendorsCategory: emailRef.current.value,
//     //         vendorQuantity: vendorQuantityRef.current.value,
//     //         vendorAddress: vendorAddressRef.current.value,
//     //     }
//     // }
//     // const [isLoaded, setisLoaded] = useState(true);

//     // useEffect(() => {
//     //     fetchVendor();

//     // });

//     function fetchVendor() {
//         axiosClient.get('/getVendor')
//             .then(res => {
//                 // console.log(res.data);
//                 setVendors(res.data)
//             })
//     }
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         // setisLoaded(true);

//         const formData = new FormData();
//         formData.append('vendor_name', vendorsNameRef.current.innerText);
//         formData.append('vendor_email', emailRef.current.value);
//         formData.append('vendor_phone_no', phoneNoRef.current.value);
//         formData.append('company_name', companyNameRef.current.value);
//         formData.append('company_address', companyAddressRef.current.value);
//         formData.append('company_email', companyEmailRef.current.value);
//         formData.append('company_phone_no', companyPhoneRef.current.value);


//         axiosClient.post('/addVendorList', formData)
//             .then(res => {
//                 if (res.data.status == 200) {
//                     alert(res.data.message);
//                     // fetchProducts();
//                     fetchVendor();
//                     console.log(vendors);

//                 }
//                 else if (res.data.status == 422) {
//                     alert("all");
//                 }
//             })
//     };



//     function onDataShow() {

//         let drop = document.querySelector(".brandListContainer")
//         let downArrow = document.querySelector(".downArrow")
//         fetchVendor()
//         return (
//             drop.style.display = "block",
//             downArrow.className = "fa-solid fa-angle-up downArrow"
//         )
//     }


//     function onHandledelete(event) {

//         event.preventDefault();

//         const itemId = event.target.id;
//         axiosClient.delete(`/deleteVendor/${itemId}`)
//             .then(res => {
//                 if (res.data.status == 200) {
//                     alert(res.data.message);
//                     fetchVendor();
//                 }
//             })

//     }


//     // function fetchVendor() {
//     //     axiosClient.get('/getVendor')
//     //         .then(res => {
//     //             setVendors(res.data);
//     //             console.log(res.data);
//     //         })
//     // }

//     function onHandleSumbit() {
//         // console.log('jere');
//         const formData = new FormData();
//         formData.append('vendor', addVendorRef.current.value);
//         axiosClient.post('/addvendor', formData)
//             .then(res => {
//                 if (res.data.status == 200) {
//                     ReamovePop();
//                     fetchVendor();
//                     // console.log(res.data);
//                 }
//             })
//     }

//     function RemoveVendor() {
//         let formSectionAddVendor = document.querySelector(".addProduct-form-container")
//         return (
//             formSectionAddVendor.style.display = "none"
//         )
//     }
//     return (
//         <React.Fragment>
//             <Header />
//             <SideNav />
//             <div class="all-count-container">
//                 <h1 className="vedorHeading">Vendor details</h1>
//                 <div className="vendorAllCon">
//                     <div className="vendorsearchBars">
//                         <div className="vendorsearchInput">
//                             <input type="text" className="vendorSearchInput" id="vendorsSearchInput" placeholder="Search vendor" />
//                             <i class="fa-solid fa-magnifying-glass" id="vendorSearchicons"></i>
//                         </div>
//                     </div>
//                     <div className="vendorBtns">
//                         <div className="addVendorBtn">
//                             <button className="vendorAddbtn" onClick={addVendor}>Add Vendor</button>
//                         </div>
//                         <div className="fillterVendorBtn">
//                             <button className="fillterVendorAddbtn">Fillter</button>
//                             <img src="src/assets/images/Filters lines.png" id="vendorFilIcon" />
//                         </div>
//                     </div>

//                     <div className="vendorProductDetails">
//                         {/* vendor product details */}
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>Vendor Name</th>
//                                     <th>vendor email</th>
//                                     <th>vendor phone no.</th>
//                                     <th>company Name</th>
//                                     <th>company address</th>
//                                     <th>Action</th>

//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {/* <tr>gokul</tr> */}
//                                 {
//                                     vendors.map(product => (
//                                         <tr key={product.id}>
//                                             <td className="productName">{product.vendor_name}</td>
//                                             <td>{product.vendor_email}</td>
//                                             <td>{product.vendor_phone_no}</td>
//                                             <td>{product.company_name}</td>
//                                             <td>{product.company_address}</td>
//                                             <td><i className="fa-solid fa-trash" id={product.id} style={{ color: 'red', cursor: 'pointer' }} onClick={onHandledelete}></i><i className="fa-solid fa-pen-to-square" title='edit' id={product.id} style={{ color: 'aqua', cursor: 'pointer' }}></i></td>
//                                             {/* <td id={product.id} style={{ cursor:'pointer' }}className='viewProduct'>View</td>/ */}
//                                         </tr>
//                                     ))
//                                 }


//                             </tbody>
//                         </table>

//                     </div>
//                 </div>
//                 <div className='addBrandContainer' style={{ display: "none" }}>
//                     <div className='brandInnerContainer'>
//                         <h1>Add Vendor</h1>
//                     </div>
//                     <div className="innerContainer brandName">
//                         <p className="typeName">Vendor Name</p>
//                         <input type="text" name='description' ref={addVendorRef} placeholder="Enter Vendor name" />
//                     </div>
//                     <div className='brand-footer-container'>
//                         <button onClick={ReamovePop} className='backBrand'>Back</button>
//                         <button className='addBrandBtn' onClick={onHandleSumbit}>Add Vendor</button>
//                     </div>
//                 </div>
//                 <div className="allInputsVendorFormSection" >
//                     <div className="addProduct-form-container">
//                         <div>
//                             <i className="fi fi-rs-circle-xmark closeProductIcon" onClick={RemoveVendor}></i>
//                         </div>
//                         <form onSubmit={handleSubmit} encType='multipart/form-data' >
//                             <div className="fromHeading">
//                                 <h1 id="fromHeadingHOne">New Vendor</h1>
//                             </div>
//                             <div className="innerContainer expireDate-container">
//                                 <p className="typeName">Vendor Name</p>
//                                 <div className="inpBrand">
//                                     <i class="fa-solid fa-angle-down downArrow" onClick={onDataShow}></i>
//                                     <p className='vendorNameInp' name='brand_name' onClick={onDataShow} ref={vendorsNameRef} placeholder='Select a brand'></p>
//                                     {/* <button className='brandArrowBtn'><i class="fa-solid fa-angle-down"></i></button> */}
//                                 </div>
//                             </div>
//                             <div className="innerContainer buyingPrice-container">
//                                 <p className="typeName">Email</p>
//                                 <input type="email" className="vendorName" name='vendorName' ref={emailRef} placeholder="Email" />
//                             </div>
//                             <div className="innerContainer quantity-container">
//                                 <p className="typeName">Phone</p>
//                                 <input type="number" name='vendorPhone' className="vendorPhone" ref={phoneNoRef} placeholder="Phone" />
//                             </div>
//                             <div className="innerContainer expireDate-container">
//                                 <p className="typeName">Company Name</p>
//                                 <input type="text" name='companyName' className="companyName" ref={companyNameRef} placeholder='Company Name' />
//                             </div>
//                             <div className="innerContainer expireDate-container">
//                                 <p className="typeName">Company Email</p>
//                                 <input type="email" name='companyEmailRef' className="companyEmailRef" ref={companyEmailRef} placeholder='Company Email' />
//                             </div>
//                             <div className="innerContainer expireDate-container">
//                                 <p className="typeName">Company Phone</p>
//                                 <input type="number" name='companyPhoneRef' className="companyPhoneRef" ref={companyPhoneRef} placeholder='Company Address' />
//                             </div>
//                             <div className="innerContainer expireDate-container">
//                                 <p className="typeName">Company Address</p>
//                                 <input type="text" name='companyAddressRef' className="companyAddressRef" ref={companyAddressRef} placeholder='Company Address' />
//                             </div>
//                             <div className="footer-container">
//                                 <button className="addProduct">Add Vendor</button>
//                             </div>
//                         </form>
//                         <div className='brandListContainer'>
//                             <div>
//                                 <p className='selectBrand'>Select a Vendor</p>
//                                 <i className="fi fi-rs-circle-xmark closeBrand" onClick={CloseVendorNameContainer}></i>
//                                 <ol className='downList'>
//                                     {
//                                         // vendors.map(vendor => (
//                                         <div className='braandList'>
//                                             {
//                                                 vendors.map(vendor => (
//                                                     <div className='brandList' key={vendor.id}>
//                                                         <li onClick={showInputValue} key={vendor.id} style={{ cursor: 'pointer' }}>{vendor.vendor_name}</li>
//                                                         <i class="fi fi-rs-trash trash" onClick={onDeleteBrand}></i>
//                                                     </div>
//                                                 ))
//                                             }

//                                         </div>
//                                         // ))
//                                     }
//                                 </ol>
//                                 <button onClick={Pop} className='brandBtn'><span><i class="fi fi-rs-plus" style={{ fontSize: "13px" }} ></i></span>Create Vendor</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 {/* </div> */}
//             </div>
//         </React.Fragment>
//     )

// }

// Start Vendor page Functions  // 


// function Pop() {
//     let addBrandPop = document.querySelector(".addBrandContainer")
//     return (
//         addBrandPop.style.display = "block"
//     )
// }

// function showInputValue(event) {
//     let inp = document.querySelector(".vendorNameInp")
//     inp.innerText = event.target.innerText;
//     let brandListContainer = document.querySelector(".brandListContainer")
//     brandListContainer.style.display = "none"

// }

// function addVendor() {

//     let addVendorForm = document.querySelector(".addProduct-form-container")
//     return (
//         addVendorForm.style.display = "block"
//     )

// }

// function CloseVendorNameContainer() {
//     let brandListContainer = document.querySelector(".brandListContainer")
//     brandListContainer.style.display = "none"
//     let downArrow = document.querySelector(".downArrow")
//     return (
//         downArrow.className = "fa-solid fa-angle-down downArrow"
//     )

// }




// function ReamovePop() {
//     let addBrandPop = document.querySelector(".addBrandContainer")
//     return (
//         addBrandPop.style.display = "none"
//     )
// }


// function onDeleteBrand(event) {
//     const BrandId = event.target.id;
//     axiosClient.delete(`/deleteBrand/${BrandId}`)
//         .then(res => {
//             if (res.data.status == 200) {
//                 // setMessage(res.data.message);
//                 fetchBrand();
//                 onDataShow();
//                 // fetchProducts();
//             }
//         })
// }



export function Orders() {
    return (
        <React.Fragment>
            <Header />
            <SideNav />
            <Order />
        </React.Fragment>
    )
}
export function ReportsDetails() {
    return (
        <React.Fragment>
            <Header />
            <SideNav />
            <Reports />
        </React.Fragment>
    )
}

export function LowStocks() {
    return (
        <React.Fragment>
            <Header />
            <SideNav />
            <LowStockDetails />
        </React.Fragment>
    )
}



export function Inviteusers() {
    return (
        <React.Fragment>
            <Header />
            <SideNav />
            <div className='all-count-container'>
                <div class="inviteuserCon">
                    <div class="inviteUseropa">
                        <div class="inviteHead">
                            <div class="alluser">
                                <p class="alluserTag">All Users</p>
                            </div>
                            <div class="invitebtn">
                                <button class="Addinvitebtn" >Invite</button>
                            </div>
                        </div>
                        <div class="line"></div>
                        <div class="userlist">
                            <div class="userProfilrimgs">
                                <img src="src/assets/images/dashboardImages/secondary logo 1.png" class="userProfilrimg" />
                            </div>
                            <div class="emailAndname">
                                <p class="userName">Vignesh</p>
                                <p>vigneshselvarajdckap@gmail.com</p>
                            </div>
                            <div class="role">
                                <p class="userRoleType">Admin</p>
                            </div>
                            <div class="editicon">
                                <i class="fa-regular fa-pen-to-square" id="editSymbol"></i>
                                <p class="edHov">Edit</p>
                            </div>
                            <div class="deleteIcon">
                                <i class="fa-solid fa-trash" id="deleteSymbol"></i>
                                <p class="delHov">Delete</p>
                            </div>
                        </div>
                        <div class="userlist">
                            <div class="userProfilrimgs">
                                <img src="src/assets/images/dashboardImages/Balaprofile.png" class="userProfilrimg" />
                            </div>
                            <div class="emailAndname">
                                <p class="userName">Bala</p>
                                <p>balamurugandckap@gmail.com</p>
                            </div>
                            <div class="role">
                                <p class="userRoleType">User</p>
                            </div>
                            <div class="editicon">
                                <i class="fa-regular fa-pen-to-square" id="editSymbol"></i>
                                <p class="edHov">Edit</p>
                            </div>
                            <div class="deleteIcon">
                                <i class="fa-solid fa-trash" id="deleteSymbol"></i>
                                <p class="delHov">Delete</p>
                            </div>
                        </div>
                    </div>
                    <div class="userinviteForm">

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

// function Click() {
//     // <React.Fragment>
//         let app = `<div class="assent">
//             <div class="headinginviteusers">Invite User</div>
//             <div class="line1"></div>
//             <div class="formSection">
//                 <form action="" method="">
//                     <div class="nameDiv">
//                         <div class="divinputLableName">
//                             <lable>Name</lable>
//                         </div>
//                         <div>
//                             <input type="text" placeholder="Enter your full name" />
//                         </div>
//                     </div>
//                     <div class="emailDiv">
//                         <div class="divinputLableEmail">
//                             <lable>Email</lable>
//                         </div>
//                         <div>
//                             <input type="email" placeholder="Enter your email" />
//                         </div>
//                     </div>
//                     <div class="roleDiv">
//                         <div class="divinputLableRole">
//                             <lable>Role</lable>
//                         </div>
//                         <div>
//                             <select class="inviteRole">
//                                 <option>Admin</option>
//                                 <option>User</option>
//                             </select>
//                         </div>
//                     </div>
//                     <div class="inviteuserBtns">
//                         <button type="submit" class="inviteUserSendBtn">Send Invite</button>
//                     </div>
//                 </form>
//                 <div class="inviteuserbackBtns">
//                     <button class="inviteuserbackBtn" onclick="remove()">Discard</button>
//                 </div>
//             </div>
//         </div>`
//     // </React.Fragment>

// }


export function Settings() {
    return (
        <React.Fragment>
            <Header />
            <SettingSideNav />
            <div className='all-count-container'>
                <div class="personalProfileAll">
                    <div class="personalProfileBox">
                        <div class="profileDetails">
                            <div class="profileimage">
                                <img src="src/assets/images/dashboardImages/Balaprofile.png"
                                    class="profilePersonalImage" />
                            </div>
                            <div class="profileName">
                                <div class="profilePersonName">
                                    <p class="proName">Vignesh</p>
                                </div>
                                <div class="changeInage">
                                    <p class="changeInagetext">Change Image</p>
                                </div>
                            </div>
                            <div class="cancelbtn">
                                <button class="profileCancelButton">Cancel</button>
                            </div>
                            <div class="profileEditBtn">
                                <button class="profileEditButton">Edit</button>
                                {/* <button class="profileSaveButton">Save</button> */}
                            </div>
                        </div>
                        <div class="secondProfileSection">
                            <div class="firstRowCon">
                                <div class="name">
                                    <label class="Sec">First Name</label>
                                    <div class="change">
                                        <p class="Secname">Vignesh</p>
                                    </div>
                                </div>
                                <div class="gender">
                                    <label>Gender</label>
                                    <div class="change">
                                        <p class="Secname">Male</p>
                                    </div>
                                </div>
                                <div class="country">
                                    <label>Country</label>
                                    <div class="change">
                                        <p class="Secname">India</p>
                                    </div>
                                </div>
                            </div>
                            <div class="secondRow">
                                <div class="lastName">
                                    <label>Last Name</label>
                                    <div class="change">
                                        <p class="Secname">Selvaraj</p>
                                    </div>
                                </div>
                                <div class="Mobile">
                                    <label>Mobile Number</label>
                                    <div class="change">
                                        <p class="Secname">934567890</p>
                                    </div>
                                </div>
                                <div class="Email">
                                    <label>Email</label>
                                    <div class="change">
                                        <p class="Secname">vigneshselvarajdckap@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
