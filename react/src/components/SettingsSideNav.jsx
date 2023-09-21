import React from 'react'
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { useEffect, useRef, useState } from "react";
import axiosClient from '../axios-client';
function SettingSideNav() {
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
    return (
        <React.Fragment>
            <div class="nav-list">
                <ul>
                    {/* <a href="/" class="action"> */}
                    <div className="left-nav-bar home-contain" id="settingPo">
                        <p className="sideNav-icon">
                            <span><i className="fi fi-rs-settings" id="settingicon"></i></span>
                            <span className="sideNav-name" id="settingText">Settings</span>
                        </p>
                    </div>
                    {/* </a> */}
                    <a href="#" className="action">
                        <div className="left-nav-bar Inventory-contain">
                            <p className="sideNav-icon">
                                <span><i className="fi fi-rs-circle-user"></i></span>
                                <span className="sideNav-name">Personal</span>
                            </p>
                        </div>
                    </a>
                    <a href="#" className="action">
                        <div className="left-nav-bar Integrations-contain">
                            <p className="sideNav-icon">
                                <span><i className="fi fi-rs-square-poll-vertical"></i></span>
                                <span className="sideNav-name">Organisation</span>
                            </p>
                        </div>
                    </a>
                    <a href="#" className="action">
                        <div className="left-nav-bar Vendors-contain">
                            <p className="sideNav-icon">
                                <span><i class="fa-solid fa-lock"></i></span>
                                <span className="sideNav-name">Passwords</span>
                            </p>
                        </div>
                    </a>
                    <a href="#" className="action" onClick={onLogout}>
                        <div className="left-nav-bar Orders-contain">
                            <p className="sideNav-icon">
                                <span><i className="fi fi-rs-sign-out-alt"></i></span>
                                <span className="sideNav-name">Logout</span>
                            </p>
                        </div>
                    </a>
                    <Link to="/dashboard" className="action">
                        <div className="left-nav-bar setting-contain" id='settingBackBtn'>
                            <p className="sideNav-icon">
                                <span><i class="fi fi-rs-angle-left"></i></span>
                                <span className="sideNav-name">Back</span>
                            </p>
                        </div>
                    </Link>
                </ul>
            </div>
        </React.Fragment>
    )
}

export default SettingSideNav