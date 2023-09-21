import React from 'react'
import { Link } from 'react-router-dom'

function SideNav() {
    return (
        <React.StrictMode>
            <div className="nav-list">
                <ul>
                    <Link to="/dashboard" className="action">
                        <div className="left-nav-bar home-contain">
                            <p className={`sideNav-icon ${window.location.pathname == '/dashboard' ||  window.location.pathname == '/'? 'active' : ''}`}>
                                <span><i className="fi fi-rs-home"></i></span>
                                <span className="sideNav-name">DashBoard</span>
                            </p>
                        </div>
                    </Link>
                    <Link to="/inventory" className="action">
                        <div className="left-nav-bar Inventory-contain">
                            <p className={`sideNav-icon ${window.location.pathname == '/inventory' || window.location.pathname == '/products' ? 'active' : ''}`}>
                                <span><i className="fi fi-rs-truck-loading "></i></span>
                                <span className={`sideNav-name`}>Inventory</span>
                            </p>
                        </div>
                    </Link>
                    <Link to="/integrations" className="action">
                        <div className="left-nav-bar Integrations-contain">
                            <p className={`sideNav-icon ${window.location.pathname == '/integrations' ? 'active' : ''}`}>
                                <span><i className="fi fi-rs-square-poll-vertical"></i></span>
                                <span className="sideNav-name">Integrations</span>
                            </p>
                        </div>
                    </Link>
                    <Link to="/vendors" className="action">
                        <div className="left-nav-bar Vendors-contain">
                            <p className={`sideNav-icon ${window.location.pathname == '/vendors' ? 'active' : ''}`}>
                                <span><i className="fi fi-rs-circle-user"></i></span>
                                <span className="sideNav-name">Vendors</span>
                            </p>
                        </div>
                    </Link>
                    <Link to="/orders" className="action">
                        <div className="left-nav-bar Orders-contain">
                            <p className={`sideNav-icon ${window.location.pathname == '/orders' ? 'active' : ''}`}>
                                <span><i className="fi fi-rs-box-open"></i></span>
                                <span className="sideNav-name">Orders</span>
                            </p>
                        </div>
                    </Link>
                    <Link to="/invite-users" className="action">
                        <div className="left-nav-bar Invite-users-contain">
                            <p className={`sideNav-icon ${window.location.pathname == '/invite-users' ? 'active' : ''}`}>
                                <span><i className="fi fi-rs-users"></i></span>
                                <span className="sideNav-name">Invite users</span>
                            </p>
                        </div>
                    </Link>
                    {/* <Link to="/reports" className="action">
                        <div className="left-nav-bar Sold-items-contain">
                            <p className={`sideNav-icon ${window.location.pathname == '/f' ? 'active' : ''}`}>
                                <span><i class="fi fi-rs-coins"></i></span>
                                <span className="sideNav-name">Reports</span>
                            </p>
                        </div>
                    </Link> */}
                    <Link to="/low-stocks" className="action">
                        <div className="left-nav-bar Low-stocks-contain">
                            <p className={`sideNav-icon ${window.location.pathname == '/low-stocks' ? 'active' : ''}`}>
                                <span><i className="fi fi-rs-shopping-bag"></i></span>
                                <span className="sideNav-name">Low stocks</span>
                            </p>
                        </div>
                    </Link>

                    <Link to="/settings" className="action">
                        <div className="left-nav-bar setting-contain">
                            <p className={`sideNav-icon ${window.location.pathname == '/settings' ? 'active' : ''}`}>
                                <span><i className="fi fi-rs-settings"></i></span>
                                <span className="sideNav-name">Settings</span>
                            </p>
                        </div>
                    </Link>
                </ul>
            </div>
        </React.StrictMode>
    )
}

export default SideNav