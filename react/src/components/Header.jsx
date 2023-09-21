import React from 'react'
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { useEffect, useRef, useState } from "react";
import axiosClient from '../axios-client';

function Header() {
    const { user, token, setUser, setToken } = useStateContext()

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
    function ClickProfile() {
        let profileMainContanier = document.querySelector(".profileMainContanier")
        // profileMainContanier.style.visibility = "visible"
        profileMainContanier.classList.toggle("showProfile")
    }
    return (
        <React.Fragment>
            <header>
                <div className="top-container">
                    <h1 className="organization-name">Inventory</h1>
                    <div className="top-right-container">
                        <div className="search-container">
                            <span className="search-icon"><i className="fi fi-rs-search"></i></span>
                            <input type="text" placeholder="Search products,suppliers,orders" className="searchInput" />
                        </div>
                        <span className="notification-icon"><i className="fa-regular fa-bell"></i></span>
                        <img src="src/assets/images/dashboardImages/Balaprofile.png" className="user-image"
                            alt="user-image" onClick={ClickProfile} />
                    </div>
                </div>
            </header>
            <div className='profileMainContanier'>
                <Link to="/settings" style={{ borderStyle: 'none' }}>
                    <div className='profileContainer'>
                        <span><i className="fi fi-rs-circle-user"></i></span><p>My profile</p>
                    </div>
                </Link>
                <div className='logoutContainer' onClick={onLogout} >
                    <span><i className="fi fi-rs-sign-out-alt"></i></span><p>Logout</p>
                </div>
            </div>
        </React.Fragment>
    )
}



export default Header