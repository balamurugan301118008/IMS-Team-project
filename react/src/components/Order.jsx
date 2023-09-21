
import React, { Component, useEffect, useRef, useState } from 'react'
export default function Order() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    return (
        <React.Fragment>
            <div className='all-count-container'>
                <div class="overAll-Order-container">
                    <h1 class="order-heading">Overall orders</h1>
                    <div class="rectangle">
                        <div class="boxOne">
                            <h4 class="totalOrders">Total Orders</h4>
                            <p class="totalStocks">47</p>
                            <p class="countDays">Last 7 days</p>
                        </div>
                        <div class="boxTwo">
                            <h4 class="totalReceived">Total Received</h4>
                            <div class="inner-content">
                                <p class="totalStocks">47</p><span>₹35000</span>
                            </div>
                            <div class="counts">
                                <p class="countDays">Last 7 days</p><span>Revenue</span>
                            </div>
                        </div>
                        <div class="boxThree">
                            <h4 class="totalReturned">Total Returned</h4>
                            <div class="inner-content">
                                <p class="totalStocks">47</p><span>₹35000</span>
                            </div>
                            <div class="counts">
                                <p class="countDays">Last 7 days</p><span>Cost</span>
                            </div>
                        </div>
                        <div class="boxFour">
                            <h4 class="onWay">On the way</h4>
                            <div class="inner-content">
                                <p class="totalStocks">47</p><span>₹35000</span>
                            </div>
                            <div class="counts">
                                <p class="countDays">Last 7 days</p><span>Cost</span>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="orders-list-mainContainer">
                    <div className="order-list-topContainer">
                        <div className="searchBox">
                            <i className="fi fi-rs-search"></i>
                            <input type="text" placeholder="Search Orders" className="searchProduct" />
                        </div>
                        <div className="addNew-btn-container">
                            <button className="addNew">Add Orders</button>
                            <button class="filter"><i class="fi fi-rs-bars-filter"></i>Filters</button>
                        </div>
                    </div>
                    <div className="order-list-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Category</th>
                                    <th>Order price</th>
                                    <th>Quantity</th>
                                    <th>Product Img</th>
                                    <th>Expected delivery</th>
                                    <th>status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="productName productLine">Cookies</td>
                                    <td className='productLine'>Milk Biscuits</td>
                                    <td className='productLine'>1000</td>
                                    <td className='productLine'>29</td>
                                    <td className='productLine'><img src='' alt="" className="productImages" /></td>
                                    <td className='productLine'>12/10/23</td>
                                    <td className='productLine'>Delivered</td>
                                </tr>
                                {/* <tr>
                                    <td class="productName">Markar</td>
                                    <td>ACD1245</td>
                                    <td>5box</td>
                                    <td><img src="../project images/inventory/mark.png" alt=""
                                        class="productImages" /></td>
                                    <td>₹4000</td>
                                    <td>(20)In-stock</td>
                                </tr>
                                <tr>
                                    <td>Mouse</td>
                                    <td>ACD1245</td>
                                    <td>20</td>
                                    <td><img src="../project images/inventory/computerMouse.jpg" alt=""
                                        class="productImages" /></td>
                                    <td>₹4000</td>
                                    <td>(50)In-stock</td>
                                </tr>
                                <tr>
                                    <td>Mouse</td>
                                    <td>ACD1245</td>
                                    <td>20</td>
                                    <td><img src="../project images/inventory/computerMouse.jpg" alt=""
                                        class="productImages" /></td>
                                    <td>₹4000</td>
                                    <td>(50)In-stock</td>
                                </tr>
                                <tr>
                                    <td>Mouse</td>
                                    <td>ACD1245</td>
                                    <td>20</td>
                                    <td><img src="../project images/inventory/computerMouse.jpg" alt=""
                                        class="productImages" /></td>
                                    <td>₹4000</td>
                                    <td>(50)In-stock</td>
                                </tr> */}

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
            </div>

        </React.Fragment>
    )
}
